import React from 'react';

interface AnimatedEmojiProps {
  emoji: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animation?: 'bounce' | 'float' | 'pulse' | 'spin' | 'wiggle' | 'heartbeat' | 'dance';
  className?: string;
}

export const AnimatedEmoji: React.FC<AnimatedEmojiProps> = ({ 
  emoji, 
  size = 'md', 
  animation = 'bounce',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-6xl'
  };

  const animationClasses = {
    bounce: 'animate-bounce',
    float: 'animate-float',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    wiggle: 'animate-wiggle',
    heartbeat: 'animate-heartbeat',
    dance: 'animate-dance'
  };

  return (
    <span 
      className={`inline-block ${sizeClasses[size]} ${animationClasses[animation]} ${className}`}
      style={{ 
        transformOrigin: 'center',
        display: 'inline-block',
        userSelect: 'none'
      }}
    >
      {emoji}
    </span>
  );
};