import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecruiterService from "../../services/recruiter.service";

const RenderApplicationComponent = (props) => {
  let [currentJob, setCurredntJob] = useState(null);
  const jobId = useParams()._id;
  useEffect(() => {
    RecruiterService.renderApplication(jobId)
      .then(({ data }) => {
        setCurredntJob(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {currentJob &&(
        <>
        <h1>{currentJob.name}</h1>
        {currentJob.resumes.map((resume) => (
          <li key={resume._id}>
            <Link className="text-primary h3" to={`applications/${resume._id}`}>{resume._id}</Link>
          </li>
        ))}
        </>
      )}
    </div>
  );
};

export default RenderApplicationComponent;
