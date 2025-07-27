import React from 'react';
import { ArrowLeft, Calendar, Clock, Trophy, TrendingUp } from 'lucide-react';
import { useQuizAttempts } from '../../hooks/useQuizAttempts';
import { useAuth } from '../../contexts/AuthContext';

interface ScoreHistoryProps {
  onBack: () => void;
}

const ScoreHistory: React.FC<ScoreHistoryProps> = ({ onBack }) => {
  const { getStudentAttempts } = useQuizAttempts();
  const { user } = useAuth();

  const attempts = user ? getStudentAttempts(user.id) : [];
  const sortedAttempts = attempts.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

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
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreTrend = () => {
    if (attempts.length < 2) return null;
    const latest = sortedAttempts[0].score;
    const previous = sortedAttempts[1].score;
    return latest - previous;
  };

  const scoreTrend = getScoreTrend();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Score History</h1>
            <p className="text-gray-600 mt-2">Track your quiz performance over time</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {attempts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Quiz Attempts Yet</h2>
            <p className="text-gray-600 mb-6">Start taking quizzes to see your score history here.</p>
            <button
              onClick={onBack}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take Your First Quiz
            </button>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {Math.max(...attempts.map(a => a.score)).toFixed(1)}%
                    </h3>
                    <p className="text-gray-600">Best Score</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length).toFixed(1)}%
                    </h3>
                    <p className="text-gray-600">Average Score</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{attempts.length}</h3>
                    <p className="text-gray-600">Total Attempts</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {formatTime(Math.floor(attempts.reduce((sum, a) => sum + a.timeSpent, 0) / attempts.length))}
                    </h3>
                    <p className="text-gray-600">Avg. Time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Performance Trend */}
            {scoreTrend !== null && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Performance</h3>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  scoreTrend > 0 ? 'bg-green-100 text-green-800' :
                  scoreTrend < 0 ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    scoreTrend < 0 ? 'transform rotate-180' : ''
                  }`} />
                  {scoreTrend > 0 ? '+' : ''}{scoreTrend.toFixed(1)}% from last attempt
                </div>
              </div>
            )}

            {/* Attempt History */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">All Attempts</h3>
              {sortedAttempts.map((attempt, index) => (
                <div key={attempt.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-500 mr-3">#{attempts.length - index}</span>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(attempt.completedAt)}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatTime(attempt.timeSpent)}
                        </div>
                        <div className="flex items-center">
                          <Trophy className="w-4 h-4 mr-1" />
                          {Math.round(attempt.score * attempt.totalQuestions / 100)} / {attempt.totalQuestions} correct
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className={`inline-flex items-center px-4 py-2 rounded-lg border font-medium ${getScoreColor(attempt.score)}`}>
                        {attempt.score.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScoreHistory;