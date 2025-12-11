import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const backgrounds = [
  { name: 'Светлый', value: 'bg-gradient-to-br from-slate-50 via-white to-slate-100' },
  { name: 'Тёмный', value: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' },
  { name: 'Бежевый', value: 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100' },
  { name: 'Голубой', value: 'bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100' },
  { name: 'Розовый', value: 'bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100' },
  { name: 'Зелёный', value: 'bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100' },
  { name: 'Чёрный', value: 'bg-black' },
  { name: 'Белый', value: 'bg-white' },
];

const Index = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [bgClass, setBgClass] = useState(backgrounds[0].value);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${bgClass}`}>
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

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 animate-fade-in">
        <div className="flex gap-2 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
          {backgrounds.map((bg) => (
            <button
              key={bg.name}
              onClick={() => setBgClass(bg.value)}
              className={`w-10 h-10 rounded-full ${bg.value} border-2 transition-all hover:scale-110 ${
                bgClass === bg.value ? 'border-slate-900 ring-2 ring-slate-400' : 'border-slate-200'
              }`}
              title={bg.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
