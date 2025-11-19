import { Problem, LeaderboardEntry, UserProgress, Recommendation, DashboardStats } from '../types';

export const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptance_rate: 48.5,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9' }
    ],
    hints: ['Try using a hash map to store complements', 'Think about the time complexity'],
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Binary Tree Level Order Traversal',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values.',
    difficulty: 'Medium',
    topics: ['Tree', 'BFS', 'Binary Tree'],
    companies: ['Facebook', 'Amazon', 'Microsoft'],
    acceptance_rate: 62.3,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }
    ],
    hints: ['Use a queue for BFS traversal', 'Track level information'],
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Median of Two Sorted Arrays',
    description: 'Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.',
    difficulty: 'Hard',
    topics: ['Array', 'Binary Search', 'Divide and Conquer'],
    companies: ['Google', 'Adobe', 'Apple'],
    acceptance_rate: 35.8,
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000', explanation: 'merged array = [1,2,3] and median is 2.' }
    ],
    hints: ['Binary search on the smaller array', 'Think about partitioning'],
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    difficulty: 'Easy',
    topics: ['String', 'Stack'],
    companies: ['Amazon', 'Bloomberg', 'Facebook'],
    acceptance_rate: 42.1,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' }
    ],
    hints: ['Use a stack data structure', 'Match opening with closing brackets'],
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Longest Common Subsequence',
    description: 'Given two strings text1 and text2, return the length of their longest common subsequence.',
    difficulty: 'Medium',
    topics: ['Dynamic Programming', 'String'],
    companies: ['Google', 'Microsoft', 'Amazon'],
    acceptance_rate: 58.9,
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'The longest common subsequence is "ace"' }
    ],
    hints: ['Use 2D DP array', 'Build solution bottom-up'],
    created_at: new Date().toISOString()
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    user_id: 'user1',
    user: {
      id: 'user1',
      full_name: 'Alex Johnson',
      email: 'alex@example.com',
      skill_level: 'advanced',
      target_companies: ['Google', 'Amazon'],
      preferred_languages: ['Python', 'Java'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    total_score: 8750,
    problems_solved: 287,
    rank: 1,
    streak_days: 45,
    interviews_completed: 12,
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'user2',
    user: {
      id: 'user2',
      full_name: 'Sarah Chen',
      email: 'sarah@example.com',
      skill_level: 'advanced',
      target_companies: ['Microsoft', 'Facebook'],
      preferred_languages: ['C++', 'Python'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    total_score: 8320,
    problems_solved: 265,
    rank: 2,
    streak_days: 38,
    interviews_completed: 10,
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    user_id: 'user3',
    user: {
      id: 'user3',
      full_name: 'Michael Brown',
      email: 'michael@example.com',
      skill_level: 'intermediate',
      target_companies: ['Apple', 'Netflix'],
      preferred_languages: ['Java', 'Python'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    total_score: 7890,
    problems_solved: 243,
    rank: 3,
    streak_days: 28,
    interviews_completed: 8,
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    user_id: 'current',
    user: {
      id: 'current',
      full_name: 'You',
      email: 'you@example.com',
      skill_level: 'intermediate',
      target_companies: ['Google', 'Amazon'],
      preferred_languages: ['Python', 'Java'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    total_score: 6540,
    problems_solved: 198,
    rank: 12,
    streak_days: 15,
    interviews_completed: 5,
    updated_at: new Date().toISOString()
  }
];

export const mockUserProgress: UserProgress[] = [
  {
    id: '1',
    user_id: 'current',
    topic: 'Arrays',
    problems_solved: 45,
    problems_attempted: 52,
    success_rate: 86.5,
    average_difficulty: 2.1,
    time_spent: 3420,
    last_practiced: new Date().toISOString(),
    skill_rating: 750,
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'current',
    topic: 'Dynamic Programming',
    problems_solved: 28,
    problems_attempted: 38,
    success_rate: 73.7,
    average_difficulty: 2.6,
    time_spent: 4580,
    last_practiced: new Date(Date.now() - 86400000).toISOString(),
    skill_rating: 680,
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    user_id: 'current',
    topic: 'Trees',
    problems_solved: 38,
    problems_attempted: 44,
    success_rate: 86.4,
    average_difficulty: 2.3,
    time_spent: 2890,
    last_practiced: new Date(Date.now() - 172800000).toISOString(),
    skill_rating: 720,
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    user_id: 'current',
    topic: 'Graphs',
    problems_solved: 22,
    problems_attempted: 31,
    success_rate: 71.0,
    average_difficulty: 2.7,
    time_spent: 3210,
    last_practiced: new Date(Date.now() - 259200000).toISOString(),
    skill_rating: 640,
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    user_id: 'current',
    topic: 'Strings',
    problems_solved: 35,
    problems_attempted: 41,
    success_rate: 85.4,
    average_difficulty: 2.0,
    time_spent: 2340,
    last_practiced: new Date().toISOString(),
    skill_rating: 710,
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    user_id: 'current',
    topic: 'Hash Tables',
    problems_solved: 30,
    problems_attempted: 35,
    success_rate: 85.7,
    average_difficulty: 1.9,
    time_spent: 1890,
    last_practiced: new Date(Date.now() - 86400000).toISOString(),
    skill_rating: 695,
    updated_at: new Date().toISOString()
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    user_id: 'current',
    problem_id: '2',
    problem: mockProblems[1],
    reason: 'Strengthen your BFS skills - you have 73% success rate in tree problems',
    priority: 5,
    is_completed: false,
    generated_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 7 * 86400000).toISOString()
  },
  {
    id: '2',
    user_id: 'current',
    problem_id: '5',
    problem: mockProblems[4],
    reason: 'Focus on Dynamic Programming - lower success rate (73.7%) needs improvement',
    priority: 4,
    is_completed: false,
    generated_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 7 * 86400000).toISOString()
  },
  {
    id: '3',
    user_id: 'current',
    problem_id: '4',
    problem: mockProblems[3],
    reason: 'Perfect for maintaining your high success rate in data structures',
    priority: 3,
    is_completed: false,
    generated_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 7 * 86400000).toISOString()
  }
];

export const mockDashboardStats: DashboardStats = {
  total_problems_solved: 198,
  current_streak: 15,
  total_score: 6540,
  rank: 12,
  interviews_completed: 5,
  average_success_rate: 81.2,
  time_spent_today: 145,
  skill_distribution: {
    'Arrays': 750,
    'Dynamic Programming': 680,
    'Trees': 720,
    'Graphs': 640,
    'Strings': 710,
    'Hash Tables': 695
  }
};
