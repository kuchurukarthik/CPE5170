export const title = "Scheduling Algorithms Simulator";
export const description =
  "Create new jobs, Select an algorithm and check possible schedules";
export const newJob = "Add Job";
export const graph = "Dependency Graph";
export const schedule = "View Schedule";
export const createJob = "Add New Job";
export const numericFields = ["releaseTime", "executionTime", "deadline"];
export const mockJobs = [
  {
    name: "J1",
    releaseTime: 0,
    executionTime: 2,
    deadline: 5,
    dependencies: [],
  },
  {
    name: "J2",
    releaseTime: 2,
    executionTime: 5,
    deadline: 10,
    dependencies: ["J1"],
  },
  {
    name: "J3",
    releaseTime: 1,
    executionTime: 4,
    deadline: 7,
    dependencies: [],
  },
];

export const jobFields = [
  {
    label: "Job Id",
    type: "text",
    id: "name",
  },
  {
    label: "Release Time",
    type: "number",
    id: "releaseTime",
  },
  {
    label: "Execution Time",
    type: "number",
    id: "executionTime",
  },
  {
    label: "Deadline",
    type: "number",
    id: "deadline",
  },
  /*{
    label: "Dependencies",
    type: "text",
    id: "dependencies",
  },*/
];

export const jobStructure = {
  name: "",
  releaseTime: "",
  executionTime: "",
  deadline: "",
  dependencies: "",
};

export const algorithms = [
  { name: "Earliest Deadline First", value: "EDF" },
  { name: "Least Slack Time", value: "LST" },
  { name: "Latest Release Time", value: "LRT" },
  { name: "Rate Monotonic Scheduling", value: "RMS" },
];
