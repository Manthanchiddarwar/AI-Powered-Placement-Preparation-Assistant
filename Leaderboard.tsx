import React, { useState, useEffect } from 'react';
import { Trophy, Medal, TrendingUp, Flame, Award, Crown } from 'lucide-react';
import { mockLeaderboard } from '../lib/mockData';
import { LeaderboardEntry } from '../types';

export const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'all-time'>('all-time');

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard(prev => prev.map(entry => ({
        ...entry,
        total_score: entry.total_score + Math.floor(Math.random() * 10),
        problems_solved: entry.problems_solved + (Math.random() > 0.7 ? 1 : 0)
      })).sort((a, b) => b.total_score - a.total_score).map((entry, index) => ({
        ...entry,
        rank: index + 1
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-slate-400" />;
      case 3: return <Medal className="w-6 h-6 text-orange-600" />;
      default: return <span className="text-lg font-bold text-slate-600">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'bg-blue-50 border-blue-300';
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300';
    if (rank === 2) return 'bg-gradient-to-r from-slate-50 to-slate-100 border-slate-300';
    if (rank === 3) return 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-300';
    return 'bg-white border-slate-200';
  };

  const currentUser = leaderboard.find(entry => entry.user_id === 'current');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Global Leaderboard</h2>
            </div>
            <p className="text-orange-100 text-lg">
              Compete with peers and track your progress
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Rankings</span>
            </div>
          </div>
        </div>
      </div>

      {currentUser && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 mb-1">Your Current Rank</p>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold">#{currentUser.rank}</span>
                <div>
                  <p className="text-2xl font-bold">{currentUser.total_score} points</p>
                  <p className="text-blue-200">{currentUser.problems_solved} problems solved</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Flame className="w-6 h-6 mx-auto mb-1" />
                <p className="text-2xl font-bold">{currentUser.streak_days}</p>
                <p className="text-xs text-blue-200">Day Streak</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Award className="w-6 h-6 mx-auto mb-1" />
                <p className="text-2xl font-bold">{currentUser.interviews_completed}</p>
                <p className="text-xs text-blue-200">Interviews</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">Top Performers</h3>
          <div className="flex gap-2">
            {(['daily', 'weekly', 'all-time'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tf.charAt(0).toUpperCase() + tf.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {leaderboard.map((entry) => {
            const isCurrentUser = entry.user_id === 'current';
            return (
              <div
                key={entry.id}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${getRankBg(entry.rank, isCurrentUser)} ${
                  isCurrentUser ? 'shadow-md ring-2 ring-blue-500' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12">
                  {getRankIcon(entry.rank)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-800">
                      {entry.user?.full_name}
                    </h4>
                    {isCurrentUser && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        YOU
                      </span>
                    )}
                    {entry.rank <= 3 && (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {entry.total_score} pts
                    </span>
                    <span>•</span>
                    <span>{entry.problems_solved} solved</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      {entry.streak_days} days
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">Skill Level</p>
                    <p className="font-semibold text-slate-800 capitalize">
                      {entry.user?.skill_level}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">Target</p>
                    <p className="font-semibold text-slate-800">
                      {entry.user?.target_companies[0] || 'N/A'}
                    </p>
                  </div>
                </div>

                {entry.rank <= 3 && (
                  <div className="flex flex-col items-center gap-1">
                    {entry.rank === 1 && (
                      <>
                        <Crown className="w-8 h-8 text-yellow-500 animate-bounce" />
                        <span className="text-xs font-semibold text-yellow-600">Champion</span>
                      </>
                    )}
                    {entry.rank === 2 && (
                      <>
                        <Medal className="w-8 h-8 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600">Runner-up</span>
                      </>
                    )}
                    {entry.rank === 3 && (
                      <>
                        <Medal className="w-8 h-8 text-orange-600" />
                        <span className="text-xs font-semibold text-orange-600">Third Place</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="text-3xl font-bold text-slate-800">
              {leaderboard[0]?.total_score || 0}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Top Score</h3>
          <p className="text-sm text-slate-600">
            Held by {leaderboard[0]?.user?.full_name}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-8 h-8 text-orange-500" />
            <span className="text-3xl font-bold text-slate-800">
              {Math.max(...leaderboard.map(e => e.streak_days))}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Longest Streak</h3>
          <p className="text-sm text-slate-600">
            Current active learning streak
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-blue-500" />
            <span className="text-3xl font-bold text-slate-800">
              {leaderboard.length}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Active Users</h3>
          <p className="text-sm text-slate-600">
            Currently on the leaderboard
          </p>
        </div>
      </div>
    </div>
  );
};
