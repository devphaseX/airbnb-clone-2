'use client';
import { useCallback } from 'react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value?: string;
}

interface UploadResult {
  info: { secure_url: string };
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    ({ info: { secure_url } }: UploadResult) => onChange(secure_url),
    [onChange]
  );
  return (
    <div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset=""
        options={{ maxFiles: 1 }}
      >
        {({ open }) => (
          <div
            onClick={() => open?.()}
            className="
                    relative
                    cursor-pointer
                    hover:opacity-70
                    transition
                    border-dashed
                    border-2
                    p-20
                    border-neutral-300
                    flex 
                    flex-col
                    justify-center
                    items-center
                    gap-4
                    text-neutral-600
                       "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {typeof value !== 'undefined' && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                />
              </div>
            )}
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
};

export { ImageUpload };
