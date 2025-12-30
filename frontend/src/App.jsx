import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/dasboard/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import NavBare from "./components/NavBare";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { current } from "./JS/features/authSlice";
import AdminRoute from "./routes/AdminRoute";
import MangeUsers from "./pages/dasboard/MangeUsers";

function App() {
  
  const { user } = useSelector((state) => state.auth);
  // console.log("user", user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  return (
    <>
      {user && <NavBare />}
      <Routes>
        {/* //Routes pour l'affichage du form LOGIN */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* //Route pour tout ce qui est admin */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route path="register" element={<Register />} />
          <Route path='manageusers' element={<MangeUsers/>}/>
        </Route>

        {/* //Route Sortie qand il n'est pas authoriser */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>

      {user && <Footer />}
    </>
  );
}

export default App;
