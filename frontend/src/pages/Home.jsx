import React from "react";
import Heders from "../components/Headers";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";

const Home = () => {
  return (
    <div className="w-full">
      <Heders />
      <Banner />
      <div className="my-4">
        <Categorys />
      </div>
    </div>
  );
};

export default Home;
