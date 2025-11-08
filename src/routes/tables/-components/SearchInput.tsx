import { InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


export function SearchInput({ onChange, placeholder }: { onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined, placeholder: string }) {

  return (
    <Paper
      component="form"
      sx={{ 
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 2,
        paddingRight: 1,
        display: 'flex', 
        alignItems: 'center',
        height: 50,
        width: 350 
      }}
    >
      <InputBase 
        placeholder={placeholder}
        onChange={onChange}
        fullWidth
      />
      
      <SearchIcon />
      
    </Paper>     
  );
}