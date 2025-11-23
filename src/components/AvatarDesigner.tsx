'use client';

import { useMemo, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import AvatarPreview from './AvatarPreview';

type ThemePreset = {
  name: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  tagline: string;
};

const PRESETS: ThemePreset[] = [
  {
    name: 'Биржевой импульс',
    primaryColor: '#20E4A0',
    accentColor: '#FF6B3D',
    backgroundColor: '#050B1E',
    tagline: 'Продай быстрее. Инвестируй умнее.'
  },
  {
    name: 'Ночной дрифт',
    primaryColor: '#5C7CFF',
    accentColor: '#FFDB4D',
    backgroundColor: '#040612',
    tagline: 'Trade Day — твой сигнал к ускорению.'
  },
  {
    name: 'Турбо ликвидность',
    primaryColor: '#FF4D87',
    accentColor: '#23D1FF',
    backgroundColor: '#090A16',
    tagline: 'Сделки без пробуксовки.'
  }
];

export default function AvatarDesigner() {
  const [primaryColor, setPrimaryColor] = useState(PRESETS[0].primaryColor);
  const [accentColor, setAccentColor] = useState(PRESETS[0].accentColor);
  const [backgroundColor, setBackgroundColor] = useState(PRESETS[0].backgroundColor);
  const [tagline, setTagline] = useState(PRESETS[0].tagline);
  const [showSparkline, setShowSparkline] = useState(true);
  const [showCar, setShowCar] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handlePreset = (preset: ThemePreset) => {
    setPrimaryColor(preset.primaryColor);
    setAccentColor(preset.accentColor);
    setBackgroundColor(preset.backgroundColor);
    setTagline(preset.tagline);
  };

  const handleDownload = async () => {
    if (!ref.current) {
      return;
    }

    try {
      setIsExporting(true);
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        backgroundColor: 'rgba(0,0,0,0)'
      });

      const link = document.createElement('a');
      link.download = `trade-day-avatar.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Ошибка экспорта аватара', error);
      alert('Не удалось сохранить изображение. Попробуйте еще раз.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportLabel = useMemo(() => (isExporting ? 'Сохраняем…' : 'Скачать PNG'), [isExporting]);

  return (
    <div className="preview-card">
      <div className="avatar-surface">
        <AvatarPreview
          ref={ref}
          primaryColor={primaryColor}
          accentColor={accentColor}
          backgroundColor={backgroundColor}
          tagline={tagline}
          showSparkline={showSparkline}
          showCar={showCar}
        />
      </div>

      <div className="avatar-meta">
        <h3>Trade Day</h3>
        <p>
          Экспортируй фирменный знак и используй в соцсетях, телеграм-канале или на сайте дилерского
          сообщества.
        </p>
      </div>

      <div className="actions">
        <button className="button" onClick={handleDownload} disabled={isExporting}>
          {exportLabel}
        </button>
        <button
          className="button secondary"
          onClick={() => handlePreset(PRESETS[Math.floor(Math.random() * PRESETS.length)])}
        >
          Случайная палитра
        </button>
      </div>

      <p className="export-note">
        Совет: настрой цвета, добавь свой слоган и скачай PNG размером 1280px. Кнопка работает в десктопном
        браузере.
      </p>

      <div className="controls">
        <div className="field">
          <label htmlFor="primaryColor">Основной цвет бренда</label>
          <input
            id="primaryColor"
            type="color"
            value={primaryColor}
            onChange={(event) => setPrimaryColor(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="accentColor">Акцент свечей</label>
          <input
            id="accentColor"
            type="color"
            value={accentColor}
            onChange={(event) => setAccentColor(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="backgroundColor">Фон аватара</label>
          <input
            id="backgroundColor"
            type="color"
            value={backgroundColor}
            onChange={(event) => setBackgroundColor(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="tagline">Слоган Trade Day</label>
          <textarea
            id="tagline"
            rows={2}
            value={tagline}
            onChange={(event) => setTagline(event.target.value)}
            placeholder="Почувствуй ликвидность и скорость сделки"
          />
        </div>

        <label className="toggle">
          <input
            type="checkbox"
            checked={showSparkline}
            onChange={(event) => setShowSparkline(event.target.checked)}
          />
          Показывать биржевой график
        </label>

        <label className="toggle">
          <input type="checkbox" checked={showCar} onChange={(event) => setShowCar(event.target.checked)} />
          Подсветить силуэт авто
        </label>
      </div>
    </div>
  );
}
