import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Building2, Tag, TrendingUp } from 'lucide-react';
import { mockProblems } from '../lib/mockData';
import { Problem } from '../types';

export const QuestionBank: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>(mockProblems);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>(mockProblems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');

  const allTopics = Array.from(new Set(problems.flatMap(p => p.topics)));
  const allCompanies = Array.from(new Set(problems.flatMap(p => p.companies)));

  useEffect(() => {
    let filtered = problems;

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(p => p.difficulty === selectedDifficulty);
    }

    if (selectedTopic !== 'all') {
      filtered = filtered.filter(p => p.topics.includes(selectedTopic));
    }

    if (selectedCompany !== 'all') {
      filtered = filtered.filter(p => p.companies.includes(selectedCompany));
    }

    setFilteredProblems(filtered);
  }, [searchQuery, selectedDifficulty, selectedTopic, selectedCompany, problems]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-700 bg-green-100 border-green-200';
      case 'Medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'Hard': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getAcceptanceColor = (rate: number) => {
    if (rate >= 60) return 'text-green-600';
    if (rate >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Problem Bank</h2>
        </div>
        <p className="text-blue-100 text-lg">
          1000+ curated coding problems from top tech companies
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problems by title or description..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Topics</option>
              {allTopics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Company</label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Companies</option>
              {allCompanies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
          <span>Showing {filteredProblems.length} of {problems.length} problems</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium">
              Recommended
            </button>
            <button className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium">
              Most Popular
            </button>
            <button className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium">
              Recently Added
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredProblems.map((problem) => (
          <div
            key={problem.id}
            className="bg-white rounded-xl shadow-sm border-2 border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition">
                      {problem.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-3 line-clamp-2">{problem.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Topics:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {problem.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Companies:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {problem.companies.slice(0, 4).map((company, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-slate-800 text-white rounded text-xs font-medium"
                      >
                        {company}
                      </span>
                    ))}
                    {problem.companies.length > 4 && (
                      <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-xs font-medium">
                        +{problem.companies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600">Acceptance:</span>
                    <span className={`font-semibold ${getAcceptanceColor(problem.acceptance_rate)}`}>
                      {problem.acceptance_rate.toFixed(1)}%
                    </span>
                  </div>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">{problem.hints.length} hints available</span>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold rounded-lg transition">
                    View Details
                  </button>
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-sm">
                    Solve Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No problems found</h3>
          <p className="text-slate-600">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
};
