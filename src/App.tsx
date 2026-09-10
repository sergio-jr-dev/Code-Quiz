import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Game } from './components/quiz/game/Game';
import { QuizContextProvider } from './context/QuizContextProvider.tsx';

const App = () => {
  return (
    <>
      <Header />
      <QuizContextProvider>
        <Game />
      </QuizContextProvider>
      <Footer />
    </>
  );
};
export default App;
