import React, { useState, useEffect } from 'react';
import { Sparkles, Target, TrendingUp, Clock, Award } from 'lucide-react';
import { mockRecommendations } from '../lib/mockData';
import { Recommendation } from '../types';

export const ProblemRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecommendations(prev => [...prev]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-700 bg-green-100 border-green-200';
      case 'Medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'Hard': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getPriorityIcon = (priority: number) => {
    if (priority >= 4) return <Sparkles className="w-5 h-5 text-yellow-500" />;
    return <Target className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">AI-Powered Recommendations</h2>
            </div>
            <p className="text-blue-100">
              Personalized problems based on your skill level and performance patterns
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {recommendations.map((rec, index) => (
          <div
            key={rec.id}
            className="bg-white rounded-xl shadow-sm border-2 border-slate-200 hover:border-blue-400 transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getPriorityIcon(rec.priority)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition">
                          {rec.problem?.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(rec.problem?.difficulty || '')}`}>
                          {rec.problem?.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          Priority: {rec.priority}/5
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {rec.problem?.acceptance_rate.toFixed(1)}% acceptance
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-4 mb-4">
                    <p className="text-sm font-medium text-blue-900 mb-1">Why this problem?</p>
                    <p className="text-sm text-blue-800">{rec.reason}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-slate-600 mb-2">Topics covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {rec.problem?.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-slate-600 mb-2">Asked by:</p>
                    <div className="flex flex-wrap gap-2">
                      {rec.problem?.companies.slice(0, 5).map((company, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-full text-xs font-medium"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-sm">
                      Start Problem
                    </button>
                    <button className="px-6 py-3 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold rounded-lg transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Expires in {Math.ceil((new Date(rec.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                </span>
                <span>Recommendation #{index + 1}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="text-center">
          <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-800 mb-2">Adaptive Learning in Action</h3>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            These recommendations are generated by our AI engine based on your performance patterns,
            skill gaps, and target companies. Complete them to unlock more personalized suggestions.
          </p>
        </div>
      </div>
    </div>
  );
};
