import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { mockUserProgress } from '../lib/mockData';
import { UserProgress } from '../types';

export const PerformanceDashboard: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress[]>(mockUserProgress);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev.map(p => ({
        ...p,
        time_spent: p.time_spent + Math.floor(Math.random() * 5)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSuccessColor = (rate: number) => {
    if (rate >= 85) return 'text-green-600 bg-green-50';
    if (rate >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getProgressColor = (rate: number) => {
    if (rate >= 85) return 'bg-green-500';
    if (rate >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const topicDetails = selectedTopic ? progress.find(p => p.topic === selectedTopic) : null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Skill Analysis</h2>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Updates</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 mb-4">Topic Performance</h3>
            {progress.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTopic(item.topic)}
                className={`p-4 rounded-lg border-2 transition cursor-pointer ${
                  selectedTopic === item.topic
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">{item.topic}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSuccessColor(item.success_rate)}`}>
                        {item.success_rate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        {item.problems_solved}/{item.problems_attempted}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTime(item.time_spent)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Skill Rating</span>
                    <span className="font-semibold">{item.skill_rating}/1000</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(item.success_rate)}`}
                      style={{ width: `${(item.skill_rating / 1000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {topicDetails ? (
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4">{topicDetails.topic} - Deep Dive</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-slate-600 mb-1">Problems Solved</p>
                    <p className="text-2xl font-bold text-slate-800">{topicDetails.problems_solved}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-slate-600 mb-1">Success Rate</p>
                    <p className="text-2xl font-bold text-green-600">{topicDetails.success_rate.toFixed(1)}%</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-slate-600 mb-1">Avg Difficulty</p>
                    <p className="text-2xl font-bold text-slate-800">{topicDetails.average_difficulty.toFixed(1)}/3</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-slate-600 mb-1">Total Time</p>
                    <p className="text-2xl font-bold text-slate-800">{formatTime(topicDetails.time_spent)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-slate-800 mb-1">Strength</p>
                        <p className="text-sm text-slate-600">
                          {topicDetails.success_rate >= 85
                            ? 'Excellent performance! Keep maintaining this level.'
                            : 'Good foundation. Focus on harder problems.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <p className="font-semibold text-slate-800 mb-1">Recommendation</p>
                        <p className="text-sm text-slate-600">
                          {topicDetails.success_rate < 75
                            ? 'Practice more easy/medium problems to build confidence.'
                            : 'Challenge yourself with harder problems and edge cases.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-100 rounded-xl p-12 text-center border border-slate-200">
                <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 font-medium">Select a topic to view detailed analysis</p>
                <p className="text-sm text-slate-500 mt-2">Click on any topic card to see insights</p>
              </div>
            )}

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4">Overall Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total Problems</span>
                  <span className="font-semibold text-slate-800">
                    {progress.reduce((sum, p) => sum + p.problems_solved, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Average Success Rate</span>
                  <span className="font-semibold text-green-600">
                    {(progress.reduce((sum, p) => sum + p.success_rate, 0) / progress.length).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total Study Time</span>
                  <span className="font-semibold text-slate-800">
                    {formatTime(progress.reduce((sum, p) => sum + p.time_spent, 0))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Average Skill Rating</span>
                  <span className="font-semibold text-blue-600">
                    {Math.round(progress.reduce((sum, p) => sum + p.skill_rating, 0) / progress.length)}/1000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
