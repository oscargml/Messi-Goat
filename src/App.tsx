import { useState, useMemo } from 'react';
import { 
  Trophy as TrophyIcon, 
  Medal as MedalIcon, 
  Star as StarIcon, 
  Globe as GlobeIcon, 
  Activity as ActivityIcon, 
  Target as TargetIcon,
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
  Sparkles,
  Info,
  Layers,
  ArrowUpRight,
  Calculator,
  Flame,
  Calendar,
  Undo
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { careerOverview, clubHistory, majorSeasonsTrophies, milestones, seasonalGoalsTrends, legacyHighlights } from './data';
import { ClubSpint, Trophy } from './types';

// Custom tooltip for seasonal trend chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#090e18] border border-white/10 p-3 rounded-xl shadow-xl font-mono text-xs text-[#e0e0f0]">
        <p className="font-bold text-white mb-1 uppercase text-[10px] tracking-wider">Season {label}</p>
        <div className="space-y-0.5 mt-1">
          <p className="text-[#75aadb] flex justify-between gap-4">
            <span>Goals:</span> <span className="font-bold text-white">{payload[0].value}</span>
          </p>
          {payload[1] && (
            <p className="text-[#e5c158] flex justify-between gap-4">
              <span>Assists:</span> <span className="font-bold text-white">{payload[1].value}</span>
            </p>
          )}
        </div>
        <p className="text-[9px] text-gray-500 mt-1.5 font-sans not-italic border-t border-white/5 pt-1">
          {payload[0].payload.club}
        </p>
      </div>
    );
  }
  return null;
};

// Icon Renderer mapping helper
const renderMilestoneIcon = (iconName: string, className: string = "w-4 h-4") => {
  switch (iconName) {
    case 'Trophy': return <TrophyIcon className={className} />;
    case 'Medal': return <MedalIcon className={className} />;
    case 'Star': return <StarIcon className={className} />;
    case 'Globe': return <GlobeIcon className={className} />;
    case 'Activity': return <ActivityIcon className={className} />;
    case 'Target': return <TargetIcon className={className} />;
    default: return <Award className={className} />;
  }
};

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'stats' | 'clubs' | 'silverware' | 'timeline' | 'highlights'>('stats');
  
  // Stat view mode (Totals vs Match Averages)
  const [showAverages, setShowAverages] = useState<boolean>(false);

  // Club selector for detail panel
  const [selectedClubId, setSelectedClubId] = useState<string>('barca');

  // Season filter for silverware
  const [selectedSeason, setSelectedSeason] = useState<string>('All');

  // Milestone timeline active highlight details
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>('world-cup');

  // Stat Projection Calculator state
  const [extraMatches, setExtraMatches] = useState<number>(30);
  const [projectionRate, setProjectionRate] = useState<'career' | 'miami'>('career');

  // Ballon d'Or Tooltip state
  const [isBdoTooltipOpen, setIsBdoTooltipOpen] = useState<boolean>(false);

  // Selected Club History details
  const selectedClub = useMemo(() => {
    return clubHistory.find(c => c.id === selectedClubId) || clubHistory[0];
  }, [selectedClubId]);

  // Calculations for average stats
  const averages = useMemo(() => {
    return {
      goals: (careerOverview.goals / careerOverview.appearances).toFixed(2),
      assists: (careerOverview.assists / careerOverview.appearances).toFixed(2),
      points: ((careerOverview.goals + careerOverview.assists) / careerOverview.appearances).toFixed(2),
      hatTricks: (careerOverview.hatTricks / careerOverview.appearances).toFixed(3),
    };
  }, []);

  // Projection Calculations
  const projections = useMemo(() => {
    const careerGoalRate = careerOverview.goals / careerOverview.appearances;
    const careerAssistRate = careerOverview.assists / careerOverview.appearances;

    const miamiClub = clubHistory.find(c => c.id === 'miami');
    const miamiGoalRate = miamiClub ? miamiClub.goals / miamiClub.apps : 0.87;
    const miamiAssistRate = miamiClub ? miamiClub.assists / miamiClub.apps : 0.46;

    const chosenGoalRate = projectionRate === 'career' ? careerGoalRate : miamiGoalRate;
    const chosenAssistRate = projectionRate === 'career' ? careerAssistRate : miamiAssistRate;

    return {
      goals: Math.round(careerOverview.goals + (chosenGoalRate * extraMatches)),
      assists: Math.round(careerOverview.assists + (chosenAssistRate * extraMatches)),
      appearances: careerOverview.appearances + extraMatches
    };
  }, [extraMatches, projectionRate]);

  // List of all unique seasons for silverware dropdown
  const seasonOptions = useMemo(() => {
    return ['All', ...majorSeasonsTrophies.map(s => s.season)];
  }, []);

  // Filtered list of major seasons
  const filteredSeasons = useMemo(() => {
    if (selectedSeason === 'All') return majorSeasonsTrophies;
    return majorSeasonsTrophies.filter(s => s.season === selectedSeason);
  }, [selectedSeason]);

  // Aggregate stats metrics across clubs
  const totalAppsCalculated = useMemo(() => {
    return clubHistory.reduce((acc, curr) => acc + curr.apps, 0);
  }, []);

  return (
    <div className="relative min-h-screen text-[#e0e0f0] font-sans pb-16 z-10 overflow-hidden bg-[#02040a]">
      
      {/* High Density Ambient Glow Layer */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none z-0" 
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(117, 170, 219, 0.12) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(255, 141, 161, 0.08) 0%, transparent 55%)', 
          filter: 'blur(100px)'
        }}
      ></div>

      {/* Extreme Fine Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0"></div>

      {/* Subtle giant typography watermark */}
      <div className="fixed top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[220px] sm:text-[380px] leading-none text-[#75aadb]/[0.02] tracking-tighter select-none pointer-events-none z-0">
        LM10
      </div>

      {/* Main Framework Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-6">
        
        {/* Dynamic Top Navbar */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-5 mb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="font-display font-black text-2xl tracking-tighter text-[#e5c158] select-none">
              MESSI<span className="text-[#75aadb]">LEGACY</span>
            </span>
            <div className="h-4 w-[1px] bg-white/15 hidden sm:block"></div>
            <span className="text-[10px] font-mono text-[#75aadb]/90 tracking-[0.25em] font-semibold uppercase">
              Albiceleste & Champagne Edition
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Status indicator style token */}
            <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-full px-4 py-1 flex items-center gap-2.5 shadow-[0_4px_12px_rgba(117,170,219,0.03)]">
              <div className="w-2.5 h-2.5 bg-sky-400 rounded-full shadow-[0_0_8px_#75aadb] animate-pulse"></div>
              <span className="text-[10px] font-bold tracking-wider text-white font-mono">ACTIVE LEGEND // 2026</span>
            </div>
          </div>
        </header>

        {/* Dense Grid Interface splits into Left Dashboard and Right sidebar widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT 2-COLUMN CLUSTER: Key presentation cards, Navigation, View Switcher */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Elegant Name Block Hero Card */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/10 p-6 sm:p-8 sky-glow">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#75aadb] font-bold">
                The Greatest of All Time
              </span>
              <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase mt-2 text-white leading-[0.9]">
                Lionel<br />Andrés<br />Messi
              </h1>

              {/* Real-time cumulative indicators inside hero card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-mono">Goals</span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-[#e5c158] tracking-tight">{careerOverview.goals}</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-mono">Assists</span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">{careerOverview.assists}</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-mono">Apps</span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-[#75aadb] tracking-tight">{careerOverview.appearances}</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-mono">Hattricks</span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-pink-400 tracking-tight">{careerOverview.hatTricks}</span>
                </div>
              </div>
            </section>

            {/* Dashboard Controls Tabs */}
            <nav className="flex bg-white/[0.02] border border-white/10 rounded-xl p-1 gap-1 overflow-x-auto scrollbar-none relative">
              {[
                { id: 'stats', label: 'Overall Stats' },
                { id: 'clubs', label: 'Club History' },
                { id: 'silverware', label: 'Silverware Cabinet' },
                { id: 'timeline', label: 'Milestone Timeline' },
                { id: 'highlights', label: 'Legacy Highlights' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  id={`tab-btn-${tab.id}`}
                  className={`flex-1 min-w-[105px] px-3 py-2.5 text-center transition-all duration-300 rounded-lg text-xs font-semibold ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-[#75aadb]/10 to-[#e5c158]/5 border border-white/15 text-white shadow-[0_4px_12px_rgba(117,170,219,0.06)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.01] border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Panel Section with AnimatePresence */}
            <section className="min-h-[350px]">
              <AnimatePresence mode="wait">
                
                {/* Stats Panel */}
                {activeTab === 'stats' && (
                  <motion.div
                    key="stats-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-display font-bold text-white tracking-wider flex items-center gap-2 uppercase">
                          <ActivityIcon className="text-sky-400 w-4 h-4" />
                          Interactive Stat Ledger
                        </h2>
                        <span className="text-[10px] text-gray-500 font-mono block">Toggle modes dynamically to see match ratios.</span>
                      </div>

                      <button
                        onClick={() => setShowAverages(!showAverages)}
                        id="toggle-averages-btn"
                        className="text-[10px] font-mono font-semibold px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg flex items-center gap-2 transition"
                      >
                        <RotateIcon className="w-3 h-3" />
                        {showAverages ? 'Show Totals' : 'Show Match Averages'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Interactive Goals Block */}
                      <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                          <TargetIcon className="w-16 h-16 text-sky-400" />
                        </div>
                        <span className="text-[9px] font-mono text-gray-500 block uppercase tracking-widest">SCORING BENCHMARK</span>
                        <h3 className="text-gray-300 font-bold text-xs mt-1">Seniors Career Goals</h3>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-3xl font-display font-black text-white">
                            {showAverages ? averages.goals : careerOverview.goals}
                          </span>
                          <span className="text-[10px] text-sky-400 font-mono">
                            {showAverages ? 'goals / game' : 'goals total'}
                          </span>
                        </div>
                        <div className="mt-3 h-1 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-sky-400 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-[9px] text-gray-400 mt-2 block font-mono">Verified Ratio: 0.79 g/g over 1000+ applets</span>
                      </div>

                      {/* Interactive Assists Block */}
                      <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                          <Award className="w-16 h-16 text-[#e5c158]" />
                        </div>
                        <span className="text-[9px] font-mono text-gray-500 block uppercase tracking-widest">CREATIVE VISION</span>
                        <h3 className="text-gray-300 font-bold text-xs mt-1">Playmaking Assists</h3>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-3xl font-display font-black text-white">
                            {showAverages ? averages.assists : careerOverview.assists}
                          </span>
                          <span className="text-[10px] text-[#e5c158] font-mono">
                            {showAverages ? 'assists / game' : 'assists total'}
                          </span>
                        </div>
                        <div className="mt-3 h-1 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-[#e5c158] rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="text-[9px] text-gray-400 mt-2 block font-mono">Verified Ratio: 0.35 a/g overall</span>
                      </div>

                      {/* Interactive Appearances Block */}
                      <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                          <Clock className="w-16 h-16 text-gray-400" />
                        </div>
                        <span className="text-[9px] font-mono text-gray-500 block uppercase tracking-widest">ENDURANCE QUOTA</span>
                        <h3 className="text-gray-300 font-bold text-xs mt-1">Registered Apps</h3>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-3xl font-display font-black text-white">
                            {showAverages ? '1.00' : careerOverview.appearances}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {showAverages ? 'app / match' : 'apps total'}
                          </span>
                        </div>
                        <div className="mt-3 h-1 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-400 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                        <span className="text-[9px] text-gray-400 mt-2 block font-mono">Sustained across 20+ years</span>
                      </div>

                      {/* Interactive Hattricks Block */}
                      <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                          <StarIcon className="w-16 h-16 text-pink-400" />
                        </div>
                        <span className="text-[9px] font-mono text-gray-500 block uppercase tracking-widest">PEAK DOMINANCE</span>
                        <h3 className="text-gray-300 font-bold text-xs mt-1">3+ Goals Matches</h3>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-3xl font-display font-black text-white">
                            {showAverages ? averages.hatTricks : careerOverview.hatTricks}
                          </span>
                          <span className="text-[10px] text-pink-400 font-mono">
                            {showAverages ? 'hattricks / game' : 'hattricks total'}
                          </span>
                        </div>
                        <div className="mt-3 h-1 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-500 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-[9px] text-gray-400 mt-2 block font-mono">Unprecedented scoring cluster frequency</span>
                      </div>

                    </div>

                    {/* Stat Projection module */}
                    <div className="bg-slate-950/60 border border-white/10 p-5 rounded-xl space-y-4 relative">
                      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                        <Calculator className="text-[#e5c158] w-4 h-4" />
                        <h3 className="font-display font-bold text-white text-xs uppercase tracking-wider">LM10 Predictive Forecaster</h3>
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Synthesize projected career boundaries. Modify the scheduled appearances below to observe estimates.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] text-gray-400 font-mono block uppercase">Projection Basis</label>
                          <div className="grid grid-cols-2 gap-1 bg-black p-0.5 rounded-lg border border-white/5">
                            <button
                              onClick={() => setProjectionRate('career')}
                              className={`py-1.5 text-[10px] font-bold rounded transition ${
                                projectionRate === 'career' 
                                  ? 'bg-slate-805 text-white bg-slate-800' 
                                  : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              Career Rate
                            </button>
                            <button
                              onClick={() => setProjectionRate('miami')}
                              className={`py-1.5 text-[10px] font-bold rounded transition ${
                                projectionRate === 'miami' 
                                  ? 'bg-pink-600/20 text-pink-300' 
                                  : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              Miami Rate
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-gray-400">Extra Games Scheduled</span>
                            <span className="text-white font-mono">+{extraMatches} matchlets</span>
                          </div>
                          <input 
                            type="range" 
                            min="10" 
                            max="100" 
                            step="10"
                            value={extraMatches}
                            onChange={(e) => setExtraMatches(Number(e.target.value))}
                            className="w-full accent-sky-400 h-1 bg-black rounded"
                          />
                        </div>
                      </div>

                      {/* Display results */}
                      <div className="grid grid-cols-3 gap-2 bg-black/60 p-3 rounded-lg text-center border border-white/5">
                        <div>
                          <span className="text-[9px] text-gray-500 font-mono block uppercase">Future Apps</span>
                          <span className="text-sm font-bold text-white block mt-0.5">{projections.appearances}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-gray-500 font-mono block uppercase">Future Goals</span>
                          <span className="text-sm font-bold text-[#75aadb] block mt-0.5">{projections.goals}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-gray-500 font-mono block uppercase">Future Assists</span>
                          <span className="text-sm font-bold text-[#e5c158] block mt-0.5">{projections.assists}</span>
                        </div>
                      </div>
                    </div>

                    {/* Seasonal Goal Trend Chart Section */}
                    <div className="bg-white/[0.02] border border-white/10 p-5 rounded-2xl relative space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="text-[#e5c158] w-4 h-4" />
                          <h3 className="font-display font-medium text-white text-xs uppercase tracking-wider">Seasonal Evolution Trends</h3>
                        </div>
                        <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                          Career Velocity
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                        Interact with the dynamic trajectory mapping Messi's seasonal goals and assists velocity. This spans his golden eras across <span className="text-sky-300">Barcelona</span>, <span className="text-indigo-300">PSG</span>, and <span className="text-pink-300">Inter Miami CF</span>.
                      </p>

                      <div className="h-64 sm:h-72 w-full pt-2 rounded-xl bg-black/20 p-2 border border-white/[0.02]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={seasonalGoalsTrends}
                            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#75aadb" stopOpacity={0.35}/>
                                <stop offset="95%" stopColor="#75aadb" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorAssists" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#e5c158" stopOpacity={0.25}/>
                                <stop offset="95%" stopColor="#e5c158" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                            <XAxis 
                              dataKey="season" 
                              stroke="rgba(255,255,255,0.3)" 
                              fontSize={9}
                              tickLine={false}
                              axisLine={false}
                              dy={8}
                            />
                            <YAxis 
                              stroke="rgba(255,255,255,0.3)" 
                              fontSize={9}
                              tickLine={false}
                              axisLine={false}
                              dx={-4}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.08)', strokeWidth: 1 }} />
                            <Area 
                              type="monotone" 
                              dataKey="goals" 
                              stroke="#75aadb" 
                              strokeWidth={2}
                              fillOpacity={1} 
                              fill="url(#colorGoals)" 
                              name="Goals"
                            />
                            <Area 
                              type="monotone" 
                              dataKey="assists" 
                              stroke="#e5c158" 
                              strokeWidth={1.5}
                              fillOpacity={1} 
                              fill="url(#colorAssists)" 
                              name="Assists"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Premium Custom Chart Legend */}
                      <div className="flex justify-center gap-6 mt-2 text-[10px] font-mono">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#75aadb] ring-4 ring-[#75aadb]/20"></span>
                          <span className="text-gray-300">Goals Scored</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#e5c158] ring-4 ring-[#e5c158]/20"></span>
                          <span className="text-gray-300">Assists Provided</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Club History Panel */}
                {activeTab === 'clubs' && (
                  <motion.div
                    key="clubs-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    {/* Compact selector cards */}
                    <div className="sm:col-span-1 space-y-2">
                      {clubHistory.map((cl) => {
                        const isSelected = selectedClubId === cl.id;
                        return (
                          <button
                            key={cl.id}
                            onClick={() => setSelectedClubId(cl.id)}
                            id={`club-card-${cl.id}`}
                            className={`w-full text-left p-3.5 rounded-xl border transition duration-300 relative ${
                              isSelected 
                                ? 'bg-white/[0.04] border-[#75aadb]/40 shadow-[0_4px_12px_rgba(117,170,219,0.04)]' 
                                : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02]'
                            }`}
                          >
                            <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#75aadb] rounded-l"></div>
                            <div className="pl-1">
                              <h4 className="font-display font-extrabold text-xs text-white uppercase">{cl.club}</h4>
                              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{cl.startYear} - {cl.endYear}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Detailed Stats share panel */}
                    <div className="sm:col-span-2 bg-white/[0.03] border border-white/10 p-5 rounded-xl space-y-4">
                      <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                        <span className={`w-8 h-8 rounded-full ${selectedClub.colorCode} flex items-center justify-center text-[10px] font-mono text-white font-black`}>
                          {selectedClub.logoText}
                        </span>
                        <div>
                          <span className="text-[9px] text-[#75aadb] font-mono font-bold block uppercase">{selectedClub.league}</span>
                          <h3 className="text-sm font-display font-black text-white uppercase">{selectedClub.club}</h3>
                        </div>
                      </div>

                      {/* 3 columns */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-black/40 p-3 rounded-lg">
                          <span className="text-[9px] text-gray-400 block font-mono">Apps</span>
                          <span className="text-md font-bold text-white">{selectedClub.apps}</span>
                        </div>
                        <div className="bg-black/40 p-3 rounded-lg">
                          <span className="text-[9px] text-gray-400 block font-mono">Goals</span>
                          <span className="text-md font-bold text-[#75aadb]">{selectedClub.goals}</span>
                        </div>
                        <div className="bg-black/40 p-3 rounded-lg">
                          <span className="text-[9px] text-gray-400 block font-mono">Assists</span>
                          <span className="text-md font-bold text-[#e5c158]">{selectedClub.assists}</span>
                        </div>
                      </div>

                      {/* Contribution slider shares */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Contribution Share Quota</h4>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-gray-400">Goals contribution</span>
                            <span className="text-white font-bold">{((selectedClub.goals / careerOverview.goals)*100).toFixed(1)}%</span>
                          </div>
                          <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-400" style={{ width: `${(selectedClub.goals / careerOverview.goals)*100}%` }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-gray-400">Assists contribution</span>
                            <span className="text-white font-bold">{((selectedClub.assists / careerOverview.assists)*100).toFixed(1)}%</span>
                          </div>
                          <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-[#e5c158]" style={{ width: `${(selectedClub.assists / careerOverview.assists)*100}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                )}

                {/* Silverware Cabinet */}
                {activeTab === 'silverware' && (
                  <motion.div
                    key="silverware-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-display font-bold text-white tracking-wider flex items-center gap-2 uppercase">
                          <TrophyIcon className="text-[#e5c158] w-4 h-4" />
                          Major silverware cabinet
                        </h2>
                        <span className="text-[10px] text-gray-500 block">Review cataloged peak chapters in professional seasons.</span>
                      </div>

                      {/* Dropdown filter */}
                      <select
                        value={selectedSeason}
                        onChange={(e) => setSelectedSeason(e.target.value)}
                        id="season-selector-dropdown"
                        className="bg-[#02040a] border border-white/10 text-white text-[10px] font-mono roundedpx-2.5 py-1.5 px-3 rounded-lg outline-none focus:border-sky-450"
                      >
                        {seasonOptions.map((v) => (
                          <option key={v} value={v}>
                            {v === 'All' ? 'All peak seasons' : `Season ${v}`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      {filteredSeasons.map((cl) => (
                        <div key={cl.season} className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                          <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-3">
                            <span className="text-xs font-display font-black text-white">SEASON {cl.season}</span>
                            <span className="text-[9px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">{cl.club}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {cl.trophies.map((tr) => (
                              <div key={tr.id} className="p-3 bg-black/40 rounded-lg flex items-center gap-3 border border-white/5">
                                <span className="p-2 bg-white/5 rounded text-[#e5c158]">
                                  {renderMilestoneIcon(tr.imageIcon, "w-4 h-4")}
                                </span>
                                <div>
                                  <h4 className="text-[11px] font-bold text-white leading-tight uppercase">{tr.name}</h4>
                                  <span className="text-[9px] text-gray-500 font-mono block">{tr.competition}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                  </motion.div>
                )}

                {/* Milestone notebook panel */}
                {activeTab === 'timeline' && (
                  <motion.div
                    key="timeline-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-5 gap-4"
                  >
                    {/* Timeline track list */}
                    <div className="sm:col-span-3 space-y-2 max-h-[350px] overflow-y-auto pr-1">
                      {milestones.map((milOn) => {
                        const isExpanded = expandedMilestoneId === milOn.id;
                        return (
                          <div 
                            key={milOn.id}
                            onClick={() => setExpandedMilestoneId(milOn.id)}
                            className={`p-3 rounded-lg border cursor-pointer transition flex items-start gap-3 relative ${
                              isExpanded 
                                ? 'bg-white/[0.04] border-[#75aadb]/40 shadow-[0_4px_12px_rgba(117,170,219,0.03)]' 
                                : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02]'
                            }`}
                          >
                            <span className="font-mono text-[10px] font-bold text-[#e5c158] select-none block shrink-0 pt-0.5">
                              {milOn.year}
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-white uppercase">{milOn.title}</h4>
                              <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{milOn.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed notebook */}
                    <div className="sm:col-span-2 bg-[#090e18]/80 p-4 border border-white/10 rounded-xl relative">
                      <span className="text-[9px] tracking-wider uppercase text-gray-500 font-mono block">Milestone Archive Log</span>
                      {expandedMilestoneId ? (() => {
                        const activeMil = milestones.find(m => m.id === expandedMilestoneId);
                        if (!activeMil) return null;
                        return (
                          <div className="mt-3 space-y-3">
                            <div className="flex gap-3 items-center">
                              <span className="p-2 bg-[#75aadb]/10 border border-[#75aadb]/20 text-sky-400 rounded-lg shrink-0">
                                {renderMilestoneIcon(activeMil.icon, "w-4 h-4")}
                              </span>
                              <div>
                                <span className="text-[9px] font-mono text-sky-400 font-bold block">{activeMil.year} DOCUMENT</span>
                                <h4 className="text-xs font-bold text-white tracking-tight uppercase leading-tight">{activeMil.title}</h4>
                              </div>
                            </div>
                            <p className="text-[11px] text-gray-300 bg-black/60 p-3 rounded-lg leading-relaxed border border-white/5 italic">
                              "{activeMil.description}"
                            </p>
                          </div>
                        );
                      })() : (
                        <p className="text-[10px] text-gray-500 font-mono text-center py-16">
                          Click any timeline ledger card on the left to review archived documents.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Legacy Highlights Panel */}
                {activeTab === 'highlights' && (
                  <motion.div
                    key="highlights-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="text-sm font-display font-bold text-white tracking-wider flex items-center gap-2 uppercase">
                        <Sparkles className="text-[#e5c158] w-4 h-4" />
                        Iconic Matches & Moments
                      </h2>
                      <span className="text-[10px] text-gray-500 font-mono block mt-1">Hover over these legacy thumbnails to reveal the story.</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {legacyHighlights.map((highlight) => (
                        <div 
                          key={highlight.id} 
                          className="group relative h-40 rounded-xl overflow-hidden cursor-default transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] border border-white/10"
                        >
                          {/* Placeholder thumbnail gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${highlight.colorClass} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}></div>
                          
                          {/* Subtle pattern overlay */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-30 pointer-events-none"></div>

                          {/* Default content visible before hover */}
                          <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 transform group-hover:translate-y-4 group-hover:opacity-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                            <span className="text-[9px] font-mono font-bold text-gray-300 uppercase block mb-1">{highlight.date}</span>
                            <h4 className="text-sm font-display font-black text-white leading-tight uppercase">{highlight.title}</h4>
                            <span className="text-[10px] text-gray-400 block font-mono">{highlight.competition}</span>
                          </div>

                          {/* Hover state reveal content */}
                          <div className="absolute inset-0 bg-black/80 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center translate-y-4 group-hover:translate-y-0 backdrop-blur-sm">
                            <h4 className="text-xs font-display font-bold text-[#e5c158] uppercase mb-1">{highlight.title}</h4>
                            <div className="h-px w-6 bg-white/20 mb-2"></div>
                            <p className="text-[11px] text-gray-200 leading-snug italic font-medium">"{highlight.quoteOrStat}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </section>

          </div>

          {/* RIGHT PERSISTENT SIDEBAR: Highly-dense specialized widgets as defined in specification */}
          <div className="space-y-6">
            
            {/* Elegant Solid Gradient Black/Gold BDO Counter Widget */}
            <div 
              className="bg-gradient-to-br from-[#121620] to-[#04060c] border border-[#e5c158]/50 rounded-2xl p-6 text-center shadow-[0_8px_30px_rgba(229,193,88,0.06)] relative group overflow-visible cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setIsBdoTooltipOpen(!isBdoTooltipOpen)}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e5c158]/5 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
              
              <span className="bdo-val font-display font-black text-6xl tracking-tighter text-[#e5c158] block mb-1 transition-transform group-hover:scale-105">
                08
              </span>
              <span className="bdo-label text-[10px] font-mono text-gray-300 font-extrabold uppercase tracking-[0.25em] block">
                Ballon d'Or Achievements
              </span>
              <p className="text-[10px] text-gray-400 mt-2 max-w-xs mx-auto leading-normal">
                Winning the individual standard prize spanning three separate decades (2009 — 2023). <span className="text-[#e5c158] font-semibold">Click to reveal years.</span>
              </p>
              
              <div className="flex justify-center gap-1.5 mt-4 transition-transform group-hover:scale-105">
                {Array.from({ length: 8 }).map((_, i) => (
                  <StarIcon key={i} className="w-3.5 h-3.5 text-[#e5c158] fill-[#e5c158] animate-pulse" />
                ))}
              </div>

              {/* Tooltip / Dropdown reveals on click */}
              <AnimatePresence>
                {isBdoTooltipOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-[105%] left-0 right-0 bg-[#090e18]/95 backdrop-blur-md border border-[#e5c158]/30 rounded-xl p-4 shadow-2xl z-50 text-left cursor-default"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the tooltip
                  >
                    <h4 className="text-[10px] font-mono font-bold text-[#e5c158] uppercase tracking-widest mb-3 border-b border-[#e5c158]/10 pb-2">Award Winning Years</h4>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[ 2009, 2010, 2011, 2012, 2015, 2019, 2021, 2023 ].map(year => (
                        <div key={year} className="bg-[#e5c158]/10 border border-[#e5c158]/20 rounded py-1.5 text-xs font-bold text-[#e5c158] font-mono shadow-inner">
                          {year}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Club Progress overview sidebar */}
            <div className="bg-white/[0.02] border border-white/10 p-5 rounded-2xl relative space-y-3">
              <h3 className="text-[10px] font-mono font-bold uppercase text-gray-400 tracking-widest block">Club Evolution Trace</h3>

              <div className="space-y-2">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex justify-between items-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_8px_24px_rgba(117,170,219,0.08)] hover:backdrop-blur-md cursor-default">
                  <div>
                    <h4 className="text-xs font-bold text-white">FC BARCELONA</h4>
                    <span className="text-[9px] text-gray-500 font-mono">2004 — 2021 // La Liga</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#75aadb] block">672</span>
                    <span className="text-[8px] text-gray-500 font-mono uppercase">Goals</span>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex justify-between items-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_8px_24px_rgba(96,165,250,0.08)] hover:backdrop-blur-md cursor-default">
                  <div>
                    <h4 className="text-xs font-bold text-white">PARIS SAINT-GERMAIN</h4>
                    <span className="text-[9px] text-gray-500 font-mono">2021 — 2023 // Ligue 1</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-blue-400 block font-bold">32</span>
                    <span className="text-[8px] text-gray-500 font-mono uppercase">Goals</span>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex justify-between items-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_8px_24px_rgba(244,114,182,0.08)] hover:backdrop-blur-md cursor-default">
                  <div>
                    <h4 className="text-xs font-bold text-white">INTER MIAMI CF</h4>
                    <span className="text-[9px] text-gray-500 font-mono font-bold text-pink-300">2023 — Present // MLS</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-pink-400 block font-bold">34</span>
                    <span className="text-[8px] text-gray-500 font-mono uppercase">Goals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* World Cup Champion premium quote block */}
            <div className="p-5 bg-[#75aadb]/[0.04] border border-[#75aadb]/20 rounded-2xl relative overflow-hidden">
              <div className="absolute top-2 right-3 opacity-10 font-serif text-5xl text-[#75aadb] select-none pointer-events-none">“</div>
              <p className="text-[11px] leading-relaxed text-gray-300 font-medium italic mt-1 relative z-10">
                "I was lucky to have won everything, and the World Cup was what I was missing. It's the most beautiful thing there is."
              </p>
              <div className="flex items-center gap-2 mt-3.5 pt-3 border-t border-[#75aadb]/10">
                <span className="w-4 h-2 bg-sky-400 rounded-full"></span>
                <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">L. Messi, Champion of Qatar</span>
              </div>
            </div>

          </div>

        </div>

        {/* Three-Part high density footer exactly matching aesthetic specification */}
        <footer className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest gap-4">
          <div>LM10 Legacy // Data Ver. 2026.1</div>
          <div className="text-gray-400">Authentic Athlete Interactive Archive</div>
          <div>Proprietary Information // Albiceleste System</div>
        </footer>

      </div>
    </div>
  );
}

// Inline fallback icon rotating helper
function RotateIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <polyline points="21 3 21 8 16 8" />
    </svg>
  );
}
