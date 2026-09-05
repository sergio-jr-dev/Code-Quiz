export const Header = () => {
  return (
    <header>
      <div className="container">
        <h1>
          <img
            className="brand-logo"
            src={`${import.meta.env.BASE_URL}images/code-quiz-logo-dark.webp`}
            alt="Code Quiz"
            width="960"
            height="448"
          />
        </h1>
      </div>
    </header>
  );
};
