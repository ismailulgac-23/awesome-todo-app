import React, { useContext, useState } from "react";
import { IoIosAdd, IoIosArrowBack, IoIosLogOut } from "react-icons/io";
import Button from "./Button";
import NewGroupModal from "./modal/NewGroupModal";
import { Colors } from "../constants/theme";
import { UserContext } from "../store/user";

const Header = ({ goBack = false }: { goBack?: boolean }) => {
  const userStore = useContext(UserContext);

  const [groupModalShow, setGroupModalShow] = useState(false);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-mobile-column">
        <h1 className="display-5 mb-4">
          Welcome,{" "}
          <b className="text-main-primary">{userStore.user?.username}</b>
        </h1>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            gap: 12,
          }}
        >
          {goBack ? (
            <Button
              link="/"
              buttonStyles={{
                padding: 6,
                height: 50,

                width: 150,
              }}
              title={
                <>
                  <IoIosArrowBack size={22} color="#fff" />
                  Go Back
                </>
              }
              bg={Colors.Primary}
              textStyles={{ color: "#fff", fontSize: 15 }}
            />
          ) : (
            <Button
              event={() => setGroupModalShow(true)}
              buttonStyles={{
                padding: 6,
                height: 50,

                width: 150,
              }}
              title={
                <>
                  <IoIosAdd size={26} color="#fff" />
                  New Group
                </>
              }
              bg={Colors.Primary}
              textStyles={{ color: "#fff", fontSize: 15 }}
            />
          )}

          <Button
            event={() => userStore.auth.disconnect()}
            buttonStyles={{
              padding: 6,
              height: 50,

              width: 150,
            }}
            title={
              <>
                <IoIosLogOut size={22} color="#fff" />
                Logout
              </>
            }
            bg={Colors.Danger}
            textStyles={{ color: "#fff", fontSize: 15 }}
          />
        </div>
      </div>
      <NewGroupModal show={groupModalShow} onShow={setGroupModalShow} />
    </>
  );
};

export default Header;
