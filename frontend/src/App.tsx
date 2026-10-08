import React, { useState, useEffect, useRef, useCallback } from 'react';
import AppHeader from './components/layout/AppHeader';
import MenuUploader from './components/menu/MenuUploader';
import MenuPreview from './components/menu/MenuPreview';
import CaptureGuidance from './components/menu/CaptureGuidance';
import type { MenuImage } from './types/menu';

export const App: React.FC = () => {
  const [menuImages, setMenuImages] = useState<MenuImage[]>([]);

  const menuImagesRef = useRef<MenuImage[]>(menuImages);

  useEffect(() => {
    menuImagesRef.current = menuImages;
  }, [menuImages]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      menuImagesRef.current.forEach((img) => {
        if (img.previewUrl) {
          URL.revokeObjectURL(img.previewUrl);
        }
      });
    };
  }, []);

  // Handler to add new selected files
  const handleImagesSelect = (files: File[]) => {
    const newMenuImages: MenuImage[] = files.map((file, idx) => ({
      id: `${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 9)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
      addedAt: new Date(),
    }));

    setMenuImages((prev) => [...prev, ...newMenuImages]);
  };

  // Handler to remove a single image
  const handleRemoveImage = useCallback((id: string) => {
    setMenuImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  // Handler to replace a single image
  const handleReplaceImage = useCallback((id: string, newFile: File) => {
    setMenuImages((prev) => {
      return prev.map((img) => {
        if (img.id === id) {
          if (img.previewUrl) {
            URL.revokeObjectURL(img.previewUrl);
          }
          return {
            ...img,
            file: newFile,
            previewUrl: URL.createObjectURL(newFile),
            name: newFile.name,
            size: newFile.size,
            type: newFile.type,
            addedAt: new Date(),
          };
        }
        return img;
      });
    });
  }, []);

  // Handler to clear all selected images
  const handleClearAll = useCallback(() => {
    setMenuImages((prev) => {
      prev.forEach((img) => {
        if (img.previewUrl) {
          URL.revokeObjectURL(img.previewUrl);
        }
      });
      return [];
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#121316] text-[#F3F4F6] flex flex-col font-sans selection:bg-[#F05A28]/30 selection:text-white">
      {/* Responsive App Header */}
      <AppHeader />

      {/* Main Experience Container */}
      <main className="flex-1 w-full max-w-xl mx-auto px-4 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Product Purpose / Hero Section */}
        <section className="space-y-2 text-center sm:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-[#F05A28]/10 border border-[#F05A28]/20 text-[11px] font-semibold text-[#F05A28] uppercase tracking-wider mb-1">
            Menu Companion
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Not sure what to order?
          </h1>
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            Scan a restaurant menu and let VUQORA help you find the right dishes and build a meal around what you want.
          </p>
        </section>

        {/* Primary Action Area: Uploader or Preview */}
        <section className="space-y-6">
          {menuImages.length === 0 ? (
            <MenuUploader onImagesSelect={handleImagesSelect} />
          ) : (
            <MenuPreview
              images={menuImages}
              onRemoveImage={handleRemoveImage}
              onReplaceImage={handleReplaceImage}
              onAddMoreImages={handleImagesSelect}
              onClearAll={handleClearAll}
            />
          )}

          {/* Capture Tips Guidance */}
          <CaptureGuidance />
        </section>
      </main>

      {/* Footer & Privacy UX */}
      <footer className="w-full border-t border-[#2A2C33]/50 py-6 px-4 text-center text-xs text-[#6B7280]">
        <div className="max-w-xl mx-auto space-y-1">
          <p className="font-medium text-[#9CA3AF]">
            VUQORA — From menu to meal.
          </p>
          <p className="text-[11px]">
            Your selected images stay on this device during your preview session.
          </p>
        </div>
      </footer>
    </div>
  );
};


export default App;
