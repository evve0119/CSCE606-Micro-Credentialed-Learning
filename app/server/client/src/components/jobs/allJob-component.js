import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobService from "../../services/job.service";

const RenderAllJobComponent = (props) => {
  let [jobs, setJobs] = useState([]);

  useEffect(() => {
    JobService.renderAllJob()
      .then(({ data }) => {
        setJobs([...jobs, ...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      <h1>Jobs</h1>
      {jobs.map((job) => (
        <li key={job._id}>
          <Link className="text-primary h3" to={`jobs/${job._id}`}>{job.name}</Link>
        </li>
      ))}
    </div>
  );
};

export default RenderAllJobComponent;
