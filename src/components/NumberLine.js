import React from 'react';

const NumberLine = ({ jobs }) => {
  console.log('numberLine', jobs)
  const sortedJobs = jobs.sort((a, b) => a.endTime - b.endTime);

  const createJobDiv = (job) => {
    return (
      <div
        style={{
          width: `${job.executionTime * 30}px`,
          height: '20px',
          backgroundColor: job.endTime>job.deadline?'red':'green',
          marginRight: '1px',
          color:'white',
          textAlign:"center"
        }}
      >{job.name}</div>
    );
  };

  const firstDiv = sortedJobs.map(job => createJobDiv(job));

  let startTime = sortedJobs[0].startTime;
  let endTime = sortedJobs[sortedJobs.length - 1].endTime;
  const scale = 1;
  if(!Number.isInteger(endTime)){
    endTime = 10;
  }
  const numbers = [];
  for (let i = 1; i <= endTime; i += scale) {
    numbers.push(
      <span style={{ width: 30, }}>{i}</span>
    );
  }

  const secondDiv = (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>{numbers}</div>
  );

  return (
    <div>
      <div style={{ display: 'flex' }}>{firstDiv}</div>
      <div>{secondDiv}</div>
    </div>
  );
};

export default NumberLine;
