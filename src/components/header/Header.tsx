import { Container } from '../container/Container';
import { PersonalPanel } from '../personalPanel/PersonalPanel';

import './header.css';

export const Header = () => {
  return (
    <header className="web-header">
      <Container>
        <img
          className="brand-logo brand-logo-dark"
          src={`${import.meta.env.BASE_URL}images/code-quiz-logo-dark.webp`}
          alt="Code Quiz"
          width="960"
          height="448"
        />
        <img
          className="brand-logo brand-logo-light"
          src={`${import.meta.env.BASE_URL}images/code-quiz-logo-light.webp`}
          alt="Code Quiz"
          width="960"
          height="448"
        />
        <PersonalPanel />
      </Container>
    </header>
  );
};
