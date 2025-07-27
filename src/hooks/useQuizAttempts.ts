import { useState, useEffect } from 'react';
import { QuizAttempt } from '../types';

export const useQuizAttempts = () => {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    const savedAttempts = localStorage.getItem('quiz_attempts');
    if (savedAttempts) {
      setAttempts(JSON.parse(savedAttempts));
    }
  }, []);

  const saveAttempt = (attempt: QuizAttempt) => {
    const updatedAttempts = [...attempts, attempt];
    setAttempts(updatedAttempts);
    localStorage.setItem('quiz_attempts', JSON.stringify(updatedAttempts));
  };

  const getStudentAttempts = (studentId: string) => {
    return attempts.filter(attempt => attempt.studentId === studentId);
  };

  return {
    attempts,
    saveAttempt,
    getStudentAttempts
  };
};