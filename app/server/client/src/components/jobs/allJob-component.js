import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobService from "../../services/job.service";

const RenderAllJobComponent = (props) => {
  let [jobs, setJobs] = useState([]);
  let [searchedJobs, setSearchedJobs] = useState("");

  useEffect(() => {
    JobService.renderAllJob()
      .then(({ data }) => {
        setJobs([...jobs, ...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeSearchedJobs = (e) => {
    setSearchedJobs(e.target.value);
  };

  const searchJobs = () => {
    JobService.searchJobByTitle(searchedJobs).
      then(({ data }) => {
        setJobs(data)
      }).catch((err) => {
        console.log(err)
      });
  }

  return (
    <div style={{ padding: "3rem" }}>
      {/* If not login*/}
      {!props.currentRole && (
        <h1>Please Login</h1>
      )}
      {/* If login*/}
      {props.currentRole && (
        <>
        <h1>Jobs</h1>

        <label htmlFor="searchedJob">Title</label>
        <input
          name="searchedJob"
          type="text"
          className="form-control"
          id="searchedJob"
          onChange={handleChangeSearchedJobs}
        />
        <br />  
        <button className="btn btn-primary mb-3" onClick={searchJobs}>Search</button>
        <br />

        {jobs.map((job) => (
          <li key={job._id}>
            <Link className="text-primary h3" to={`jobs/${job._id}`}>{job.holder.company} - {job.name}</Link>
          </li>
        ))}
        </>
      )}
    </div>
  );
};

export default RenderAllJobComponent;
