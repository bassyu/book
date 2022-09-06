import React from "react";
import qs from "qs";

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true, // 문자열 맨 앞 '?' 생략
  });

  return (
    <div>
      <h1>About</h1>
      <p>This project is router tutorial.</p>
      {query.detail === "true" && <p>detail = "true"</p>}
    </div>
  );
};

export default About;
