import React from 'react';
import { Calendar, Clock, Trophy, User } from 'lucide-react';
import { useQuizAttempts } from '../../hooks/useQuizAttempts';

const ResultsViewer: React.FC = () => {
  const { attempts } = useQuizAttempts();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Student Quiz Results</h2>
          <p className="text-gray-600 text-sm mt-1">Monitor student performance and quiz attempts</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{attempts.length}</p>
          <p className="text-gray-600 text-sm">Total Attempts</p>
        </div>
      </div>

      {attempts.length === 0 ? (
        <div className="text-center py-12">
          <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Student Attempts Yet</h3>
          <p className="text-gray-600">Student quiz results and scores will appear here once they start taking quizzes with your uploaded questions.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {attempts
            .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
            .map((attempt) => (
              <div key={attempt.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <User className="w-5 h-5 text-gray-400 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">{attempt.studentName}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(attempt.completedAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatTime(attempt.timeSpent)}
                      </div>
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-1" />
                        {attempt.score}% ({attempt.score * attempt.totalQuestions / 100} / {attempt.totalQuestions})
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(attempt.score)}`}>
                      {attempt.score}%
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Question Details:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {attempt.questions.map((question, index) => {
                      const isCorrect = attempt.answers[index] === question.correctAnswer;
                      return (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border text-sm ${
                            isCorrect
                              ? 'bg-green-50 border-green-200'
                              : 'bg-red-50 border-red-200'
                          }`}
                        >
                          <div className="font-medium mb-1">
                            Q{index + 1}: {isCorrect ? '✓' : '✗'}
                          </div>
                          <div className="text-gray-600 text-xs">
                            {question.question.substring(0, 50)}...
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ResultsViewer;