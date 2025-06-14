import React from 'react';
import NavBar from './components/NavBar';
import LanHero from './components/LanHero';
import Category from './components/Category';
import Footer from './components/Footer';
import Bento from './components/Bento';
import Cta from './components/Cta';

const page = () => {
  return (
    <div className="font-s bg-[#121212] text-white">
      <NavBar />
      <LanHero />
      <Bento />
      <Category />
      <Cta />
      <Footer />
    </div>
  );
};

export default page;
