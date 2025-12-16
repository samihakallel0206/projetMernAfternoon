import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login-register.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../JS/features/authSlice";
import {useNavigate} from "react-router-dom"
const Login = () => {
  const dispatch = useDispatch();
  //!
  const navigate = useNavigate()
  const [userToConnect, setUserToConnect] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserToConnect({ ...userToConnect, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: userToConnect.email,
        password: userToConnect.password,
        //!
        navigate
      })
    );
    // navigate('/admin/dashboard') ❌
  };
  console.log(userToConnect)
  
  return (
    <div className="login">
      <h2>LOGIN</h2>
      <Form className="formulaire" onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={userToConnect.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Password"
            name="password"
            value={userToConnect.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
