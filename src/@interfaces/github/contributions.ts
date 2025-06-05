export interface GitContributions {
  user: User;
  contributionStats: ContributionsStats;
}
export interface MonthlyContributions {
  month: string;
  count: number;
}
export interface User {
  createdAt: string;
  contributionsCollection: ContributionsCollection;
}

export interface ContributionsCollection {
  contributionYears: number[];
  contributionCalendar: ContributionCalendar;
}

export interface ContributionCalendar {
  weeks: Week[];
}

export interface Week {
  contributionDays: ContributionDay[];
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface ContributionsStats {
  totalContributions: number;
  firstContribution: string;
  monthlyContributions: MonthlyContributions[];
  currentStreak: CurrentStreak;
  longestStreak: LongestStreak;
}

export interface CurrentStreak {
  start: string;
  end: string;
  length: number;
}

export interface LongestStreak {
  start: string;
  end: string;
  length: number;
}
