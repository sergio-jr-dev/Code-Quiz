import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconCoffee,
  IconExternalLink,
} from '@tabler/icons-react';

import { Container } from '../container/Container';

import './footer.css';

export const Footer = () => {
  return (
    <footer>
      <Container className="footer-container">
        <div className="footer-content">
          <p className="footer-author">&copy; 2026 · Sergio Jiménez Rubio</p>

          <nav aria-label="Enlaces del proyecto" className="project-links">
            <ul>
              <li>
                <a
                  href="https://github.com/sergio-jr-dev/Code-Quiz"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <IconBrandGithub aria-hidden="true" />
                  Código fuente
                </a>
              </li>
              <li>
                <a
                  href="https://sergiojimenez.vercel.app/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Portfolio
                  <IconExternalLink aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://baselinelab.dev/" rel="noopener noreferrer" target="_blank">
                  BaselineLab
                  <IconExternalLink aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>

          <div className="footer-actions">
            <nav aria-label="Redes sociales" className="social-links">
              <ul>
                <li>
                  <a
                    aria-label="LinkedIn de Sergio Jiménez Rubio"
                    href="https://www.linkedin.com/in/sergio-jim%C3%A9nez-rubio/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <IconBrandLinkedin aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    aria-label="X de Sergio Jiménez Rubio"
                    href="https://x.com/sergiojr_dev"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <IconBrandX aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>

            <a
              className="support-link"
              href="https://buymeacoffee.com/sjr.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconCoffee aria-hidden="true" />
              Apoyar el proyecto
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
