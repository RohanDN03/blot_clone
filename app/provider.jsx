"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "../components/Custom/Header.jsx";
import { MessageContext } from "./context/MessageContext";
import { UserDetailContext } from "./context/UserDetailsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "../convex/_generated/api.js";
import AppSideBar from "../components/Custom/AppSideBar";
import { SidebarProvider } from "../components/ui/sidebar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ActionContext } from "./context/ActionContext.jsx";
import { useRouter } from "next/navigation.js";

function Provider({ children }) {
  const [message, setMessage] = useState();
  const [userDetail, setUserDetail] = useState();
  const [action, setAction] = useState();
  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");

    // if no user in localStorage -> redirect immediately
    if (!storedUser) {
      router.push("/");
      return;
    }

    let user = null;
    try {
      user = JSON.parse(storedUser);
    } catch (e) {
      console.error("Invalid user in localStorage:", e);
      router.push("/");
      return;
    }

    if (!user?.email) {
      router.push("/");
      return;
    }

    try {
      const result = await convex.query(api.users.getUser, { email: user.email });
      if (!result) {
        router.push("/");
        return;
      }
      setUserDetail(result);
      console.log("User from DB:", result);
    } catch (error) {
      console.error("Error fetching user from DB:", error);
      router.push("/");
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessageContext.Provider value={{ message, setMessage }}>
            <ActionContext.Provider value={{ action, setAction }}>
              <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <SidebarProvider defaultOpen={false}>
                  <Header />
                  <AppSideBar />
                  {children}
                </SidebarProvider>
              </NextThemesProvider>
            </ActionContext.Provider>
          </MessageContext.Provider>
        </UserDetailContext.Provider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  );
}

export default Provider;