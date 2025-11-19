import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Code2,
  MessageSquare,
  BookOpen,
  Trophy,
  LogOut,
  TrendingUp,
  Flame,
  Target,
  Clock,
  Award,
  Activity
} from 'lucide-react';
import { PerformanceDashboard } from './PerformanceDashboard';
import { ProblemRecommendations } from './ProblemRecommendations';
import { CodeEditor } from './CodeEditor';
import { MockInterview } from './MockInterview';
import { QuestionBank } from './QuestionBank';
import { Leaderboard } from './Leaderboard';
import { mockDashboardStats } from '../lib/mockData';

type Tab = 'dashboard' | 'problems' | 'editor' | 'interview' | 'bank' | 'leaderboard';

export const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState(mockDashboardStats);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        time_spent_today: prev.time_spent_today + 1
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'problems' as Tab, label: 'Recommended', icon: TrendingUp },
    { id: 'bank' as Tab, label: 'Problem Bank', icon: BookOpen },
    { id: 'editor' as Tab, label: 'Code Editor', icon: Code2 },
    { id: 'interview' as Tab, label: 'Mock Interview', icon: MessageSquare },
    { id: 'leaderboard' as Tab, label: 'Leaderboard', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">AI Placement Prep</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-semibold text-slate-700">{stats.current_streak} day streak</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold text-slate-700">{stats.total_score} points</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-blue-500" />
                <span className="font-semibold text-slate-700">Rank #{stats.rank}</span>
              </div>
            </div>

            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition whitespace-nowrap border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-8 h-8 opacity-80" />
                    <span className="text-3xl font-bold">{stats.total_problems_solved}</span>
                  </div>
                  <p className="text-blue-100">Problems Solved</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Flame className="w-8 h-8 opacity-80" />
                    <span className="text-3xl font-bold">{stats.current_streak}</span>
                  </div>
                  <p className="text-orange-100">Day Streak</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="w-8 h-8 opacity-80" />
                    <span className="text-3xl font-bold">{stats.average_success_rate.toFixed(1)}%</span>
                  </div>
                  <p className="text-green-100">Success Rate</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-8 h-8 opacity-80" />
                    <span className="text-3xl font-bold">{stats.time_spent_today}</span>
                  </div>
                  <p className="text-purple-100">Minutes Today</p>
                </div>
              </div>

              <PerformanceDashboard />
            </>
          )}

          {activeTab === 'problems' && <ProblemRecommendations />}
          {activeTab === 'bank' && <QuestionBank />}
          {activeTab === 'editor' && <CodeEditor />}
          {activeTab === 'interview' && <MockInterview />}
          {activeTab === 'leaderboard' && <Leaderboard />}
        </div>
      </div>
    </div>
  );
};
