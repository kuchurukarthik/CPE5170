import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import NumberLine from "./NumberLine";

function ViewJobsSchedule(props) {
  console.log('VJS',props)
  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleClose()}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent style={{ display: "flex", flexDirection: "column" }}>
        {props.jobDetails.allJobsMetDeadline && <NumberLine jobs={props.jobDetails.completedJobs} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewJobsSchedule;