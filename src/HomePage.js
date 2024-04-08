import React from "react";
import Hdr from "./components/Hdr";
import HomeContent from "./components/HomeContent";
import Footer from "./components/Footer";
import UserList from "./components/UsersList";

function HomePage() {
  const DUMMY_ENTRIES = [
    {
      id: 'u1',
      name: 'Atlanta Beltline',
      image: 'https://res.cloudinary.com/atlanta/images/f_auto,q_auto/v1598035340/newAtlanta.com/AtlantaEastsideBeltLineAerialMidtownSkyline/AtlantaEastsideBeltLineAerialMidtownSkyline.png?_i=AA',
    },
    {
      id: 'u2',
      name: 'The High Line',
      image: 'https://travel.usnews.com/images/High_Line_Alexander_Spatari_Getty.jpg'
    },
    {
      id: 'u3',
      name: 'Stanley Park',
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_1110,q_50,w_1920/v1/clients/vancouverbc/Stanley_Park_TVan_a6141811-1d58-4eeb-a2d3-402b7a873330.jpg'
    }
    
  ];
  return (
    <div className='page'>
        <Hdr />
        <HomeContent />
        <UserList items = {DUMMY_ENTRIES} />
        <Footer />
    </div>
  );
}

export default HomePage;