import React from "react";
import Loading from "../components/Loading";
import Groups from "../page-components/home/Groups";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-card">
        <Header />
        <Groups />
      </div>
    </div>
  );
};

export default Home;
