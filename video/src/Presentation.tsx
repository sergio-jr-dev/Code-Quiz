import { TransitionSeries } from '@remotion/transitions';

import { Soundtrack } from './components/Soundtrack';
import { Brand } from './scenes/Brand';
import { Catalog } from './scenes/Catalog';
import { Closing } from './scenes/Closing';
import { Hook } from './scenes/Hook';
import { Learning } from './scenes/Learning';
import { Levels } from './scenes/Levels';
import { Modes } from './scenes/Modes';
import { Results } from './scenes/Results';
import { Themes } from './scenes/Themes';

export const Presentation = () => (
  <>
    <Soundtrack />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={120} name="01 · El reto">
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={105} name="02 · Materias">
        <Brand />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={180} name="03 · 180 preguntas">
        <Catalog />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={135} name="04 · Niveles">
        <Levels />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={240} name="05 · Modos">
        <Modes />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={165} name="06 · Aprende">
        <Learning />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={180} name="07 · Temas">
        <Themes />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={180} name="08 · Resultados">
        <Results />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={180} name="09 · Juega">
        <Closing />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </>
);
