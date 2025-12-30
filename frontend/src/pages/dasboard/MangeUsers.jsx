import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../JS/features/userSlice";

const MangeUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  console.log(users);
  return (
    <div>
      {users.map((user) => (
        <h5 key={user._id}>{user.userName}</h5>
      ))}
    </div>
  );
};

export default MangeUsers;
