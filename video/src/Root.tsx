import './video.css';
import { Composition, Folder } from 'remotion';

import { Presentation } from './Presentation';
import { Brand } from './scenes/Brand';
import { Catalog } from './scenes/Catalog';
import { Closing } from './scenes/Closing';
import { Hook } from './scenes/Hook';
import { Learning } from './scenes/Learning';
import { Levels } from './scenes/Levels';
import { Modes } from './scenes/Modes';
import { Results } from './scenes/Results';
import { Themes } from './scenes/Themes';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CodeQuiz"
        component={Presentation}
        durationInFrames={1485}
        fps={30}
        width={1080}
        height={1350}
      />
      <Folder name="Escenas">
        <Composition
          id="01-Reto"
          component={Hook}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1350}
        />
        <Composition
          id="02-Materias"
          component={Brand}
          durationInFrames={105}
          fps={30}
          width={1080}
          height={1350}
        />
        <Composition
          id="03-Catalogo"
          component={Catalog}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1350}
        />
        <Composition
          id="04-Niveles"
          component={Levels}
          durationInFrames={135}
          fps={30}
          width={1080}
          height={1350}
        />
        <Composition
          id="05-Modos"
          component={Modes}
          durationInFrames={240}
          fps={30}
          width={1080}
          height={1350}
        />
        <Composition
          id="06-Aprende"
          component={Learning}
          durationInFrames={165}
          fps={30}
          width={1080}
          height={1350}
        />
        <Composition
          id="07-Temas"
          component={Themes}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1350}
        />
        <Composition
          id="08-Resultados"
          component={Results}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1350}
        />
        <Composition
          id="09-Cierre"
          component={Closing}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1350}
        />
      </Folder>
    </>
  );
};
