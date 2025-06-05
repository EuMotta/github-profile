type LanguageUsage = Record<string, number>;

type LanguagePercentage = {
  name: string;
  percentage: string;
};

export function calculateLanguagePercentages(languages: LanguageUsage): LanguagePercentage[] {
  const total = Object.values(languages).reduce((acc, bytes) => acc + bytes, 0);

  return Object.entries(languages).map(([name, bytes]) => {
    const percent = (bytes / total) * 100;
    return {
      name,
      percentage: `${percent.toFixed(2)}%`,
    };
  });
}
