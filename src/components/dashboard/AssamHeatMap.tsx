import React, { useState, useMemo } from 'react';
import { SurveyResponse, AssamRegion } from '../../types';
import { ASSAM_DISTRICTS, REGIONS_LIST } from '../../data/assamData';
import { MapPin, Info } from 'lucide-react';

interface AssamHeatMapProps {
  responses: SurveyResponse[];
  selectedRegionFilter?: string;
  onSelectDistrict?: (districtName: string) => void;
}

export const AssamHeatMap: React.FC<AssamHeatMapProps> = ({
  responses,
  selectedRegionFilter = 'All',
  onSelectDistrict
}) => {
  const [activeRegion, setActiveRegion] = useState<string>(selectedRegionFilter);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  // Compute counts per district
  const districtCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    responses.forEach((r) => {
      if (r.district) {
        counts[r.district] = (counts[r.district] || 0) + 1;
      }
    });
    return counts;
  }, [responses]);

  // Compute counts per region
  const regionCounts = useMemo(() => {
    const counts: Record<AssamRegion, number> = {
      'Upper Assam': 0,
      'Central Assam': 0,
      'Lower Assam': 0,
      'Barak Valley': 0,
      'Hill Districts': 0
    };
    responses.forEach((r) => {
      if (r.region && counts[r.region] !== undefined) {
        counts[r.region] += 1;
      }
    });
    return counts;
  }, [responses]);

  const maxDistrictCount = Math.max(1, ...Object.values(districtCounts));

  // Visual layout placement coordinates for Assam districts on a simplified geo-schematic map
  // Assam stretches East-West along the Brahmaputra, with Barak Valley in the South
  const districtLayout: {
    name: string;
    region: AssamRegion;
    x: number;
    y: number;
    width?: number;
    height?: number;
  }[] = [
    // Lower Assam (West)
    { name: 'Dhubri', region: 'Lower Assam', x: 25, y: 155 },
    { name: 'South Salmara-Mankachar', region: 'Lower Assam', x: 20, y: 190 },
    { name: 'Kokrajhar (BTR)', region: 'Lower Assam', x: 70, y: 120 },
    { name: 'Chirang (BTR)', region: 'Lower Assam', x: 110, y: 125 },
    { name: 'Bongaigaon', region: 'Lower Assam', x: 75, y: 160 },
    { name: 'Goalpara', region: 'Lower Assam', x: 75, y: 195 },
    { name: 'Barpeta', region: 'Lower Assam', x: 125, y: 165 },
    { name: 'Bajali', region: 'Lower Assam', x: 145, y: 140 },
    { name: 'Baksa (BTR)', region: 'Lower Assam', x: 155, y: 115 },
    { name: 'Nalbari', region: 'Lower Assam', x: 170, y: 160 },
    { name: 'Tamulpur', region: 'Lower Assam', x: 195, y: 120 },
    { name: 'Udalguri (BTR)', region: 'Lower Assam', x: 235, y: 115 },
    { name: 'Darrang (Mangaldai)', region: 'Lower Assam', x: 235, y: 150 },

    // Central Assam
    { name: 'Kamrup Rural', region: 'Central Assam', x: 190, y: 190 },
    { name: 'Kamrup Metropolitan (Guwahati)', region: 'Central Assam', x: 220, y: 220 },
    { name: 'Morigaon', region: 'Central Assam', x: 275, y: 195 },
    { name: 'Nagaon', region: 'Central Assam', x: 320, y: 195 },
    { name: 'Hojai', region: 'Central Assam', x: 335, y: 235 },
    { name: 'Sonitpur (Tezpur)', region: 'Central Assam', x: 295, y: 140 },
    { name: 'Biswanath', region: 'Central Assam', x: 345, y: 120 },

    // Upper Assam (East)
    { name: 'Golaghat', region: 'Upper Assam', x: 385, y: 180 },
    { name: 'Jorhat', region: 'Upper Assam', x: 425, y: 155 },
    { name: 'Majuli', region: 'Upper Assam', x: 415, y: 125 },
    { name: 'Sivasagar', region: 'Upper Assam', x: 470, y: 140 },
    { name: 'Charaideo', region: 'Upper Assam', x: 505, y: 160 },
    { name: 'Dibrugarh', region: 'Upper Assam', x: 510, y: 115 },
    { name: 'Tinsukia', region: 'Upper Assam', x: 560, y: 95 },
    { name: 'Lakhimpur', region: 'Upper Assam', x: 405, y: 95 },
    { name: 'Dhemaji', region: 'Upper Assam', x: 475, y: 75 },

    // Hill Districts
    { name: 'Karbi Anglong', region: 'Hill Districts', x: 380, y: 230 },
    { name: 'West Karbi Anglong', region: 'Hill Districts', x: 275, y: 245 },
    { name: 'Dima Hasao (Haflong)', region: 'Hill Districts', x: 340, y: 290 },

    // Barak Valley (South)
    { name: 'Cachar (Silchar)', region: 'Barak Valley', x: 345, y: 345 },
    { name: 'Hailakandi', region: 'Barak Valley', x: 320, y: 360 },
    { name: 'Karimganj (Sribhumi)', region: 'Barak Valley', x: 290, y: 350 }
  ];

  const getHeatColor = (count: number) => {
    if (count === 0) return '#F3ECE1'; // Neutral oat
    const ratio = count / maxDistrictCount;
    if (ratio > 0.6) return '#166534'; // Deep tea green
    if (ratio > 0.3) return '#22c55e'; // Green
    if (ratio > 0.15) return '#86efac'; // Light green
    return '#E0A526'; // Muga gold highlight
  };

  return (
    <div className="w-full bg-white dark:bg-stone-900 rounded-2xl p-4 sm:p-5 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col gap-4">
      {/* Header & Region Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#166534] dark:text-emerald-400" />
            <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
              Assam District Heat Map
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Geographic distribution of college student responses across Assam
          </p>
        </div>

        {/* Region Filter Chips */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveRegion('All')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              activeRegion === 'All'
                ? 'bg-[#166534] text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            All Regions
          </button>
          {REGIONS_LIST.map((r: AssamRegion) => (
            <button
              key={r}
              type="button"
              onClick={() => setActiveRegion(r)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                activeRegion === r
                  ? 'bg-[#166534] text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {r} ({regionCounts[r] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full bg-[#FFFDF9] dark:bg-stone-950/60 rounded-xl border border-amber-100 dark:border-stone-800 p-3 overflow-hidden">
        {/* Brahmaputra River Stylized Blue Wave running through Assam */}
        <svg
          className="w-full h-auto max-h-[380px]"
          viewBox="0 0 620 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Stylized River Brahmaputra flowing from East to West */}
          <path
            d="M 590 85 Q 520 100 460 115 T 390 140 T 310 160 T 210 180 T 110 170 T 30 180"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="6"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
          <text x="360" y="132" fill="#0284c7" fontSize="9" fontWeight="600" opacity="0.6">
            ~ Brahmaputra ~
          </text>

          {/* Barak River in the South */}
          <path
            d="M 390 325 Q 340 340 270 345"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
          <text x="300" y="338" fill="#0284c7" fontSize="8" fontWeight="600" opacity="0.6">
            ~ Barak River ~
          </text>

          {/* Render Districts as interactive visual heat nodes */}
          {districtLayout.map((dist) => {
            const count = districtCounts[dist.name] || 0;
            const isMatchRegion = activeRegion === 'All' || activeRegion === dist.region;
            const isHovered = hoveredDistrict === dist.name;
            const fillColor = getHeatColor(count);

            return (
              <g
                key={dist.name}
                className="cursor-pointer transition-all duration-200"
                opacity={isMatchRegion ? 1 : 0.25}
                onMouseEnter={() => setHoveredDistrict(dist.name)}
                onMouseLeave={() => setHoveredDistrict(null)}
                onClick={() => onSelectDistrict && onSelectDistrict(dist.name)}
              >
                {/* District Bubble / Region tile */}
                <rect
                  x={dist.x - 22}
                  y={dist.y - 12}
                  width="44"
                  height="24"
                  rx="6"
                  fill={fillColor}
                  stroke={isHovered ? '#DC2626' : count > 0 ? '#166534' : '#E2E8F0'}
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-all"
                />

                {/* Response Count Pill Badge if > 0 */}
                {count > 0 && (
                  <circle
                    cx={dist.x + 16}
                    cy={dist.y - 8}
                    r="8"
                    fill="#DC2626"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                  />
                )}
                {count > 0 && (
                  <text
                    x={dist.x + 16}
                    y={dist.y - 5}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {count}
                  </text>
                )}

                {/* District Abbreviation Label */}
                <text
                  x={dist.x}
                  y={dist.y + 3}
                  textAnchor="middle"
                  fill={count > 0 ? (count / maxDistrictCount > 0.3 ? '#FFFFFF' : '#0F172A') : '#64748B'}
                  fontSize="8.5"
                  fontWeight="600"
                >
                  {dist.name.split(' ')[0].slice(0, 5)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredDistrict && (
          <div className="absolute bottom-2 left-2 bg-stone-900/90 text-white px-3 py-1.5 rounded-lg text-xs shadow-lg backdrop-blur-xs flex items-center gap-2 pointer-events-none">
            <span className="font-bold">{hoveredDistrict}</span>
            <span className="text-emerald-400 font-semibold">
              {districtCounts[hoveredDistrict] || 0} responses
            </span>
          </div>
        )}
      </div>

      {/* Regional Split Summary Bars */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
        {REGIONS_LIST.map((reg: AssamRegion) => {
          const count = regionCounts[reg] || 0;
          const pct = responses.length > 0 ? Math.round((count / responses.length) * 100) : 0;
          return (
            <div
              key={reg}
              onClick={() => setActiveRegion(reg)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                activeRegion === reg
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-[#166534]'
                  : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-800 hover:border-emerald-300'
              }`}
            >
              <div className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 truncate">
                {reg}
              </div>
              <div className="text-base font-extrabold text-stone-900 dark:text-stone-100 flex items-baseline gap-1 mt-0.5">
                <span>{count}</span>
                <span className="text-[10px] font-normal text-stone-500">({pct}%)</span>
              </div>
              <div className="w-full h-1 bg-stone-200 dark:bg-stone-700 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-[#166534] rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
