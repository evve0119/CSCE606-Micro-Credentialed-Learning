import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobService from "../../services/job.service";
import "../style.css"
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
    <div>
      {/* If not login*/}
      {!props.currentRole && (
        <h1>Please Login</h1>
      )}
      {/* If login*/}
      {props.currentRole && (
        <div className="card-bg pb-3">
        <h3>Jobs</h3>

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
            <Link className="text-primary h4" to={`jobs/${job._id}`}>{job.holder.company} - {job.name}</Link>
          </li>
        ))}
        </div>
      )}
    </div>
  );
};

export default RenderAllJobComponent;
