import { Box } from '@mui/material';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react';
import MultipleChoice from './-components/MultipleChoice';
import SingleChoice from './-components/SingleChoice';
import { CustomBarChart } from './-components/CustomBarChart';
import { calculateStats } from './-functions/calculateStats';

export type DomainType = {
  name: string;
  id: string;
  allValues: string[];
  selectedValues: string[];
}

type FieldsErrors = {
  args: { isError: boolean, message: string }
  series: { isError: boolean, message: string }
}


export const Route = createFileRoute('/charts/')({
  component: RouteComponent,
})


function RouteComponent() {
  const { data } = useLoaderData({ from: "__root__"});
  const [errors, setErrors] = useState<FieldsErrors>({
    args: { isError: false, message: ""},
    series: { isError: false, message: ""},
  });

  const { categories, difficulties } = useMemo(() => {
    const catDiff = data.reduce((accu, q) => {
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
    setErrors({
      args: {
        isError: args.selectedValues.length === 0,
        message: args.selectedValues.length === 0 ? "Please select arguments" : ""
      },
      series: {
        isError: series.selectedValues.length === 0,
        message: series.selectedValues.length === 0 ? "Please select series" : ""
      }
    });
  }, [args, series]);

  useEffect(() => {
    if (args.id === "category") {
      setSeries((prev) => (prev.id === "difficulty") ? prev : domainTypes[1]);
    } else {
      setSeries((prev) => (prev.id === "category") ? prev : domainTypes[0]);
    }
  }, [args]);


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
  [args, series, data]);

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
          error={errors.args.isError}
          helperText={errors.args.message}
          options={args.allValues} 
          label="Arguments" 
          onChange={(val) => setArgs((prev) => {
            const _prev = {...prev};
            _prev.selectedValues = val;
            return _prev;
          })} 
        />
        <MultipleChoice
          error={errors.series.isError}
          helperText={errors.series.message}
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