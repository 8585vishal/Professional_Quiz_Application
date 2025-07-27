import React, { useState } from 'react';
import { Plus, Users, BarChart3, BookOpen, Shield } from 'lucide-react';
import QuestionManager from './QuestionManager';
import ResultsViewer from './ResultsViewer';
import { useQuestions } from '../../hooks/useQuestions';
import { useQuizAttempts } from '../../hooks/useQuizAttempts';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'questions' | 'results'>('questions');
  const { questions } = useQuestions();
  const { attempts } = useQuizAttempts();

  const uniqueStudents = new Set(attempts.map(attempt => attempt.studentId)).size;
  const averageScore = attempts.length > 0 
    ? attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
                <p className="text-gray-600 mt-1">Upload questions, manage content, and monitor student performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{questions.length}</h3>
                <p className="text-gray-600">Total Questions</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{uniqueStudents}</h3>
                <p className="text-gray-600">Students Participated</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{averageScore.toFixed(1)}%</h3>
                <p className="text-gray-600">Average Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('questions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'questions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Manage Questions
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'results'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                View Results
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'questions' && <QuestionManager />}
            {activeTab === 'results' && <ResultsViewer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;