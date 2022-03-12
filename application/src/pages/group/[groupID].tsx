import React, { useContext } from "react";
import Todos from "../../page-components/group-detail/Todos";
import Header from "../../components/Header";
import Head from "next/head";
import { GroupContext } from "../../store/group";

const GroupDetail = () => {
  const groupStore = useContext(GroupContext);

  return (
    <>
      <Head>
        <title>{groupStore.currentGroup ? groupStore.currentGroup.groupName : 'Loading..'}</title>
      </Head>
      <div className="home-page">
        <div className="home-card">
          <Header goBack={true} />
          <Todos />
        </div>
      </div>
    </>
  );
};

export default GroupDetail;
