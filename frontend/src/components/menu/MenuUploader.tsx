import React, { useRef, useState } from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import InlineMessage from '../ui/InlineMessage';
import { validateMenuFile, ALLOWED_MIME_TYPES } from '../../utils/fileValidation';

export interface MenuUploaderProps {
  onImagesSelect: (files: File[]) => void;
  disabled?: boolean;
}

export const MenuUploader: React.FC<MenuUploaderProps> = ({
  onImagesSelect,
  disabled = false,
}) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (files: FileList | File[]) => {
    setValidationError(null);
    const validFiles: File[] = [];
    let firstError: string | null = null;

    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    for (const file of fileArray) {
      const result = validateMenuFile(file);
      if (!result.valid) {
        if (!firstError) {
          firstError = result.error || 'Invalid file selected.';
        }
      } else {
        validFiles.push(file);
      }
    }

    if (firstError) {
      setValidationError(firstError);
    }

    if (validFiles.length > 0) {
      onImagesSelect(validFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Reset input value so re-selecting the same file triggers onChange
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  return (
    <Card className="space-y-5" padding="md">
      {/* Hidden Native File Inputs */}
      {/* Camera Capture Input */}
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept={ALLOWED_MIME_TYPES.join(',')}
        capture="environment"
        className="hidden"
        id="camera-file-input"
        aria-label="Take a photo of restaurant menu"
        disabled={disabled}
      />

      {/* File Upload Input */}
      <input
        type="file"
        ref={uploadInputRef}
        onChange={handleFileChange}
        accept={ALLOWED_MIME_TYPES.join(',')}
        multiple
        className="hidden"
        id="upload-file-input"
        aria-label="Upload menu image files"
        disabled={disabled}
      />

      {/* Title & Prompt */}
      <div className="space-y-1 text-center sm:text-left">
        <h3 className="text-xl font-bold text-white tracking-wide flex items-center justify-center sm:justify-start gap-2">
          <ImageIcon className="w-5 h-5 text-[#F05A28]" aria-hidden="true" />
          <span>Add your menu</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#9CA3AF]">
          Snap a photo of a physical menu or upload image files from your device.
        </p>
      </div>

      {/* Dropzone Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 ${
          isDragging
            ? 'border-[#F05A28] bg-[#F05A28]/10'
            : 'border-[#2A2C33] bg-[#18191D] hover:border-[#3B3D45]'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1C1D21] border border-[#2A2C33] flex items-center justify-center text-[#F05A28]">
            <Upload className="w-6 h-6" aria-hidden="true" />
          </div>

          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xs">
            Drag & drop menu images here, or choose an option below:
          </p>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm">
            <Button
              variant="primary"
              size="md"
              icon={<Camera className="w-4 h-4" aria-hidden="true" />}
              onClick={() => cameraInputRef.current?.click()}
              disabled={disabled}
              aria-label="Take a photo of menu"
            >
              Take a photo
            </Button>

            <Button
              variant="secondary"
              size="md"
              icon={<Upload className="w-4 h-4" aria-hidden="true" />}
              onClick={() => uploadInputRef.current?.click()}
              disabled={disabled}
              aria-label="Upload menu files"
            >
              Upload menu
            </Button>
          </div>

          <p className="text-[11px] text-[#6B7280]">
            Supports JPEG, PNG, WebP up to 10 MB per page
          </p>
        </div>
      </div>

      {/* Validation Error Message */}
      {validationError && (
        <InlineMessage
          type="error"
          title="File Validation Error"
          message={validationError}
        />
      )}
    </Card>
  );
};

export default MenuUploader;
