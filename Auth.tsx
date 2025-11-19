import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Code2, Brain, TrendingUp, Target } from 'lucide-react';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (!fullName.trim()) {
          setError('Full name is required');
          setLoading(false);
          return;
        }
        await signUp(email, password, fullName);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <div className="text-white space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Brain className="w-12 h-12 text-blue-400" />
              <h1 className="text-4xl font-bold">AI-Powered Placement Prep</h1>
            </div>
            <p className="text-xl text-slate-300">Master coding interviews with adaptive learning</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Code2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">1000+ Curated Problems</h3>
                <p className="text-slate-400">Company-tagged questions with detailed solutions</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Brain className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">AI Mock Interviews</h3>
                <p className="text-slate-400">Real-time feedback on technical and behavioral skills</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-500/20 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Adaptive Learning</h3>
                <p className="text-slate-400">Personalized problem recommendations based on your progress</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Performance Analytics</h3>
                <p className="text-slate-400">Track your progress and compete with peers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </h2>
            <p className="text-slate-600">
              {isLogin ? 'Sign in to continue your learning journey' : 'Create your account to begin'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
