import React, { useState, useEffect } from 'react';
import { Play, Save, RotateCcw, CheckCircle, XCircle, Clock, Zap, Code2 } from 'lucide-react';

export const CodeEditor: React.FC = () => {
  const [code, setCode] = useState(`def two_sum(nums, target):
    # Write your solution here
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []

# Test cases
print(two_sum([2, 7, 11, 15], 9))  # Expected: [0, 1]`);

  const [language, setLanguage] = useState('python');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [testResults, setTestResults] = useState<any[]>([]);

  const languages = [
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '⚡' }
  ];

  const problemInfo = {
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      'Only one valid answer exists'
    ]
  };

  const mockTestCases = [
    { input: '[2,7,11,15], target=9', expected: '[0,1]', status: 'pending' },
    { input: '[3,2,4], target=6', expected: '[1,2]', status: 'pending' },
    { input: '[3,3], target=6', expected: '[0,1]', status: 'pending' },
  ];

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      const results = mockTestCases.map((test, i) => ({
        ...test,
        status: Math.random() > 0.2 ? 'passed' : 'failed',
        runtime: Math.floor(Math.random() * 50) + 10,
        memory: Math.floor(Math.random() * 20) + 10
      }));

      setTestResults(results);
      setOutput({
        status: results.every(r => r.status === 'passed') ? 'accepted' : 'wrong_answer',
        passed: results.filter(r => r.status === 'passed').length,
        total: results.length,
        runtime: Math.floor(Math.random() * 100) + 50,
        memory: Math.floor(Math.random() * 30) + 15,
        feedback: 'Good implementation! Consider optimizing for edge cases.'
      });
      setIsRunning(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-700 bg-green-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'Hard': return 'text-red-700 bg-red-100';
      default: return 'text-slate-700 bg-slate-100';
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-800">{problemInfo.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problemInfo.difficulty)}`}>
                  {problemInfo.difficulty}
                </span>
              </div>
            </div>
          </div>

          <div className="prose prose-sm max-w-none mb-4">
            <p className="text-slate-600">{problemInfo.description}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-slate-800 mb-2">Constraints:</h3>
            <ul className="space-y-1">
              {problemInfo.constraints.map((constraint, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{constraint}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3">Example Test Cases</h3>
            <div className="space-y-3">
              {mockTestCases.map((test, i) => (
                <div key={i} className="bg-white rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-slate-600">Input:</span>
                    <span className="font-mono text-blue-600">{test.input}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-600">Output:</span>
                    <span className="font-mono text-green-600">{test.expected}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">Code Editor</span>
              </div>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      language === lang.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {lang.icon} {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Code
                  </>
                )}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
                <Save className="w-4 h-4" />
                Submit
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-4 font-mono text-sm bg-slate-900 text-slate-100 border-none outline-none resize-none"
            style={{ height: '400px' }}
            spellCheck={false}
          />
        </div>

        {output && (
          <div className={`rounded-xl shadow-sm border-2 overflow-hidden ${
            output.status === 'accepted'
              ? 'border-green-500 bg-green-50'
              : 'border-red-500 bg-red-50'
          }`}>
            <div className={`p-4 ${
              output.status === 'accepted' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <div className="flex items-center gap-3">
                {output.status === 'accepted' ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <div>
                  <h3 className={`font-bold text-lg ${
                    output.status === 'accepted' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {output.status === 'accepted' ? 'Accepted!' : 'Wrong Answer'}
                  </h3>
                  <p className={`text-sm ${
                    output.status === 'accepted' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {output.passed}/{output.total} test cases passed
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    Runtime: <span className="font-semibold">{output.runtime}ms</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    Memory: <span className="font-semibold">{output.memory}MB</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {testResults.map((result, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${
                      result.status === 'passed'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Test Case {i + 1}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        result.status === 'passed'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}>
                        {result.status === 'passed' ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-3">
                <p className="text-sm font-medium text-blue-900 mb-1">AI Feedback</p>
                <p className="text-sm text-blue-800">{output.feedback}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
