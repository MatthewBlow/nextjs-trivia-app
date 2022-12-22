import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const TextFieldComponent = ({ setParam, setError, error }) => {
  const handleChange = (e) => {
    setParam(e.target.value);
    setError(false);
  };

  return (
    <Box mt={3} width="100%" bgcolor="white">
      <FormControl fullWidth size="small">
        <TextField
          onChange={handleChange}
          variant="outlined"
          label="Amount of Questions"
          type="number"
          size="medium"
          error={error}
        />
        {error && <FormHelperText error>Please select input!</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default TextFieldComponent;
