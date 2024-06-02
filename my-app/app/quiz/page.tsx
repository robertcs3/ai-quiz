import React from "react";
import Link from 'next/link'

const page = () => {
 
  return (
    <section className="relative w-full min-h-[500px] flex flex-col items-center justify-center text-center"> 
      <Link href='/quiz/1'>What is Artificial Intelligence?</Link>
      <Link href='/quiz/2'>AI Chatbot Basics</Link>
    </section>
   
  );
};

export default page;