export interface CareerStats {
  goals: number;
  appearances: number;
  assists: number;
  hatTricks: number;
}

export interface ClubSpint {
  id: string;
  club: string;
  text?: string;
  league: string;
  startYear: number;
  endYear: number | 'Present';
  apps: number;
  goals: number;
  assists: number;
  colorCode: string;
  logoText: string;
}

export interface Trophy {
  id: string;
  name: string;
  competition: string;
  season: string;
  imageIcon: string; 
}

export interface SeasonTrophies {
  season: string;
  club: string;
  trophies: Trophy[];
}

export interface Milestone {
  id: string;
  year: number;
  title: string;
  description: string;
  icon: string;
}

export interface LegacyHighlight {
  id: string;
  title: string;
  date: string;
  competition: string;
  quoteOrStat: string;
  colorClass: string;
}

export interface SeasonGoalTrend {
  season: string;
  goals: number;
  assists: number;
  apps: number;
  club: string;
}
