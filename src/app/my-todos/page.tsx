"use client";
import { useEffect } from "react";
import { useCookies } from "next-client-cookies";

export default function NewUser() {
  const cookies = useCookies();
  useEffect(() => {
    console.log(cookies.get("username"));
  }, [cookies]);

  return (
    <main>
      <div>Hello, {cookies.get("username")}!</div>
      {/* <Todos /> */}
    </main>
  );
}
