import React from 'react';
import NavBar from './components/NavBar';
import LanHero from './components/LanHero';
import Category from './components/Category';
import Footer from './components/Footer';
import type { Metadata } from 'next';

const page = () => {
  return (
    <div className="bg-gray-100 text-[#C5193F]">
      <NavBar />
      <LanHero />
      <Category />
      <Footer />
    </div>
  );
};

export default page;
