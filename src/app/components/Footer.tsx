import React from 'react'
import { Anton } from "next/font/google";

const anton = Anton({subsets: ["latin"],weight:'400'});

const Footer = () => {
  return (
    <div>
      <footer className='mx-10 flex justify-evenly gap-12 py-36'>
        <div className='FtrLft flex flex-col gap-6'>
           <div> 
            <h1 className={`${anton.className} text-3xl text-[#00FF9C]`}>DevJuice - Open Source, Free, and Probably Buggy</h1>
            <p className='text-xl'>Built with Next.js, Tailwind, and some questionable life choices</p>
            </div>
            <p className='text-[#00FF9C]'>2025 DevJuice</p>
        </div>
        <div className='FtrRgt flex flex-col gap-5'>
          <h1 className='text-2xl'>Missing a cool tool? Submit it → <u className='text-[#00FF9C] cursor-pointer'>Contribute a tool</u></h1>
          <div>
          <h1 className='text-2xl text-[#00FF9C] font-medium'>Bugs?</h1>
          <ol className='my-3 flex flex-col gap-1'>
            <li>Blame Javascript</li>
            <li>Refresh the page</li>
            <li>If still missing fix it yourself → <u>Issues</u></li>
          </ol>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
