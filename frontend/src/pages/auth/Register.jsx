import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { register } from "../../JS/features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [newUser, setNewuser] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    roleTitre: "",
    file: null,
  });
  const handleChange = (e) => {
    setNewuser({ ...newUser, [e.target.name]: e.target.value });
  };
  // console.log(newUser)
  const handleRegister = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userName", newUser.userName);
    data.append("email", newUser.email);
    data.append("password", newUser.password);
    data.append("phone", newUser.phone);
    data.append("roleTitre", newUser.roleTitre);
    if (newUser.file) data.append("profilePic", newUser.file);
    dispatch(register(data));
  };
  return (
    <div className="register">
      <h1>Create a new USER</h1>
      <Form className="formulaire" onSubmit={handleRegister}>
        {/* -------------------USER NAME------------------------- */}
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter user name"
            name="userName"
            value={newUser.userName}
            onChange={handleChange}
          />
        </Form.Group>
        {/* --------------------------EMAIL------------------------------ */}
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
          />
        </Form.Group>
        {/* -----------------------------------PASSWORD------------------------- */}
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />
        </Form.Group>

        {/* -----------------------------------PHONE--------------------- */}
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter user phone"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
          />
        </Form.Group>
        {/* --------------------------------------ImagePic-------------------- */}
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            placeholder="Enter user Picture"
            name="profilePic"
            onChange={(e) =>
              setNewuser({ ...newUser, file: e.target.files[0] })
            }
          />
        </Form.Group>
        {/* ------------------------------------ROLE------------- */}
        <Form.Group className="mb-3">
          <Form.Select
            aria-label="role"
            name="roleTitre"
            value={newUser.roleTitre}
            onChange={handleChange}
            required
          >
            <option>Role</option>
            <option value="ADMIN">Admin</option>
            <option value="AGENT">Agent</option>
            <option value="RECRUT">Recrut</option>
          </Form.Select>
        </Form.Group>
        {/* ----------------------------------BUTTON------------------      */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
