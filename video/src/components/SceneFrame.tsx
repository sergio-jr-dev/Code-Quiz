import type { ReactNode } from 'react';
import { AbsoluteFill, staticFile } from 'remotion';

type Props = {
  children: ReactNode;
  chapter: string;
  theme?: 'dark' | 'light';
};

export const SceneFrame = ({ children, chapter, theme = 'dark' }: Props) => (
  <AbsoluteFill className="video-frame" style={{ colorScheme: theme }}>
    <div
      className="background-art"
      style={{ backgroundImage: `url(${staticFile('images/game-background.svg')})` }}
    />
    <div className="editorial-content">
      <div className="eyebrow">
        <span>CODE QUIZ</span>
        <span>{chapter}</span>
      </div>
      {children}
    </div>
  </AbsoluteFill>
);
