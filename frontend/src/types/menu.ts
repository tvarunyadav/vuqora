export interface MenuImage {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number;
  type: string;
  addedAt: Date;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export type MenuUploadSource = 'camera' | 'upload';
