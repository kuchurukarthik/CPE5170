import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { jobFields, jobStructure, numericFields } from "../data/renderableData";

function CreateOrEditJob(props) {
  const [job, setJob] = React.useState(props.job ? props.job : jobStructure);
  const handleClose = () => {
    props.handleClose();
  };
  const handleSave = () => {
    console.log(job);
    props.saveJob(job);
  };

  const updateJob = (id, value) => {
    console.log(id, value);
    setJob({ ...job, [id]: numericFields.indexOf(id) === -1 ? value: Number(value) });
  };
  console.log(job);
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent style={{ display: "flex", flexDirection: "column"}}>
        {jobFields.map((field, key) => (
          <TextField
            id={field.id}
            key={key}
            label={field.label}
            type={field.type}
            variant="outlined"
            value={job[field.id]}
            onChange={(e) => updateJob(field.id, e.target.value)}
            style={{margin: 8}}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateOrEditJob;
