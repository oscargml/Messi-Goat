import { CareerStats, ClubSpint, SeasonTrophies, Milestone, SeasonGoalTrend, LegacyHighlight } from './types';

export const careerOverview: CareerStats = {
  goals: 838,
  appearances: 1062,
  assists: 374,
  hatTricks: 57,
};

export const clubHistory: ClubSpint[] = [
  {
    id: 'barca',
    club: 'FC Barcelona',
    text: 'BARC',
    league: 'La Liga',
    startYear: 2004,
    endYear: 2021,
    apps: 778,
    goals: 672,
    assists: 303,
    colorCode: 'bg-blue-900',
    logoText: 'FCB',
  },
  {
    id: 'psg',
    club: 'Paris Saint-Germain',
    league: 'Ligue 1',
    startYear: 2021,
    endYear: 2023,
    apps: 75,
    goals: 32,
    assists: 35,
    colorCode: 'bg-indigo-950',
    logoText: 'PSG',
  },
  {
    id: 'miami',
    club: 'Inter Miami CF',
    league: 'MLS',
    startYear: 2023,
    endYear: 'Present',
    apps: 39,
    goals: 34,
    assists: 18,
    colorCode: 'bg-pink-500',
    logoText: 'IMC',
  },
];

export const majorSeasonsTrophies: SeasonTrophies[] = [
  {
    season: '2008-09',
    club: 'FC Barcelona',
    trophies: [
      { id: 'ucl-09', name: 'Champions League', competition: 'UEFA', season: '08/09', imageIcon: 'Trophy' },
      { id: 'll-09', name: 'La Liga', competition: 'Spain', season: '08/09', imageIcon: 'Medal' },
      { id: 'bdo-09', name: 'Ballon d\'Or', competition: 'Individual', season: '2009', imageIcon: 'Star' }
    ]
  },
  {
    season: '2014-15',
    club: 'FC Barcelona',
    trophies: [
      { id: 'ucl-15', name: 'Champions League', competition: 'UEFA', season: '14/15', imageIcon: 'Trophy' },
      { id: 'll-15', name: 'La Liga', competition: 'Spain', season: '14/15', imageIcon: 'Medal' },
      { id: 'bdo-15', name: 'Ballon d\'Or', competition: 'Individual', season: '2015', imageIcon: 'Star' }
    ]
  },
  {
    season: '2021-22',
    club: 'PSG / Argentina',
    trophies: [
      { id: 'ca-21', name: 'Copa América', competition: 'CONMEBOL', season: '2021', imageIcon: 'Globe' },
      { id: 'l1-22', name: 'Ligue 1', competition: 'France', season: '21/22', imageIcon: 'Medal' },
      { id: 'bdo-21', name: 'Ballon d\'Or', competition: 'Individual', season: '2021', imageIcon: 'Star' }
    ]
  },
  {
    season: '2022-23',
    club: 'PSG / Argentina / Inter Miami',
    trophies: [
      { id: 'wc-22', name: 'FIFA World Cup', competition: 'International', season: '2022', imageIcon: 'Globe' },
      { id: 'lc-23', name: 'Leagues Cup', competition: 'CONCACAF', season: '2023', imageIcon: 'Trophy' },
      { id: 'bdo-23', name: 'Ballon d\'Or', competition: 'Individual', season: '2023', imageIcon: 'Star' }
    ]
  }
];

export const milestones: Milestone[] = [
  {
    id: 'first-goal',
    year: 2005,
    title: 'First Professional Goal',
    description: 'Scored his first senior goal for Barcelona against Albacete, assisted beautifully by Ronaldinho.',
    icon: 'Target'
  },
  {
    id: 'olympic-gold',
    year: 2008,
    title: 'Beijing Olympic Gold',
    description: 'Guided Argentina to Olympic Glory in Beijing, clinching the gold medal.',
    icon: 'Medal'
  },
  {
    id: 'sextuple',
    year: 2009,
    title: 'The Historic Sextuple',
    description: 'Netted in the Club World Cup final to secure an unprecedented 6 trophies in a single calendar year.',
    icon: 'Trophy'
  },
  {
    id: 'calendar-record',
    year: 2012,
    title: '91 Goals Calendar Record',
    description: 'Broke the all-time world record for most goals in a single calendar year, scoring a mythical 91 goals.',
    icon: 'Activity'
  },
  {
    id: 'copa-america',
    year: 2021,
    title: 'Copa América Triumph',
    description: 'Won his first senior international trophy with Argentina, defeating Brazil in the Maracanã.',
    icon: 'Globe'
  },
  {
    id: 'world-cup',
    year: 2022,
    title: 'World Cup Champion',
    description: 'Led Argentina to World Cup gold in Qatar, scoring twice in the final and winning the Golden Ball.',
    icon: 'Trophy'
  },
  {
    id: 'eighth-bdo',
    year: 2023,
    title: 'Eighth Ballon d\'Or',
    description: 'Won his record-extending 8th Ballon d\'Or trophy following legendary achievements in Qatar.',
    icon: 'Star'
  }
];

export const seasonalGoalsTrends: SeasonGoalTrend[] = [
  { season: '2004-05', goals: 1, assists: 0, apps: 9, club: 'FC Barcelona' },
  { season: '2005-06', goals: 8, assists: 3, apps: 25, club: 'FC Barcelona' },
  { season: '2006-07', goals: 17, assists: 3, apps: 36, club: 'FC Barcelona' },
  { season: '2007-08', goals: 16, assists: 13, apps: 40, club: 'FC Barcelona' },
  { season: '2008-09', goals: 38, assists: 18, apps: 51, club: 'FC Barcelona' },
  { season: '2009-10', goals: 47, assists: 11, apps: 53, club: 'FC Barcelona' },
  { season: '2010-11', goals: 53, assists: 23, apps: 55, club: 'FC Barcelona' },
  { season: '2011-12', goals: 73, assists: 29, apps: 60, club: 'FC Barcelona' },
  { season: '2012-13', goals: 60, assists: 16, apps: 50, club: 'FC Barcelona' },
  { season: '2013-14', goals: 41, assists: 14, apps: 46, club: 'FC Barcelona' },
  { season: '2014-15', goals: 58, assists: 27, apps: 57, club: 'FC Barcelona' },
  { season: '2015-16', goals: 41, assists: 23, apps: 49, club: 'FC Barcelona' },
  { season: '2016-17', goals: 54, assists: 19, apps: 52, club: 'FC Barcelona' },
  { season: '2017-18', goals: 45, assists: 18, apps: 54, club: 'FC Barcelona' },
  { season: '2018-19', goals: 51, assists: 21, apps: 50, club: 'FC Barcelona' },
  { season: '2019-20', goals: 31, assists: 26, apps: 44, club: 'FC Barcelona' },
  { season: '2020-21', goals: 38, assists: 12, apps: 47, club: 'FC Barcelona' },
  { season: '2021-22', goals: 11, assists: 14, apps: 34, club: 'Paris Saint-Germain' },
  { season: '2022-23', goals: 21, assists: 20, apps: 41, club: 'Paris Saint-Germain' },
  { season: '2023-24', goals: 25, assists: 15, apps: 29, club: 'Inter Miami CF' },
  { season: '2024-25', goals: 23, assists: 13, apps: 25, club: 'Inter Miami CF' }
];

export const legacyHighlights: LegacyHighlight[] = [
  {
    id: 'el-clasico-2017',
    title: 'El Clásico Decider',
    date: 'Apr 23, 2017',
    competition: 'La Liga',
    quoteOrStat: '500th Barcelona goal. The iconic shirt-holding celebration at the Bernabéu.',
    colorClass: 'from-blue-900/40 to-red-900/40'
  },
  {
    id: 'ucl-semi-2015',
    title: 'Bayern Demolition',
    date: 'May 6, 2015',
    competition: 'UCL Semi-final',
    quoteOrStat: '"Here he is again... here he is again... that\'s astonishing." - Boateng left on the turf.',
    colorClass: 'from-red-900/40 to-blue-900/40'
  },
  {
    id: 'world-cup-final-2022',
    title: 'World Cup Final',
    date: 'Dec 18, 2022',
    competition: 'World Cup',
    quoteOrStat: 'Two goals. Conquered the world and completed football.',
    colorClass: 'from-sky-500/40 to-[#e5c158]/40'
  },
  {
    id: 'wembley-2011',
    title: 'Wembley Masterclass',
    date: 'May 28, 2011',
    competition: 'UCL Final',
    quoteOrStat: 'Man of the Match performance in what many consider the greatest club team ever.',
    colorClass: 'from-blue-800/40 to-purple-900/40'
  },
  {
    id: 'bayer-5',
    title: '5 Goals vs Bayer',
    date: 'Mar 7, 2012',
    competition: 'UCL Round of 16',
    quoteOrStat: 'First player to ever score 5 goals in a single UEFA Champions League match.',
    colorClass: 'from-gray-800/40 to-slate-900/40'
  },
  {
    id: 'getafe-2007',
    title: 'The Maradona Goal',
    date: 'Apr 18, 2007',
    competition: 'Copa del Rey',
    quoteOrStat: 'Dribbled past five players from the halfway line. An exact replica of the Goal of the Century.',
    colorClass: 'from-yellow-900/40 to-blue-900/40'
  }
];
