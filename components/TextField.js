import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const TextFieldComponent = ({ setParam }) => {
  const handleChange = (e) => {
    setParam(e.target.value)
  };

  return (
    <Box mt={3} width="100%" bgcolor="white">
      <FormControl fullWidth size="small">
        <TextField
          onChange={handleChange}
          variant="outlined"
          label="Amount of Questions"
          type="number"
          size="small"
        />
      </FormControl>
    </Box>
  );
};

export default TextFieldComponent;
