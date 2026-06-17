export interface GitHubUser {
  avatar_url: string;
  name: string;
  login: string;
  html_url: string;
  company: string | null;
  location: string | null;
  created_at: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface LangStat {
  label: string;
  value: number;
  color: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  forks: number;
  fork: boolean;
  size: number;
  language: string | null;
}

export interface RateLimitCore {
  remaining: number;
  limit: number;
  reset: number;
}

export interface AppError {
  active: boolean;
  type: number;
}
