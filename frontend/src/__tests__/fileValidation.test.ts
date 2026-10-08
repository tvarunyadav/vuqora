import { describe, it, expect } from 'vitest';
import { validateMenuFile, formatBytes } from '../utils/fileValidation';

describe('fileValidation utility', () => {
  it('accepts valid JPEG, PNG, and WebP files under 10MB', () => {
    const validJpg = new File(['dummy content'], 'menu.jpg', { type: 'image/jpeg' });
    const validPng = new File(['dummy content'], 'menu.png', { type: 'image/png' });
    const validWebp = new File(['dummy content'], 'menu.webp', { type: 'image/webp' });

    expect(validateMenuFile(validJpg).valid).toBe(true);
    expect(validateMenuFile(validPng).valid).toBe(true);
    expect(validateMenuFile(validWebp).valid).toBe(true);
  });

  it('rejects unsupported file formats like PDF or GIF', () => {
    const pdfFile = new File(['dummy content'], 'menu.pdf', { type: 'application/pdf' });
    const gifFile = new File(['dummy content'], 'menu.gif', { type: 'image/gif' });

    const pdfResult = validateMenuFile(pdfFile);
    expect(pdfResult.valid).toBe(false);
    expect(pdfResult.error).toContain('Unsupported file format');

    const gifResult = validateMenuFile(gifFile);
    expect(gifResult.valid).toBe(false);
    expect(gifResult.error).toContain('Unsupported file format');
  });

  it('rejects files larger than 10 MB', () => {
    // Create oversized dummy blob (11MB)
    const largeBlob = new Blob([new Uint8Array(11 * 1024 * 1024)]);
    const largeFile = new File([largeBlob], 'huge_menu.jpg', { type: 'image/jpeg' });

    const result = validateMenuFile(largeFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('exceeds the 10 MB limit');
  });

  it('formats byte sizes correctly', () => {
    expect(formatBytes(0)).toBe('0 Bytes');
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(2.5 * 1024 * 1024)).toBe('2.5 MB');
  });
});
