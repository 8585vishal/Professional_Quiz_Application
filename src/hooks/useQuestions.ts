import { useState, useEffect } from 'react';
import { Question } from '../types';

const defaultQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
    category: 'Geography',
    difficulty: 'easy',
    createdAt: new Date()
  },
  {
    id: '2',
    question: 'Which programming language is known for its use in web development?',
    options: ['Python', 'JavaScript', 'C++', 'Java'],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'medium',
    createdAt: new Date()
  },
  {
    id: '3',
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    category: 'Mathematics',
    difficulty: 'easy',
    createdAt: new Date()
  }
];

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('quiz_questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      setQuestions(defaultQuestions);
      localStorage.setItem('quiz_questions', JSON.stringify(defaultQuestions));
    }
  }, []);

  const saveQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    localStorage.setItem('quiz_questions', JSON.stringify(newQuestions));
  };

  const addQuestion = (question: Omit<Question, 'id' | 'createdAt'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    const updatedQuestions = [...questions, newQuestion];
    saveQuestions(updatedQuestions);
  };

  const updateQuestion = (id: string, question: Omit<Question, 'id' | 'createdAt'>) => {
    const updatedQuestions = questions.map(q => 
      q.id === id ? { ...question, id, createdAt: q.createdAt } : q
    );
    saveQuestions(updatedQuestions);
  };

  const deleteQuestion = (id: string) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    saveQuestions(updatedQuestions);
  };

  return {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion
  };
};