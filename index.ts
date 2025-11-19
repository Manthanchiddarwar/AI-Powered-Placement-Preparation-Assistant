export interface User {
  id: string;
  full_name: string;
  email: string;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  target_companies: string[];
  preferred_languages: string[];
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  companies: string[];
  acceptance_rate: number;
  constraints?: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  hints: string[];
  solution_approach?: string;
  created_at: string;
}

export interface Submission {
  id: string;
  user_id: string;
  problem_id: string;
  code: string;
  language: string;
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit' | 'pending';
  test_cases_passed: number;
  total_test_cases: number;
  execution_time: number;
  memory_used: number;
  ai_feedback?: string;
  score: number;
  submitted_at: string;
}

export interface MockInterview {
  id: string;
  user_id: string;
  interview_type: 'technical' | 'behavioral' | 'mixed';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  questions: Array<{
    id: string;
    question: string;
    type: string;
    expected_answer?: string;
  }>;
  responses: Array<{
    question_id: string;
    answer: string;
    timestamp: string;
    score?: number;
  }>;
  overall_score: number;
  technical_score: number;
  communication_score: number;
  confidence_score: number;
  ai_analysis?: string;
  strengths: string[];
  improvements: string[];
  status: 'in_progress' | 'completed' | 'abandoned';
  started_at: string;
  completed_at?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  topic: string;
  problems_solved: number;
  problems_attempted: number;
  success_rate: number;
  average_difficulty: number;
  time_spent: number;
  last_practiced: string;
  skill_rating: number;
  updated_at: string;
}

export interface Recommendation {
  id: string;
  user_id: string;
  problem_id: string;
  problem?: Problem;
  reason: string;
  priority: number;
  is_completed: boolean;
  generated_at: string;
  expires_at: string;
}

export interface LeaderboardEntry {
  id: string;
  user_id: string;
  user?: User;
  total_score: number;
  problems_solved: number;
  rank: number;
  streak_days: number;
  interviews_completed: number;
  updated_at: string;
}

export interface DashboardStats {
  total_problems_solved: number;
  current_streak: number;
  total_score: number;
  rank: number;
  interviews_completed: number;
  average_success_rate: number;
  time_spent_today: number;
  skill_distribution: Record<string, number>;
}
