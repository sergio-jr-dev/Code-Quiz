import { QuizContextProvider } from './context/QuizContextProvider.tsx';
import { Header } from './components/header/Header';
import { Game } from './components/quiz/game/Game';
import { Footer } from './components/footer/Footer';

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
