import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import type { DomainType } from '..';

type SingleChoiceProps = {
  options: DomainType[];
  label: string;
  onChange: (val: DomainType | null) => void;
  value: DomainType;
}

export default function SingleChoice({ options, label, onChange, value }: SingleChoiceProps) {

  return (
    <Autocomplete
      options={options}
      value={value}
      disableCloseOnSelect
      onChange={(_, val) => onChange(val)}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option.name}
          </li>
        );
      }}
      style={{ width: 200 }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder="Search..." />
      )}
    />
  );
}