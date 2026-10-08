import React, { useState } from 'react';
import { Trash2, RefreshCw, Plus, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import type { MenuImage } from '../../types/menu';
import { formatBytes } from '../../utils/fileValidation';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import Card from '../ui/Card';
import InlineMessage from '../ui/InlineMessage';

export interface MenuPreviewProps {
  images: MenuImage[];
  onRemoveImage: (id: string) => void;
  onReplaceImage: (id: string, newFile: File) => void;
  onAddMoreImages: (files: File[]) => void;
  onClearAll: () => void;
}

export const MenuPreview: React.FC<MenuPreviewProps> = ({
  images,
  onRemoveImage,
  onReplaceImage,
  onAddMoreImages,
  onClearAll,
}) => {
  const [activeNotice, setActiveNotice] = useState<boolean>(false);
  const addInputRef = React.useRef<HTMLInputElement>(null);
  const replaceInputRef = React.useRef<HTMLInputElement>(null);
  const [replacingId, setReplacingId] = useState<string | null>(null);

  const handleAddMoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddMoreImages(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleReplaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && replacingId) {
      onReplaceImage(replacingId, e.target.files[0]);
      setReplacingId(null);
      e.target.value = '';
    }
  };

  const triggerReplace = (id: string) => {
    setReplacingId(id);
    replaceInputRef.current?.click();
  };

  return (
    <Card className="space-y-6" padding="md">
      {/* Hidden File Inputs for Add/Replace */}
      <input
        type="file"
        ref={addInputRef}
        onChange={handleAddMoreChange}
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        id="add-more-menu-input"
        aria-label="Add another menu page"
      />
      <input
        type="file"
        ref={replaceInputRef}
        onChange={handleReplaceChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        id="replace-menu-input"
        aria-label="Replace menu image"
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2A2C33] pb-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#F05A28]" aria-hidden="true" />
            <span>Menu Selected</span>
          </h3>
          <p className="text-xs text-[#9CA3AF]">
            {images.length} {images.length === 1 ? 'page' : 'pages'} ready for preview
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-xs text-[#9CA3AF] hover:text-red-400"
          aria-label="Clear all selected menu images"
        >
          Remove all
        </Button>
      </div>

      {/* Image Previews List */}
      <div className="space-y-4">
        {images.map((img, index) => (
          <div
            key={img.id}
            className="flex flex-col sm:flex-row items-center gap-4 p-3.5 bg-[#18191D] border border-[#26282E] rounded-xl transition-all"
          >
            {/* Image Thumbnail */}
            <div className="relative w-full sm:w-28 h-36 sm:h-28 rounded-lg overflow-hidden bg-black/40 border border-[#2A2C33] shrink-0">
              <img
                src={img.previewUrl}
                alt={`Menu page ${index + 1}: ${img.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#121316]/80 backdrop-blur-sm border border-[#2A2C33] text-[10px] font-semibold text-white">
                Page {index + 1}
              </div>
            </div>

            {/* File Info & Meta */}
            <div className="flex-1 min-w-0 w-full space-y-1">
              <p className="text-sm font-semibold text-white truncate" title={img.name}>
                {img.name}
              </p>
              <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                <span>{formatBytes(img.size)}</span>
                <span>•</span>
                <span className="capitalize">{img.type.replace('image/', '')}</span>
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Validated locally</span>
              </div>
            </div>

            {/* Action Buttons for this Image */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#2A2C33]">
              <Button
                variant="outline"
                size="sm"
                icon={<RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />}
                onClick={() => triggerReplace(img.id)}
                aria-label={`Replace image ${img.name}`}
              >
                Replace
              </Button>

              <IconButton
                variant="danger"
                size="sm"
                icon={<Trash2 className="w-4 h-4" aria-hidden="true" />}
                onClick={() => onRemoveImage(img.id)}
                aria-label={`Remove image ${img.name}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Page Action */}
      <div className="pt-1">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          icon={<Plus className="w-4 h-4" aria-hidden="true" />}
          onClick={() => addInputRef.current?.click()}
          aria-label="Add another menu page"
        >
          Add another menu page
        </Button>
      </div>

      {/* Primary Continue Button */}
      <div className="pt-2 space-y-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          icon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
          onClick={() => setActiveNotice(true)}
          aria-label="Continue to menu analysis"
        >
          Continue
        </Button>

        {/* Development Preview Notice (Milestone 1 Non-Deceptive Status) */}
        {activeNotice && (
          <InlineMessage
            type="info"
            title="Milestone 1 Preview Active"
            message={
              <span>
                Menu capture and local preview are active in Milestone 1. Structured menu extraction will arrive in <strong>Milestone 2</strong>. Your selected images stay on this device during preview.
              </span>
            }
          />
        )}
      </div>
    </Card>
  );
};

export default MenuPreview;
