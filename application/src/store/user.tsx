import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { ILoginProps } from "../@core/interfaces";
import { User } from "../@core/models";
import httpService from "../services/http";
import socket from "../services/socket";

interface IUserState {
  user: User | null;
  userLoading: boolean;
  token: string | null;
  auth: {
    login: (user: ILoginProps) => any;
    register: (user: ILoginProps) => any;
    isAuth: () => any;
    disconnect: () => any;
  };
  users: {
    searchUsers: (q: string) => any;
  };
}

interface IUserStoreProps {
  children: React.ReactNode;
}

export const UserContext = createContext({} as IUserState);

export default function UserStore({ children }: IUserStoreProps) {

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const login = async (user: ILoginProps) => {
    const data = await httpService.post("auth/login", user);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    return data;
  };
  const isAuth = async () => {
    const data = await httpService.get("auth", {
      token: localStorage.getItem("token")!,
    });

    if (data.error) {
      disconnect();
    } else {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    }
    return data;
  };

  const register = async (user: ILoginProps) => {
    const data = await httpService.post("auth", user);
    if (data.error) {
      disconnect();
    } else {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      router.push("/");
    }
    return data;
  };

  const disconnect = () => {
    setUser(null);
    setUserLoading(false);
    localStorage.clear();
    router.push("/login");
  };

  const searchUsers = async (query: string) => {
    const data = await httpService.get("user?q=" + query);
    return data;
  };

  useEffect(() => {
    async function main() {
      setUserLoading(true);
      let token = localStorage.getItem("token") || null;
      if (token != null) {
        await isAuth();
        setUserLoading(false);
      } else {
        setUser(null);
        setUserLoading(false);

        router.push("/login");
      }
    }
    if (!token && !user) main();
    else {
      socket.emit("connectUser", user?.userID);
    }
  }, [token, user, socket]);

  useEffect(() => {
    if (token && user) {
      if (router.asPath == "/login" || router.asPath == "/register") {
        router.push("/");
      }
    }
  }, [user, token]);

  let initialState = {
    user,
    userLoading,
    token,
    auth: {
      login,
      register,
      isAuth,
      disconnect,
    },
    users: {
      searchUsers,
    },
  };
  return (
    <UserContext.Provider value={initialState}>{children}</UserContext.Provider>
  );
}
