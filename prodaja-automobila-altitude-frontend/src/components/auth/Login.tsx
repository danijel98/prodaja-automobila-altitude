import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import altitudeLogo from "../../assets/altitudeLogo.png";
import { login } from "../../redux/actions/authAction";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  type LoginError = "badCredentials" | "badRequest";

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    let inputId = e.target.id;
    let inputValue = e.target.value;
    switch (inputId) {
      case "usernameUser":
        setUser({ ...user, username: inputValue });
        break;
      case "passwordUser":
        setUser({ ...user, password: inputValue });
        break;
    }
  };

  const loginErrors = (error: LoginError): string => {
    let messageError: string;

    switch (error) {
      default:
        messageError = "invalidLogin";
    }

    return messageError;
  };

  const handleSubmitLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(login(user) as any)
      .then(() => {
        navigate("/home");
      })
      .catch((err: any) => {
        let message = loginErrors(err);
        setMessage(message);
      });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <img
          className={styles.logoImage}
          src={altitudeLogo}
          alt="BigCo Inc. logo"
        />
      </div>
      <div className={styles.formContainer}>
        <Form onSubmit={handleSubmitLogin} className={styles.form}>
          <Form.Group className={styles.formGroup}>
            <div className={`row ${styles.labelclass}`}>
              <Form.Label>{"Username"}</Form.Label>
            </div>

            <div className={styles.inputContainer}>
              <Form.Control
                id="usernameUser"
                className={styles.inputClass}
                autoFocus
                type="text"
                value={user.username}
                onChange={handleChangeUser}
              />
            </div>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <div className={`row ${styles.labelclass}`}>
              <Form.Label>{"Password"}</Form.Label>
            </div>
            <div className={styles.inputContainer}>
              <Form.Control
                id="passwordUser"
                type="password"
                className={styles.inputClass}
                value={user.password}
                onChange={handleChangeUser}
              />
            </div>
          </Form.Group>
          {message && (
            <div className={styles.messageContainer}>
              <p className={styles.errorMessage}>{message}</p>
            </div>
          )}
          <div className={styles.submitBtnContainer}>
            <button
              name="action"
              value="login"
              type="submit"
              className={styles.btnSubmit}
            >
              <p className={styles.txtSubmit}>{"Sign In"}</p>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
