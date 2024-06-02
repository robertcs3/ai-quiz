import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center text-center">
      <Link href={'/quiz'}>Modules</Link>
    </section>
  )
}

export default Home