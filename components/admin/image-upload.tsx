'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  bucket = 'article-images',
  label,
}: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const inputClass =
    'w-full px-3 py-2.5 bg-card-warm border border-soft-border rounded text-sm text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors';
  const labelClass =
    'block text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/40 mb-1.5';

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5 MB.');
      return;
    }

    setError('');
    setUploading(true);

    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);

    onChange(publicUrl);
    setUploading(false);
    // Reset input so the same file can be re-selected if needed
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div className="space-y-2">
      {label && <p className={labelClass}>{label}</p>}

      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-soft-border/60 bg-oat">
          <div className="aspect-[16/9] relative">
            <Image
              src={value}
              alt="Hero image preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-charcoal/70 text-bone rounded hover:bg-charcoal transition-colors"
            title="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-soft-border/60 rounded-lg py-8 flex flex-col items-center gap-2 text-charcoal/30 hover:border-charcoal/20 hover:text-charcoal/50 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Upload className="w-5 h-5 animate-pulse" />
              <span className="text-xs">Uploading…</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5" />
              <span className="text-xs">Click to upload image</span>
              <span className="text-[10px]">JPG, PNG, WEBP — max 5 MB</span>
            </>
          )}
        </button>
      )}

      {/* URL text input as fallback / manual entry */}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image URL…"
        className={`${inputClass} text-xs`}
      />

      {error && <p className="text-xs text-muted-rose/80">{error}</p>}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
