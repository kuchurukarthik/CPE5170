import { algorithms } from "./data/renderableData";

export const getDisplayString = (job) => {
  const str =
    job.name +
    "( " +
    job.releaseTime +
    " , " +
    job.executionTime +
    " , " +
    job.deadline +
    ")";
  return str;
};

export const editJobTitle = (job) => {
  return `Edit Job ${job.name}`;
};

export const getScheduleTitle = (algorithm, scheduleData) => {
  if (scheduleData.allJobsMetDeadline) {
    return `Schedule for Given Jobs using ${algorithm}`;
  } else {
    return `Jobs not schedulable using ${algorithm}`;
  }
};

export function calculateJobSchedule(algorithm, jobs) {
  if (algorithm === algorithms[0].value) {
    return calculateEDFSchedule(jobs);
  } else if (algorithm === algorithms[1].value) {
    return calculateLSTSchedule(jobs);
  } else if (algorithm === algorithms[2].value) {
    return calculateLRTSchedule(jobs);
  } else if (algorithm === algorithms[3].value) {
    return calculateRMSSchedule(jobs);
  }
}

// function calculateEDFSchedule(jobs) {
//   let result = {
//     completedJobs: [],
//     missedDeadlineJobs: [],
//     allJobsMetDeadline: false,
//   };

//   jobs = jobs.map((job) => ({ ...job, remainingTime: job.executionTime }));

//   let currentTime = 0;
//   while (jobs.some((job) => job.remainingTime > 0)) {
//     let availableJobs = jobs.filter(
//       (job) => job.remainingTime > 0 && job.releaseTime <= currentTime
//     );

//     if (availableJobs.length > 0) {
//       availableJobs.sort((a, b) => a.deadline - b.deadline);
//       let currentJob = availableJobs[0];
//       currentJob.remainingTime--;

//       if (currentJob.remainingTime === 0) {
//         result.completedJobs.push({
//           ...currentJob,
//           startTime: currentTime + 1 - currentJob.executionTime,
//           endTime: currentTime + 1,
//         });
//       }
//     }

//     currentTime++;
//   }

//   result.missedDeadlineJobs = result.completedJobs.filter(
//     (job) => job.endTime > job.deadline
//   );

//   if (
//     result.completedJobs.length === jobs.length &&
//     result.missedDeadlineJobs.length === 0
//   ) {
//     result.allJobsMetDeadline = true;
//   }
//   console.log("res", result);
//   return result;
// }

export function calculateEDFSchedule(jobs) {
  // sort jobs by deadline in ascending order
  jobs.sort((a, b) => a.deadline - b.deadline);

  // initialize variables
  let currentTime = 0;
  let completedJobs = [];

  // loop through jobs
  while (jobs.length > 0) {
    let nextJob = null;
    let earliestDeadline = Infinity;

    // find the job with the earliest deadline
    for (let i = 0; i < jobs.length; i++) {
      if (
        jobs[i].dependencies.length === 0 &&
        jobs[i].releaseTime <= currentTime
      ) {
        if (jobs[i].deadline < earliestDeadline) {
          earliestDeadline = jobs[i].deadline;
          nextJob = jobs[i];
        }
      }
    }

    // if no job is available, increment time and continue
    if (nextJob === null) {
      currentTime++;
      continue;
    }

    // execute the job
    const startTime = currentTime;
    currentTime += nextJob.executionTime;
    const endTime = currentTime;
    completedJobs.push({
      ...nextJob,
      startTime,
      endTime,
    });

    // remove completed job from dependencies of other jobs
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].dependencies.includes(nextJob.name)) {
        jobs[i].dependencies.splice(
          jobs[i].dependencies.indexOf(nextJob.name),
          1
        );
      }
    }

    // remove completed job from jobs array
    jobs.splice(jobs.indexOf(nextJob), 1);
  }

  // check which jobs missed their deadlines
  const missedDeadlineJobs = completedJobs.filter(
    (job) => job.endTime > job.deadline
  );

  // check if all jobs met their deadlines
  const allJobsMetDeadline = missedDeadlineJobs.length === 0;

  // return an object containing the completed jobs, the missed deadline jobs, and the allJobsMetDeadline boolean value
  return { completedJobs, missedDeadlineJobs, allJobsMetDeadline };
}

function calculateSlackTime(jobs) {
  return jobs.map((job) => ({
    ...job,
    slackTime: job.deadline - job.executionTime - job.releaseTime,
  }));
}

function scheduleJobs(jobs) {
  let currentTime = 0;
  let completedJobs = [];
  let missedDeadlineJobs = [];

  for (const job of jobs) {
    if (currentTime < job.releaseTime) {
      currentTime = job.releaseTime;
    }

    const startTime = currentTime;
    const endTime = startTime + job.executionTime;

    if (endTime <= job.deadline) {
      completedJobs.push({
        ...job,
        startTime,
        endTime,
      });
    } else {
      missedDeadlineJobs.push({
        ...job,
        startTime,
        endTime,
      });
    }

    currentTime = endTime;
  }

  return { completedJobs, missedDeadlineJobs };
}

export function calculateLSTSchedule(jobsArray) {
  const jobsWithSlackTime = calculateSlackTime(jobsArray);
  const sortedJobs = jobsWithSlackTime.sort(
    (a, b) => a.slackTime - b.slackTime
  );
  const result = scheduleJobs(sortedJobs);

  const allJobsMetDeadline = result.missedDeadlineJobs.length === 0;
  return {
    ...result,
    allJobsMetDeadline,
  };
}

function scheduleJobsLRT(jobs) {
  let completedJobs = [];
  let missedDeadlineJobs = [];

  for (const job of jobs) {
    const latestReleaseTime = job.deadline - job.executionTime;
    const startTime = Math.max(latestReleaseTime, job.releaseTime);
    const endTime = startTime + job.executionTime;

    if (endTime <= job.deadline) {
      completedJobs.push({
        ...job,
        startTime,
        endTime,
      });
    } else {
      missedDeadlineJobs.push({
        ...job,
        startTime,
        endTime,
      });
    }
  }

  return { completedJobs, missedDeadlineJobs };
}

export function calculateLRTSchedule(jobsArray) {
  const sortedJobs = jobsArray.sort((a, b) => b.deadline - a.deadline);
  const result = scheduleJobsLRT(sortedJobs);

  const allJobsMetDeadline = result.missedDeadlineJobs.length === 0;
  return {
    ...result,
    allJobsMetDeadline,
  };
}

function assignPriorities(jobs) {
  return jobs.map((job) => ({
    ...job,
    priority: job.deadline,
  }));
}

function scheduleJobsRMS(jobs) {
  let currentTime = 0;
  let completedJobs = [];
  let missedDeadlineJobs = [];

  for (const job of jobs) {
    if (currentTime < job.releaseTime) {
      currentTime = job.releaseTime;
    }

    const startTime = currentTime;
    const endTime = startTime + job.executionTime;

    if (endTime <= job.deadline) {
      completedJobs.push({
        ...job,
        startTime,
        endTime,
      });
    } else {
      missedDeadlineJobs.push({
        ...job,
        startTime,
        endTime,
      });
    }

    currentTime = endTime;
  }

  return { completedJobs, missedDeadlineJobs };
}

export function calculateRMSSchedule(jobsArray) {
  const jobsWithPriorities = assignPriorities(jobsArray);
  const sortedJobs = jobsWithPriorities.sort((a, b) => a.priority - b.priority);
  const result = scheduleJobsRMS(sortedJobs);
  const allJobsMetDeadline = result.missedDeadlineJobs.length === 0;
  return {
    ...result,
    allJobsMetDeadline,
  };
}
