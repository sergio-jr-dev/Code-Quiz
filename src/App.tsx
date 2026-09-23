import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Game } from './components/quiz/game/Game';

const App = () => {
  return (
    <>
      <Header />
      <Game />
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
};
export default App;
