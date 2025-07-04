'use client';
import React from 'react';

import { GitContributions } from '@/@interfaces/github/contributions';

import formatDate from '@/utils/datetime';

interface ContributionProps {
  contributions: GitContributions;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionData {
  contributionCalendar: {
    weeks: ContributionWeek[];
  };
  contributionYears: number[];
}

interface MonthGroup {
  month: string;
  key: string;
  weeks: { index: number; days: ContributionDay[] }[];
}

const getMonthNameAndKey = (dateStr: string): { name: string; key: string } => {
  const date = new Date(dateStr);
  return {
    name: date.toLocaleString('en-US', { month: 'short' }),
    key: date.toISOString().slice(0, 7),
  };
};

const groupWeeksByMonth = (weeks: ContributionWeek[]): MonthGroup[] => {
  const monthGroups: MonthGroup[] = [];
  let currentMonthKey: string | null = null;
  let currentGroup: MonthGroup = { month: '', key: '', weeks: [] };

  weeks.forEach((week, index) => {
    const firstDay = week.contributionDays[0].date;
    const { name: month, key } = getMonthNameAndKey(firstDay);

    if (key !== currentMonthKey) {
      if (currentMonthKey) {
        monthGroups.push(currentGroup);
      }
      currentMonthKey = key;
      currentGroup = { month, key, weeks: [] };
    }
    currentGroup.weeks.push({ index, days: week.contributionDays });
  });

  if (currentGroup.weeks.length > 0) {
    monthGroups.push(currentGroup);
  }

  return monthGroups;
};

const getColorForContribution = (count: number, maxCount: number): string => {
  if (count === 0) return 'bg-white';

  const colors = ['bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-600'];
  if (maxCount === 0) return colors[0];

  const levelSize = maxCount / 4;
  if (count <= levelSize) return colors[0];
  if (count <= 2 * levelSize) return colors[1];
  if (count <= 3 * levelSize) return colors[2];
  return colors[3];
};

const ContributionLegend: React.FC = () => (
  <div className="mt-4 flex items-center justify-between">
    <div className="flex items-center gap-2 text-sm">
      <span>Less</span>
      <div className="flex gap-1">
        <div className="h-3 w-3 rounded-[2px] bg-gray-100" />
        <div className="h-3 w-3 rounded-[2px] bg-green-200" />
        <div className="h-3 w-3 rounded-[2px] bg-green-300" />
        <div className="h-3 w-3 rounded-[2px] bg-green-400" />
        <div className="h-3 w-3 rounded-[2px] bg-green-600" />
      </div>
      <span>More</span>
    </div>
  </div>
);

interface ContributionCellProps {
  day: ContributionDay | null;
  weekIndex: number;
  rowIndex: number;
  maxCount: number;
}

const ContributionCell: React.FC<ContributionCellProps> = ({
  day,
  weekIndex,
  rowIndex,
  maxCount,
}) => {
  if (!day) {
    return (
      <td
        key={`${weekIndex}-${rowIndex}`}
        className="h-[10px] w-[10px] rounded-[2px] border border-red-400 bg-red-100"
      />
    );
  }

  return (
    <td
      role="gridcell"
      data-date={day.date}
      data-level={day.contributionCount}
      className={`h-[10px] w-[10px] rounded-[2px] border ${getColorForContribution(
        day.contributionCount,
        maxCount,
      )} transition-transform duration-150 hover:scale-110`}
      title={`${formatDate(day.date, 'pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })}: ${day.contributionCount} contributions`}
    />
  );
};

const ContributionsTable: React.FC<ContributionProps> = ({ contributions }) => {
  const data: ContributionData = contributions.user.contributionsCollection;
  const monthGroups = groupWeeksByMonth(data.contributionCalendar.weeks);
  const monthTotals = contributions.contributionStats.monthlyContributions;
  const maxCount = Math.max(
    ...data.contributionCalendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => day.contributionCount),
    ),
  );

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col">
      <main className="flex-grow">
        <div className="mx-auto">
          <div className="mb-6">
            <table
              role="grid"
              aria-readonly="true"
              className="w-full table-fixed border-spacing-1"
              style={{ borderSpacing: '3px', overflow: 'hidden', position: 'relative' }}
            >
              <caption className="sr-only">Contribution Graph</caption>
              <thead>
                <tr style={{ height: '13px' }}>
                  <td style={{ width: '28px' }}>
                    <span className="sr-only">Day of Week</span>
                  </td>
                  {monthGroups.map((group, index) => (
                    <td
                      key={index}
                      className="ContributionCalendar-label"
                      colSpan={group.weeks.length}
                      style={{ position: 'relative' }}
                    ></td>
                  ))}
                </tr>
              </thead>

              <tbody>
                {daysOfWeek.map((day, rowIndex) => (
                  <tr key={rowIndex} className="h-[10px]">
                    <td className="border-y border-primary text-xs">{day}</td>
                    {monthGroups.map((group) =>
                      group.weeks.map((week) => (
                        <ContributionCell
                          key={`${week.index}-${rowIndex}`}
                          day={week.days[rowIndex] || null}
                          weekIndex={week.index}
                          rowIndex={rowIndex}
                          maxCount={maxCount}
                        />
                      )),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <ContributionLegend />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContributionsTable;
