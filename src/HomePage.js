import React from "react";
import Hdr from "./components/Hdr";
import HomeContent from "./components/HomeContent";
import Footer from "./components/Footer";

function HomePage() {
  return (
    <div className='page'>
        <Hdr />
        <HomeContent />
        <Footer />
    </div>
  );
}

export default HomePage;