import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
      {imageUrl ? (
        <div className="animate-scale-in relative group">
          <img
            src={imageUrl}
            alt="Your photograph"
            className="max-w-full max-h-[85vh] w-auto h-auto rounded-2xl shadow-2xl object-contain"
          />
          <Button
            onClick={() => setImageUrl(null)}
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      ) : (
        <div className="animate-fade-in text-center">
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-4 p-12 rounded-2xl border-2 border-dashed border-slate-300 hover:border-slate-400 transition-colors bg-white/50">
              <Icon name="ImagePlus" size={48} className="text-slate-400" />
              <div>
                <p className="text-lg font-medium text-slate-700 mb-1">Добавить фотографию</p>
                <p className="text-sm text-slate-500">Нажми, чтобы выбрать файл</p>
              </div>
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Index;
