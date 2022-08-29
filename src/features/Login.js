import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import userApi from "@api/user";
import { useQuery } from "react-query";

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [hash, setHash] = useState();

  const { data, refetch } = useQuery(
    ["user", username, hash],
    () =>
      userApi.getUser({
        hash,
      }),
    { enabled: false }
  );

  useEffect(() => refetch(), [hash]);

  useEffect(() => data && setToken(data.verificationToken), [data]);

  const handleSubmit = async (e) => {
    const crypto = require("crypto");
    const val = password + username;
    setHash(crypto.createHash("md5").update(val).digest("hex"));
    e.preventDefault();
  };

  console.log("tu?");
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
