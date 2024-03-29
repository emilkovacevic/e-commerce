import React, { useState, createContext, useEffect } from "react";
import { ProductProps } from "@components/Product";
import { useRouter } from "next/router";
import { AxiosResponse } from "axios";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import axiosinstance from "src/axios/instance";
import { toast } from 'react-toastify';

interface PurchaseProps {
  id: string;
  total: number;
  items: ProductProps[];
  purchasedAt: Date;
}

interface UserProps {
  id?: string;
  name: string;
  email: string;
  imageUrl: string;
  password?: string;
  purchases?: PurchaseProps[];
}

interface LogInProps {
  email: string;
  password: string;
}

interface UserContextProps {
  isAuthenticated: boolean;
  user: UserProps | null;
  logIn: ({ email, password }: LogInProps) => Promise<AxiosResponse<any, any>>;
  logOut: () => void;
  signUp: (user: UserProps) => Promise<AxiosResponse<any, any>>;
}

export const UserContext = createContext({} as UserContextProps);

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  const router = useRouter();

  const [user, setUser] = useState<UserProps | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const getUser = async () => {
      const { eCommerceToken } = parseCookies();

      if (!eCommerceToken) return;

      const response = await axiosinstance.get(`/api/users/authenticate/${eCommerceToken}`);

      setUser(response.data);
      return;
    };

    getUser();
  }, []);

  const logIn = async ({ email, password }: LogInProps) => {
    const response = await axiosinstance.post(`/api/users/`, {
      email,
      password,
    });

    if (response.status === 200) {
      setUser(response.data.user);
      setCookie(undefined, "eCommerceToken", response.data.token, {
        maxAge: 120,
      });
      toast('loggin successful')
      router.push("/");
    }
    return response
  };

  const logOut = () => {
    setUser(null);
    destroyCookie(undefined, "eCommerceToken");
    toast('logout successful')
    router.push("/login");
  };

  const signUp = async (user: UserProps) => {
    const response = await axiosinstance.post("/api/create/user", user);

    if (response.status === 200) {
      setUser(response.data.user);
      setCookie(undefined, "eCommerceToken", response.data.token, {
        maxAge: 120,
      });
    }

    return response;
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, logIn, logOut, signUp }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
