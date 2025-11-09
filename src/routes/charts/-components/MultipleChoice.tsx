import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


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

  return (
    <Autocomplete
      multiple
      onChange={(_, val) => onChange(val)}
      options={options}
      renderValue={() => null}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
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