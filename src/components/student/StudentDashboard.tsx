import React, { useState } from 'react';
import { Play, Trophy, Clock, BookOpen, User } from 'lucide-react';
import QuizTaker from './QuizTaker';
import ScoreHistory from './ScoreHistory';
import { useQuestions } from '../../hooks/useQuestions';
import { useQuizAttempts } from '../../hooks/useQuizAttempts';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'quiz' | 'history'>('dashboard');
  const { questions } = useQuestions();
  const { getStudentAttempts } = useQuizAttempts();
  const { user } = useAuth();

  const studentAttempts = user ? getStudentAttempts(user.id) : [];
  const bestScore = studentAttempts.length > 0 
    ? Math.max(...studentAttempts.map(attempt => attempt.score)) 
    : 0;
  const averageScore = studentAttempts.length > 0
    ? studentAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / studentAttempts.length
    : 0;

  if (activeView === 'quiz') {
    return <QuizTaker onComplete={() => setActiveView('history')} />;
  }

  if (activeView === 'history') {
    return <ScoreHistory onBack={() => setActiveView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Student Portal</h1>
                <p className="text-gray-600 mt-1">Welcome back, {user?.username}! Take quizzes and track your progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{questions.length}</h3>
                <p className="text-gray-600">Available Questions</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{bestScore.toFixed(1)}%</h3>
                <p className="text-gray-600">Best Score</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{studentAttempts.length}</h3>
                <p className="text-gray-600">Quizzes Taken</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Play className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Take a Quiz?</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Answer questions uploaded by your admin. Test your knowledge and track your progress over time.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => setActiveView('quiz')}
                disabled={questions.length === 0}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-5 h-5 inline mr-2" />
                Start Quiz
              </button>

              {studentAttempts.length > 0 && (
                <div className="pt-4">
                  <button
                    onClick={() => setActiveView('history')}
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    View Score History →
                  </button>
                </div>
              )}
            </div>

            {questions.length === 0 && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">No questions available yet. Your admin needs to upload questions first.</p>
              </div>
            )}
          </div>

          {studentAttempts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{averageScore.toFixed(1)}%</div>
                  <div className="text-gray-600">Average Score</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{bestScore.toFixed(1)}%</div>
                  <div className="text-gray-600">Best Score</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;