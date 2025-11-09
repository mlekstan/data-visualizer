
export function calculateStats(
  { args, series, argsKey, seriesKey, data }:
  { args: string[], series: string[], argsKey: string, seriesKey: string, data: Record<string, any>[] }
) {
  const stats = data.reduce((prev, item) => {
    const argValue = item[argsKey];
    const seriesValue = item[seriesKey];

    if (!args.includes(argValue)) return prev;
    if (!series.includes(seriesValue)) return prev;

    if (!prev[argValue]) {
      prev[argValue] = { [argsKey]: argValue };
    }

    prev[argValue][seriesValue] = (prev[argValue][seriesValue] ?? 0) + 1;
    prev[argValue]["all"] = (prev[argValue]["all"] ?? 0) + 1; 

    return prev;
  }, {} as Record<string, Record<string, any>>);

  return Object.values(stats);
}