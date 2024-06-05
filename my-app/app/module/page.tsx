import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <section className="relative w-full min-h-[500px] flex flex-col items-center justify-center text-center"> 
      <Link href='/module/1'>AI Chatbot Basics</Link>
      <Link href='/module/2'>What is Artificial Intelligence?</Link>
    </section>
  )
}

export default page