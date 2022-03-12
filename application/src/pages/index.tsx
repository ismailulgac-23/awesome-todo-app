import React from "react";
import Loading from "../components/Loading";
import Groups from "../page-components/home/Groups";
import Header from "../components/Header";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Awesome Chat App</title>
      </Head>
      <div className="home-page">
        <div className="home-card">
          <Header />
          <Groups />
        </div>
      </div>
    </>
  );
};

export default Home;
