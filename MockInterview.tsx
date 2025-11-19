import React, { useState, useEffect } from 'react';
import { Video, Mic, MicOff, VideoOff, MessageSquare, Brain, Play, StopCircle, CheckCircle } from 'lucide-react';

export const MockInterview: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [response, setResponse] = useState('');
  const [scores, setScores] = useState({
    technical: 0,
    communication: 0,
    confidence: 0
  });
  const [isRecording, setIsRecording] = useState(false);

  const interviewQuestions = [
    {
      id: 1,
      type: 'technical',
      question: 'Explain the difference between HashMap and TreeMap in Java. When would you use each?',
      hints: ['Consider time complexity', 'Think about ordering requirements', 'Memory considerations']
    },
    {
      id: 2,
      type: 'technical',
      question: 'How would you design a rate limiter for an API? What data structures would you use?',
      hints: ['Consider using token bucket algorithm', 'Think about distributed systems', 'Redis or in-memory solutions']
    },
    {
      id: 3,
      type: 'behavioral',
      question: 'Tell me about a time when you had to debug a critical production issue under pressure.',
      hints: ['Use STAR method', 'Be specific about your actions', 'Mention the outcome']
    },
    {
      id: 4,
      type: 'technical',
      question: 'What is the time complexity of searching in a balanced BST? How does it compare to a hash table?',
      hints: ['O(log n) for BST', 'O(1) average for hash table', 'Consider worst-case scenarios']
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);

        if (timeElapsed % 30 === 0 && timeElapsed > 0) {
          setScores({
            technical: Math.min(100, scores.technical + Math.floor(Math.random() * 10)),
            communication: Math.min(100, scores.communication + Math.floor(Math.random() * 10)),
            confidence: Math.min(100, scores.confidence + Math.floor(Math.random() * 10))
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeElapsed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startInterview = () => {
    setIsActive(true);
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setScores({ technical: 0, communication: 0, confidence: 0 });
  };

  const endInterview = () => {
    setIsActive(false);
    setIsRecording(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setResponse('');
    } else {
      endInterview();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600 bg-green-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (!isActive) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-8 h-8" />
                <h2 className="text-3xl font-bold">AI Mock Interview</h2>
              </div>
              <p className="text-purple-100 text-lg">
                Practice with AI-powered interviews that simulate real placement scenarios
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <MessageSquare className="w-6 h-6 mb-2" />
              <h3 className="font-semibold mb-1">Real-time Feedback</h3>
              <p className="text-sm text-purple-100">Get instant AI analysis of your responses</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Brain className="w-6 h-6 mb-2" />
              <h3 className="font-semibold mb-1">Adaptive Questions</h3>
              <p className="text-sm text-purple-100">Questions tailored to your skill level</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <CheckCircle className="w-6 h-6 mb-2" />
              <h3 className="font-semibold mb-1">Performance Metrics</h3>
              <p className="text-sm text-purple-100">Track technical and soft skills</p>
            </div>
          </div>

          <button
            onClick={startInterview}
            className="flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition shadow-lg"
          >
            <Play className="w-5 h-5" />
            Start Mock Interview
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Technical Interview</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Data Structures & Algorithms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>System Design Scenarios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Problem Solving Approach</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Behavioral Interview</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>STAR Method Practice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Leadership Examples</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Team Collaboration Stories</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Mixed Format</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Combination of Both Types</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Company-Specific Questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Real Interview Simulation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const question = interviewQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
            <span className="font-semibold text-slate-800">Interview in Progress</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-mono font-bold text-slate-800">{formatTime(timeElapsed)}</span>
            <button
              onClick={endInterview}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              <StopCircle className="w-4 h-4" />
              End Interview
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 mb-1">Technical</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${scores.technical}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-blue-600">{scores.technical}%</span>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 mb-1">Communication</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-green-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${scores.communication}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-green-600">{scores.communication}%</span>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600 mb-1">Confidence</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-purple-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${scores.confidence}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-purple-600">{scores.confidence}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">
                Question {currentQuestion + 1} of {interviewQuestions.length}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                question.type === 'technical'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {question.type}
              </span>
            </div>

            <div className="bg-slate-50 border-l-4 border-blue-500 rounded-r-lg p-6 mb-6">
              <p className="text-lg text-slate-800 font-medium">{question.question}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-slate-700 text-sm">Hints:</h4>
              {question.hints.map((hint, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-blue-500 mt-1">💡</span>
                  <span>{hint}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-700">Your Response:</h4>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              rows={8}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isRecording
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
              >
                {isRecording ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                {isRecording ? 'Stop Recording' : 'Voice Answer'}
              </button>

              <button
                onClick={nextQuestion}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
              >
                {currentQuestion < interviewQuestions.length - 1 ? 'Next Question' : 'Finish Interview'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl shadow-lg aspect-video flex items-center justify-center">
            <div className="text-center text-white">
              <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-slate-400">Camera feed would appear here</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Real-time Analysis
            </h3>

            <div className="space-y-3">
              <div className="bg-green-50 border-l-4 border-green-400 rounded-r-lg p-3">
                <p className="text-sm font-medium text-green-900 mb-1">Strength Detected</p>
                <p className="text-sm text-green-800">Good technical understanding. Clear explanation of concepts.</p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg p-3">
                <p className="text-sm font-medium text-yellow-900 mb-1">Suggestion</p>
                <p className="text-sm text-yellow-800">Try to provide more specific examples from your experience.</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-3">
                <p className="text-sm font-medium text-blue-900 mb-1">Communication Tip</p>
                <p className="text-sm text-blue-800">Maintain eye contact and speak at a steady pace.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
