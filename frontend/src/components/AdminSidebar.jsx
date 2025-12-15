import { Link } from "react-router-dom";
import './adminSide.css'
const AdminSidebar = () => {
  return (
    <div className="side">
      <ul>
        <li>
          <Link to="register">Add User</Link>
        </li>
        <li>
          <Link to="/admin/dashboard">Manage Users</Link>
        </li>
        <li>
          <Link to="/admin/dashboard">Setting</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
