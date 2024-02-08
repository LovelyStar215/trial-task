"use client";

import Header from "@/components/header.component";


export default async function Home() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen">
        <div className="login relative" >
          <img src="/img/login-bg.png" alt="image" className="login__bg" />
          <div className="absolute text-[100px] w-full h-full text-center top-1/3">
            <span>Welcome</span>
          </div>
        </div>
        <Header />

      </section>
    </>
  );
}
