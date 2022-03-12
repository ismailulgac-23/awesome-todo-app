import React from "react";
import Todos from "../../page-components/group-detail/Todos";
import Header from "../../components/Header";

const GroupDetail = () => {
  return (
    <div className="home-page">
      <div className="home-card">
        <Header goBack={true} />
        <Todos />
      </div>
    </div>
  );
};

export default GroupDetail;
