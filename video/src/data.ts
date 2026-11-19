import { htmlQuestions } from '../../src/data/bank/html';

const question = htmlQuestions.find((item) => item.id === 'html-links-001');
if (!question) throw new Error('La pregunta del vídeo no existe en el catálogo.');

export const demoQuestion = {
  prompt: question.prompt
    .map((block) => (block.type === 'text' ? block.text : block.code))
    .join(' '),
  options: question.options.map((option) => ({
    id: option.id,
    text: option.content
      .map((block) => (block.type === 'text' ? block.text : block.code))
      .join(' '),
  })),
  correctAnswer: question.correctAnswer,
  explanation: question.explanation
    .map((block) => (block.type === 'text' ? block.text : block.code))
    .join(' '),
};

export const subjects = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'javascript', label: 'JavaScript' },
];

export const levels = [
  { id: 'basic', label: 'Básico' },
  { id: 'intermediate', label: 'Intermedio' },
  { id: 'advanced', label: 'Avanzado' },
];
