import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PasswordService from "../../services/password.service";
const API_URL = "http://localhost:8080/api/user";

// const API_URL = "/api/user";

const ResetPassword = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
  const history = useHistory();
  let [newPassword, setNewPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [message, setMessage] = useState("");


	useEffect(() => {
		const resetPasswordUrl = async () => {
			try {
				const url = API_URL + `/${param.id}/reset/${param.token}`;
				await axios.post(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		resetPasswordUrl();
	}, [param]);

  const handleChangePassword = (e) => {
      setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };


  const handleUpdate = () => {
      // const url = API_URL + `/${param.id}/reset/${param.token}`;
      PasswordService.resetPassword(newPassword, confirmPassword, param.id, param.token)
        .then(() => {
          window.alert(
            "Successfully change the password, please use your new password to login."
          );
          // redirect to the other page
          history.push({
            pathname: "/"
          })
        })
        .catch((error) => {
          setMessage(error.response.data);
        });
    };


	return (
		<div>
			{validUrl ? (
                <div style={{ padding: "3rem" }} className="col-md-12">
                    <div>
                        {message && (
                          <div className="alert alert-danger" role="alert">
                            {message}
                          </div>
                        )}
                        <div className="form-group">
                          <h4>Please enter new password:</h4>
                          <label htmlFor="newPassword">New Password</label>
                          <input onChange={handleChangePassword} type="password" className="form-control" name="newPassword" />
                        </div>
                        <br />
                        <div className="form-group">
                          <label htmlFor="newPassword">Confirm New Password</label>
                          <input onChange={handleConfirmPassword} type="password" className="form-control" name="confirmPassword" />
                        </div>
                        <br />
                        <button id="update" onClick={handleUpdate} className="btn btn-primary">
                        <span>Submit</span>
                        </button>
                    </div>
                </div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</div>
	);
};

export default ResetPassword;
