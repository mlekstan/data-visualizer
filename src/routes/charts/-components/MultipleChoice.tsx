import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect, useState } from 'react';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type MultipleChoiceProps = {
  options: string[];
  label: string;
  onChange: (val: string[]) => void;
  error: boolean;
  helperText: string;
}

export default function MultipleChoice({ options, label, onChange, error, helperText }: MultipleChoiceProps) {
  const [selectedOptions, setSelectedOptions] = useState(Array<string>())
  const allOptions = ["All", ...options];

  useEffect(() => {
    setSelectedOptions([]);
  }, [options]);

  const handleChange = (val: string[]) => {
    let newSelected: string[] = selectedOptions;
    let newVal: string[] = [];

    if (!selectedOptions.includes("All")) {
      if (val.includes("All")) {
        newSelected = allOptions;
        newVal = options;
      } else {
        const allOtherSelected = val.length === options.length;
        newSelected = allOtherSelected ? allOptions : val;
        newVal = allOtherSelected ? options : val;
      }
    } else {
      if (val.includes("All")) {
        newVal = val.filter((v) => v !== "All");
      } else {
        newVal = [];
      }
      newSelected = newVal;
    }

    setSelectedOptions(newSelected);
    onChange(newVal);
  }

  return (
    <Autocomplete
      multiple
      value={selectedOptions}
      onChange={(_, val) => handleChange(val)}
      options={allOptions}
      renderValue={() => null}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selectedOptions.includes(option)}
            />
            {option}
          </li>
        );
      }}
      style={{ width: 200 }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={label} 
          placeholder="Search..." 
          error={error}
          helperText={(helperText) ? helperText : " "}
        />
      )}
    />
  );
}