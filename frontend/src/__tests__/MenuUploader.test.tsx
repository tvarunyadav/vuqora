import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import MenuUploader from '../components/menu/MenuUploader';

let createObjectURLSpy: ReturnType<typeof vi.fn>;
let revokeObjectURLSpy: ReturnType<typeof vi.fn>;

beforeAll(() => {
  createObjectURLSpy = vi.fn((file: File) => `blob:mock-url-${file.name}`);
  revokeObjectURLSpy = vi.fn();

  globalThis.URL.createObjectURL = createObjectURLSpy as unknown as typeof URL.createObjectURL;
  globalThis.URL.revokeObjectURL = revokeObjectURLSpy as unknown as typeof URL.revokeObjectURL;
});

beforeEach(() => {
  createObjectURLSpy.mockClear();
  revokeObjectURLSpy.mockClear();
});

const createDummyFile = (name: string, type: string, sizeInBytes: number = 1024): File => {
  const blob = new Blob([new Uint8Array(sizeInBytes)], { type });
  return new File([blob], name, { type });
};

describe('MenuUploader & MenuPreview Behavior Tests', () => {
  it('1. accepts valid JPEG, PNG, and WebP files and displays them in local preview', () => {
    render(<App />);

    const fileJpg = createDummyFile('menu1.jpg', 'image/jpeg');
    const filePng = createDummyFile('menu2.png', 'image/png');
    const fileWebp = createDummyFile('menu3.webp', 'image/webp');

    const fileInput = screen.getByLabelText(/upload menu image files/i);
    fireEvent.change(fileInput, { target: { files: [fileJpg, filePng, fileWebp] } });

    expect(screen.getByText('menu1.jpg')).toBeInTheDocument();
    expect(screen.getByText('menu2.png')).toBeInTheDocument();
    expect(screen.getByText('menu3.webp')).toBeInTheDocument();

    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(screen.getByText('Page 2')).toBeInTheDocument();
    expect(screen.getByText('Page 3')).toBeInTheDocument();
  });

  it('2. rejects unsupported files and displays an accessible validation error', () => {
    const handleImagesSelect = vi.fn();
    render(<MenuUploader onImagesSelect={handleImagesSelect} />);

    const pdfFile = createDummyFile('document.pdf', 'application/pdf');
    const fileInput = screen.getByLabelText(/upload menu image files/i);

    fireEvent.change(fileInput, { target: { files: [pdfFile] } });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/unsupported file format/i)).toBeInTheDocument();
    expect(handleImagesSelect).not.toHaveBeenCalled();
  });

  it('3. rejects files larger than 10 MB with validation message', () => {
    const handleImagesSelect = vi.fn();
    render(<MenuUploader onImagesSelect={handleImagesSelect} />);

    const largeFile = createDummyFile('large_menu.jpg', 'image/jpeg', 11 * 1024 * 1024);
    const fileInput = screen.getByLabelText(/upload menu image files/i);

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/exceeds the 10 MB limit/i)).toBeInTheDocument();
    expect(handleImagesSelect).not.toHaveBeenCalled();
  });

  it('4. allows removing a selected image', () => {
    render(<App />);

    const file1 = createDummyFile('menu1.jpg', 'image/jpeg');
    const file2 = createDummyFile('menu2.jpg', 'image/jpeg');
    const fileInput = screen.getByLabelText(/upload menu image files/i);

    fireEvent.change(fileInput, { target: { files: [file1, file2] } });

    expect(screen.getByText('menu1.jpg')).toBeInTheDocument();
    expect(screen.getByText('menu2.jpg')).toBeInTheDocument();

    const removeBtn1 = screen.getByLabelText(/remove image menu1.jpg/i);
    fireEvent.click(removeBtn1);

    expect(screen.queryByText('menu1.jpg')).not.toBeInTheDocument();
    expect(screen.getByText('menu2.jpg')).toBeInTheDocument();
  });

  it('5. allows replacing a selected image', () => {
    render(<App />);

    const originalFile = createDummyFile('original.jpg', 'image/jpeg');
    const fileInput = screen.getByLabelText(/upload menu image files/i);

    fireEvent.change(fileInput, { target: { files: [originalFile] } });
    expect(screen.getByText('original.jpg')).toBeInTheDocument();

    const replaceBtn = screen.getByLabelText(/replace image original.jpg/i);
    fireEvent.click(replaceBtn);

    const replaceInput = screen.getByLabelText(/replace menu image/i);
    const newFile = createDummyFile('replacement.png', 'image/png');
    fireEvent.change(replaceInput, { target: { files: [newFile] } });

    expect(screen.queryByText('original.jpg')).not.toBeInTheDocument();
    expect(screen.getByText('replacement.png')).toBeInTheDocument();
  });

  it('6. maintains page and order representation for multiple selected images', () => {
    const { container } = render(<App />);

    const page1 = createDummyFile('page1.jpg', 'image/jpeg');
    const page2 = createDummyFile('page2.jpg', 'image/jpeg');
    const page3 = createDummyFile('page3.jpg', 'image/jpeg');

    const fileInput = screen.getByLabelText(/upload menu image files/i);
    fireEvent.change(fileInput, { target: { files: [page1, page2, page3] } });

    const pageBadges = screen.getAllByText(/^Page \d+$/);
    expect(pageBadges.map((el) => el.textContent)).toEqual(['Page 1', 'Page 2', 'Page 3']);

    // Add another page using the hidden file input
    const addMoreInput = container.querySelector('#add-more-menu-input') as HTMLInputElement;
    const page4 = createDummyFile('page4.jpg', 'image/jpeg');
    fireEvent.change(addMoreInput, { target: { files: [page4] } });

    const updatedPageBadges = screen.getAllByText(/^Page \d+$/);
    expect(updatedPageBadges.map((el) => el.textContent)).toEqual(['Page 1', 'Page 2', 'Page 3', 'Page 4']);
  });

  it('7. calls URL.createObjectURL ONLY for accepted images', () => {
    render(<App />);

    const validFile = createDummyFile('valid.jpg', 'image/jpeg');
    const invalidFile = createDummyFile('invalid.txt', 'text/plain');

    const fileInput = screen.getByLabelText(/upload menu image files/i);
    fireEvent.change(fileInput, { target: { files: [validFile, invalidFile] } });

    // createObjectURL should be called once for valid.jpg, not for invalid.txt
    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(createObjectURLSpy).toHaveBeenCalledWith(validFile);
  });

  it('8. calls URL.revokeObjectURL on image remove, replacement, clear all, and component unmount', () => {
    // 8a. Remove image
    const { unmount: unmount1 } = render(<App />);
    const file1 = createDummyFile('image1.jpg', 'image/jpeg');
    const fileInput1 = screen.getByLabelText(/upload menu image files/i);
    fireEvent.change(fileInput1, { target: { files: [file1] } });

    expect(createObjectURLSpy).toHaveBeenCalledWith(file1);
    const url1 = createObjectURLSpy.mock.results[0].value;

    const removeBtn = screen.getByLabelText(/remove image image1.jpg/i);
    fireEvent.click(removeBtn);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith(url1);
    unmount1();

    // 8b. Replace image
    revokeObjectURLSpy.mockClear();
    createObjectURLSpy.mockClear();
    const { unmount: unmount2 } = render(<App />);
    const file2 = createDummyFile('image2.jpg', 'image/jpeg');
    const fileInput2 = screen.getByLabelText(/upload menu image files/i);
    fireEvent.change(fileInput2, { target: { files: [file2] } });

    const url2 = createObjectURLSpy.mock.results[0].value;

    const replaceBtn = screen.getByLabelText(/replace image image2.jpg/i);
    fireEvent.click(replaceBtn);

    const replaceInput = screen.getByLabelText(/replace menu image/i);
    const file3 = createDummyFile('image3.jpg', 'image/jpeg');
    fireEvent.change(replaceInput, { target: { files: [file3] } });

    expect(revokeObjectURLSpy).toHaveBeenCalledWith(url2);
    unmount2();

    // 8c. Clear all images
    revokeObjectURLSpy.mockClear();
    createObjectURLSpy.mockClear();
    const { unmount: unmount3 } = render(<App />);
    const fileA = createDummyFile('fileA.jpg', 'image/jpeg');
    const fileB = createDummyFile('fileB.jpg', 'image/jpeg');
    const fileInput3 = screen.getByLabelText(/upload menu image files/i);
    fireEvent.change(fileInput3, { target: { files: [fileA, fileB] } });

    const urlA = createObjectURLSpy.mock.results[0].value;
    const urlB = createObjectURLSpy.mock.results[1].value;

    const clearAllBtn = screen.getByText(/remove all/i);
    fireEvent.click(clearAllBtn);

    expect(revokeObjectURLSpy).toHaveBeenCalledWith(urlA);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith(urlB);
    unmount3();

    // 8d. Component unmounts with active images
    revokeObjectURLSpy.mockClear();
    createObjectURLSpy.mockClear();
    const { unmount: unmount4 } = render(<App />);
    const fileActive = createDummyFile('active.jpg', 'image/jpeg');
    const fileInput4 = screen.getByLabelText(/upload menu image files/i);
    fireEvent.change(fileInput4, { target: { files: [fileActive] } });

    const urlActive = createObjectURLSpy.mock.results[0].value;

    unmount4();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith(urlActive);
  });
});
