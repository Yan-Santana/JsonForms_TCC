import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";

const PlaygroundHeader = ({ examples, selected, onSelect }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={2}
    >
      <Typography variant="h5" fontWeight="bold">
        JSON Form Playground
      </Typography>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <Select value={selected} onChange={(e) => onSelect(e.target.value)}>
          {examples.map((ex) => (
            <MenuItem key={ex.name} value={ex.name}>
              {ex.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PlaygroundHeader;
