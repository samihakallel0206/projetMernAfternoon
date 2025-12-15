import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Register = () => {
  return (
    <div  className="register">
      <h1>Create a new USER</h1>
      <Form className="formulaire">
        {/* -------------------USER NAME------------------------- */}
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Enter user name" />
        </Form.Group>
        {/* --------------------------EMAIL------------------------------ */}
        <Form.Group className="mb-3">
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        {/* -----------------------------------PASSWORD------------------------- */}
        <Form.Group className="mb-3">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        {/* -----------------------------------PHONE--------------------- */}
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Enter user phone" />
        </Form.Group>
        {/* --------------------------------------ImagePic-------------------- */}
        <Form.Group className="mb-3">
          <Form.Control type="file" placeholder="Enter user Picture" />
        </Form.Group>
        {/* ------------------------------------ROLE------------- */}
        <Form.Group className="mb-3">
          <Form.Select aria-label="role">
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
