import React from "react";
import { NavLink, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
  const activateStyle = {
    background: "black",
    color: "white",
  };
  return (
    <div>
      <h3>User List :</h3>
      <ul>
        <li>
          <NavLink activeStyle={activateStyle} to="/profiles/ganghyunyu" active>
            ganghyunyu
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activateStyle} to="/profiles/machine">
            machine
          </NavLink>
        </li>
      </ul>
      <Route
        path="profiles"
        exact // exact={true}
        render={() => <div>select user</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;
