import React, { useEffect, useState } from 'react';

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface FloatingEmojisProps {
  emojis: string[];
  count?: number;
  className?: string;
}

export const FloatingEmojis: React.FC<FloatingEmojisProps> = ({ 
  emojis, 
  count = 6,
  className = '' 
}) => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const generateEmojis = () => {
      const newEmojis: FloatingEmoji[] = [];
      for (let i = 0; i < count; i++) {
        newEmojis.push({
          id: i,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 3 + Math.random() * 4
        });
      }
      setFloatingEmojis(newEmojis);
    };

    generateEmojis();
    const interval = setInterval(generateEmojis, 8000);
    return () => clearInterval(interval);
  }, [emojis, count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {floatingEmojis.map((item) => (
        <div
          key={item.id}
          className="absolute text-2xl opacity-60 animate-float-up"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};