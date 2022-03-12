import React, { useContext, useState } from "react";
import { IoIosLock, IoIosPerson } from "react-icons/io";
import Button from "../components/Button";
import { promiseRequest } from "../constants/helpers";
import { UserContext } from "../store/user";
const Register = () => {
  const userStore = useContext(UserContext);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChangeFactory = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title display-3 mb-5">Register</h1>

        <div className="form">
          <div className="form-group">
            <IoIosPerson size={35} color="#fff" className="mr-2" />
            <input
              name="username"
              value={user.username}
              onChange={handleChangeFactory}
              type="text"
              placeholder="USERNAME"
            />
          </div>

          <div className="form-group">
            <IoIosLock size={35} color="#fff" className="mr-2" />
            <input
              name="password"
              value={user.password}
              onChange={handleChangeFactory}
              type="password"
              placeholder="PASSWORD"
            />
          </div>

          <Button
            event={async () => {
              await promiseRequest({
                event: () => userStore.auth.register(user),
                msg: {
                  success: "You're registered.",
                  error: "Something went wrong!",
                },
              });
            }}
            title="REGISTER"
            className="mb-4"
          />
          <Button
            link="/login"
            bg="transparent"
            textStyles={{
              color: "#fff",
            }}
            title={"LOGIN"}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
