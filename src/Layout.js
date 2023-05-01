import { Button, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import CreateOrEditJob from "./components/CreateOrEditJob";
import ViewJobsSchedule from "./components/ViewJobsSchedule";
import {
  algorithms,
  createJob,
  description,
  graph,
  newJob,
  schedule,
  title,
} from "./data/renderableData";
import "./Layout.css";
import RenderJob from "./RenderJob";
import {
  calculateEDFSchedule,
  calculateJobSchedule,
  editJobTitle,
  getScheduleTitle,
} from "./Utility";

function Layout() {
  const [jobs, setJobs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(createJob);
  const [currentJob, setCurrentJob] = useState();
  const [openSchedule, setOpenSchedule] = useState(false);
  const [scheduleData, setScheduleData] = useState(null); // add state to store schedule data
  const [currentAlgo, setCurrentAlgo] = useState(algorithms[0].value);
  const saveJob = (newJob) => {
    setJobs((prevJobs) => {
      const jobExists = prevJobs.some((job) => job.name === newJob.name);
      if (jobExists) {
        return prevJobs.map((job) => (job.name === newJob.name ? newJob : job));
      } else {
        return [...prevJobs, newJob];
      }
    });
    setOpenDialog(false);
    setCurrentJob(undefined);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentJob(undefined);
  };

  const editJob = (job) => {
    console.log("editing job", job);
    setDialogTitle(editJobTitle(job));
    setCurrentJob(job);
    setOpenDialog(true);
  };

  const deleteJob = (job) => {
    setJobs((current) => current.filter((eJob) => eJob.name !== job.name));
  };

  const viewSchedule = () => {
    if (jobs.length > 0) {
      const schedule = calculateJobSchedule(currentAlgo, jobs); // calculate the schedule once
      setScheduleData(schedule); // set the schedule data
      setOpenSchedule(true);
    } else {
      //todo: add an error snackbar.
      //setOpenSchedule(true);
    }
  };
  console.log("layout", JSON.stringify(jobs));
  return (
    <div className="layout">
      <Typography className="title">{title}</Typography>
      <Typography className="description">{description}</Typography>
      <div className="container">
        <div className="jobs">
          {jobs.map((job, key) => (
            <RenderJob
              job={job}
              key={key}
              editJob={editJob}
              deleteJob={deleteJob}
            />
          ))}
        </div>
        <div className="options">
          <Button
            variant="contained"
            className="buttons"
            onClick={() => setOpenDialog(true)}
          >
            {newJob}
          </Button>
          <Select
            value={currentAlgo}
            onChange={(e) => setCurrentAlgo(e.target.value)}
          >
            {algorithms.map((algorithm, i) => (
              <MenuItem key={i} value={algorithm.value}>
                {algorithm.name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            className="buttons"
            onClick={viewSchedule}
          >
            {schedule}
          </Button>
          <Button
            variant="contained"
            className="buttons"
            style={{ backgroundColor: "red" }}
            onClick={() => setJobs([])}
          >
            {"Delete All Jobs"}
          </Button>
        </div>
      </div>
      {openDialog && (
        <CreateOrEditJob
          open={openDialog}
          title={dialogTitle}
          handleClose={handleDialogClose}
          saveJob={saveJob}
          job={currentJob}
        />
      )}
      {openSchedule && (
        <ViewJobsSchedule
          open={openSchedule}
          jobDetails={scheduleData} // pass the completed jobs directly
          handleClose={() => setOpenSchedule(false)}
          title={getScheduleTitle(currentAlgo, scheduleData)}
        />
      )}
    </div>
  );
}

export default Layout;
