import React from "react";
import Select from "@mui/material/Select";
import { Box, IconButton, MenuItem, FormControl } from "./components/index";
import RemoveIcon from "@mui/icons-material/Remove";

function AddSegmentSelect({
  list,
  currentField,
  alreadySelectedField,
  handleChangeSelect,
  removeField,
}) {
  return (
    <>
      <div className="mb-3" key={currentField.id}>
        <Box sx={{ minWidth: "100%", display: "flex", marginBottom: "0.5rem" }}>
          <FormControl fullWidth className="mx-2">
            <Select
              value={currentField.value}
              onChange={(event) => handleChangeSelect(currentField.id, event)}
              displayEmpty
            >
              <MenuItem value="">Add schema to segment</MenuItem>
              {list.map((item) => {
                return (
                  <MenuItem
                    value={item.value}
                    disabled={alreadySelectedField?.some(
                      (v) => v.value === item.value
                    )}
                  >
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <IconButton
            className="mx-1"
            removeicon="true"
            onClick={() => removeField(currentField.id)}
          >
            <RemoveIcon className="segment-remove" />
          </IconButton>
        </Box>
      </div>
    </>
  );
}

export default AddSegmentSelect;
