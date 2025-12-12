import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const backgrounds = [
  { name: 'Светлый', value: 'bg-gradient-to-br from-slate-50 via-white to-slate-100', color: '#f8fafc' },
  { name: 'Тёмный', value: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900', color: '#0f172a' },
  { name: 'Бежевый', value: 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100', color: '#fffbeb' },
  { name: 'Голубой', value: 'bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100', color: '#eff6ff' },
  { name: 'Розовый', value: 'bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100', color: '#fdf2f8' },
  { name: 'Зелёный', value: 'bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100', color: '#ecfdf5' },
  { name: 'Чёрный', value: 'bg-black', color: '#000000' },
  { name: 'Белый', value: 'bg-white', color: '#ffffff' },
];

const Index = () => {
  const [bgClass, setBgClass] = useState(backgrounds[0].value);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleDownload = () => {
    if (!imgRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imgRef.current;
    const padding = 100;
    canvas.width = img.naturalWidth + padding * 2;
    canvas.height = img.naturalHeight + padding * 2;

    const bgColor = backgrounds.find(bg => bg.value === bgClass)?.color || '#ffffff';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, padding, padding, img.naturalWidth, img.naturalHeight);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'photo-with-background.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${bgClass}`}>
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="animate-scale-in relative group flex flex-col items-center gap-6">
        <img
          ref={imgRef}
          src="https://cdn.poehali.dev/files/IMG_5969.jpeg"
          alt="Beautiful photograph"
          className="max-w-full max-h-[75vh] w-auto h-auto rounded-2xl shadow-2xl object-contain"
        />
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-light tracking-wide text-slate-800 mb-2">I love you forever</p>
          <p className="text-lg md:text-xl italic text-slate-600">Your V</p>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={handleDownload}
            variant="secondary"
            size="icon"
            className="shadow-lg"
          >
            <Icon name="Download" size={20} />
          </Button>
        </div>
      </div>

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
