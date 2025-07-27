export interface User {
  id: string;
  username: string;
  role: 'admin' | 'student';
  password: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  studentName: string;
  questions: Question[];
  answers: number[];
  score: number;
  totalQuestions: number;
  completedAt: Date;
  timeSpent: number; // in seconds
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}