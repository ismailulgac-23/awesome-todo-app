import Head from "next/head";
import React, { useContext } from "react";
import { UserContext } from "../store/user";
import Loading from "./Loading";

interface ILayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title = "TODO App" }: ILayoutProps) => {
  const userStore = useContext(UserContext);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        {userStore.userLoading && (
          <Loading
            isLoading={userStore.userLoading}
            properties={{
              size: 56,
              color: "#F3477A",
            }}
          />
        )}
        {userStore.user && !userStore.userLoading ? children : null}
      </div>
    </>
  );
};

export default Layout;
