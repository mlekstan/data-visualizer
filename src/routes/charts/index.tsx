import { Box } from '@mui/material';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react';
import MultipleChoice from './-components/MultipleChoice';
import SingleChoice from './-components/SingleChoice';
import { CustomBarChart } from './-components/CustomBarChart';

export type DomainType = {
  name: string;
  id: string;
  allValues: string[];
  selectedValues: string[];
}


export const Route = createFileRoute('/charts/')({
  component: RouteComponent,
})


function RouteComponent() {
  const { data } = useLoaderData({ from: "__root__"});

  const { categories, difficulties } = useMemo(() => {
    const catDiff = data.reduce((accu, q, idx) => {
      if (!accu.categories.includes(q.category)) {
        accu.categories.push(q.category);
      }

      if (!accu.difficulties.includes(q.difficulty)) {
        accu.difficulties.push(q.difficulty);
      }

      return accu;
    }, { categories: Array<string>(), difficulties: Array<string>() });

    return catDiff;
  }, [data]);

  const domainTypes = useMemo(() => {
    return (
      [
        {
          name: "Category",
          id: "category",
          allValues: categories,
          selectedValues: [],
        },
        {
          name: "Difficulty",
          id: "difficulty",
          allValues: difficulties,
          selectedValues: [],
        }
      ]
    );
  }, [categories, difficulties]);

  const [args, setArgs] = useState<DomainType>(domainTypes[0]);
  const [series, setSeries] = useState<DomainType>(domainTypes[1]);

  useEffect(() => {
    if (args.id === "category") {
      setSeries((prev) => (prev.id === "difficulty") ? prev : domainTypes[1]);
    } else {
      setSeries((prev) => (prev.id === "category") ? prev : domainTypes[0]);
    }
  });


  const stats = useMemo(() => {
    console.log("args", args.selectedValues)
    console.log("series", series.selectedValues)
    const stats = calculateStats({
      args: args.selectedValues,
      series: series.selectedValues,
      argsKey: args.id,
      seriesKey: series.id,
      data: data
    })
    
    return stats;
  }, 
  [
    args, series, data
  ]);

  console.log(stats)


  return (
    <Box sx={{display: "grid", gridTemplateRows: "100%", gridTemplateColumns: "auto 1fr", width: "100%", height: "100%"}}>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
      <SingleChoice 
        options={domainTypes} 
        label={"Domain types"}
        value={args}
        onChange={(val) => {
          setArgs((prev) => (!val) ? prev : val)
        }} 
      />
      <MultipleChoice 
        options={args.allValues} 
        label="Arguments" 
        onChange={(val) => setArgs((prev) => {
          const _prev = {...prev};
          _prev.selectedValues = val;
          return _prev;
        })} 
      />
      <MultipleChoice 
        options={series.allValues} 
        label="Series"
        onChange={(val) => setSeries((prev) => {
          const _prev = {...prev};
          _prev.selectedValues = val;
          return _prev;
        })} 
      />
      </Box>

      <CustomBarChart data={stats} argsId={args.id} series={series.selectedValues} seriesId={series.id} />
    </Box>
  );
}


function calculateStats(
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
