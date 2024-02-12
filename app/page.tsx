"use client";

import Header from "@/components/header.component";
import { useSession } from "next-auth/react";
import DndExample from "@/components/DndExample";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen text-white">
        <div className="relative h-[100vh] grid items-center">
          <img src="./img/login-bg.png" alt="image" className="absolute w-full h-full object-cover object-center blur-md"/>
          <div className={`absolute text-[100px] w-full text-center ${ user ? " top-[100px]" : "top-1/3 h-96" }`}>
            {
              !user ? <span>Welcome</span> : <DndExample />
            }
            
          </div>
        </div>
        <Header />

      </section>
    </>
  );
}
