import { SUBJECTS } from '../types/questionBank';
import type { BankQuestion, Subject } from '../types/questionBank';
import type { QuizAnswer } from '../types/quizStore';

export interface SubjectResultSummary {
  readonly subject: Subject;
  readonly correct: number;
  readonly total: number;
}

export function summarizeRoundBySubject(
  round: readonly BankQuestion[],
  answers: readonly QuizAnswer[],
): readonly SubjectResultSummary[] {
  const selectedOptions = new Map(
    answers.map((answer) => [answer.questionId, answer.selectedOptionId]),
  );

  return SUBJECTS.flatMap((subject) => {
    const questions = round.filter((question) => question.subject === subject);
    if (questions.length === 0) return [];

    return [
      {
        subject,
        total: questions.length,
        correct: questions.filter(
          (question) => selectedOptions.get(question.id) === question.correctAnswer,
        ).length,
      },
    ];
  });
}
