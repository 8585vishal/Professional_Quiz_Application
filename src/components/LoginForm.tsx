import React, { useState } from 'react';
import { LogIn, User, Lock, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState<'admin' | 'student'>('student');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    } else {
      // Verify the user role matches the selected login type
      const users = JSON.parse(localStorage.getItem('quiz_users') || '[]');
      const foundUser = users.find((u: any) => u.username === username && u.password === password);
      if (foundUser && foundUser.role !== loginType) {
        setError(`Please use the ${foundUser.role} login section`);
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Login Type Selector */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setLoginType('student')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginType === 'student'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => setLoginType('admin')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginType === 'admin'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Admin Login
          </button>
        </div>

        <div className="text-center mb-8">
          <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${
            loginType === 'admin' ? 'bg-purple-100' : 'bg-blue-100'
          }`}>
            {loginType === 'admin' ? (
              <Shield className="w-8 h-8 text-purple-600" />
            ) : (
              <User className="w-8 h-8 text-blue-600" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {loginType === 'admin' ? 'Admin Panel' : 'Student Portal'}
          </h1>
          <p className="text-gray-600 mt-2">
            {loginType === 'admin' 
              ? 'Manage questions and view results' 
              : 'Take quizzes and track your progress'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-lg transition-colors font-medium text-white ${
              loginType === 'admin'
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Sign In as {loginType === 'admin' ? 'Admin' : 'Student'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p className="mb-2 font-medium">
              {loginType === 'admin' ? 'Admin' : 'Student'} Demo Credentials:
            </p>
            {loginType === 'admin' ? (
              <p><strong>Username:</strong> admin <strong>Password:</strong> admin123</p>
            ) : (
              <p><strong>Username:</strong> student <strong>Password:</strong> student123</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;