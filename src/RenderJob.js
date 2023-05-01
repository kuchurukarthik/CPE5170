import { Delete, Edit } from "@mui/icons-material";
import { Typography, Paper, IconButton, Stack } from "@mui/material";
import React from "react";
import "./Layout.css";
import { getDisplayString } from "./Utility";

function RenderJob(props) {
  const { job } = props;
  const displayString = getDisplayString(job);
  return (
    <Paper elevation={1} className="job">
      <Typography style={{ fontWeight: "bold" }}>{displayString}</Typography>
      <Stack direction="row" spacing={1}>
        <IconButton onClick={() => props.editJob(job)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => props.deleteJob(job)}>
          <Delete />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export default RenderJob;
