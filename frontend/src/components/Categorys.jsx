import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

const Categorys = () => {
  //const { categorys } = useSelector(state => state.home)

  const categorys = [
    {
      name: "Computers",
      image:
        "https://i.gadgets360cdn.com/products/large/alienware-x16-db-1094x800-1672745144.jpg",
    },
    {
      id: 2,
      name: "Fashion",
      image:
        "https://www.sciencenews.org/wp-content/uploads/2021/06/061521_mt_cosmetics_feat.jpg",
    },
    {
      id: 3,
      name: "Accessories",
      image:
        "https://bobbysfashions.com/wp-content/uploads/2018/05/Style-Accessories-for-Men.jpg",
    },
    {
      id: 4,
      name: "Clothing",
      image:
        "https://cdn.shopify.com/s/files/1/0558/6413/1764/files/1_fbf588ca-9895-416a-874e-52892263d917_1024x1024.png",
    },
    {
      id: 5,
      name: "Shoes",
      image:
        "https://lajolla.com/wp-content/uploads/2022/01/Best-Shoe-Stores-San-Diego-1024x576.jpg",
    },
    {
      id: 6,
      name: "Birthday",
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2021/12/christmasgifts-2048px-1287618519-3x2-1.jpg",
    },
    {
      id: 7,
      name: "Pet Supplies",
      image:
        "https://i0.wp.com/mypetnutritionist.com/wp-content/uploads/2023/02/6295ff0be5bbeec3bf693a91_resized-image-Promo-14.jpeg",
    },
    {
      id: 8,
      name: "Electronics",
      image:
        "https://www.macworld.com/wp-content/uploads/2023/05/verizon-deal-post.jpg",
    },
    {
      id: 9,
      name: "Music",
      image:
        "https://www.blitzwolfeurope.com/shop_ordered/90562/pic/gtk0/blitzwolf-bw-gtk0-gamer-fejhallgato-tarto-w07.jpg",
    },
    {
      id: 10,
      name: "Books",
      image:
        "https://cdn.create.vista.com/api/media/small/38411117/stock-photo-books-in-library-room",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="w-[87%] mx-auto relative">
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categorys.map((c, i) => (
          <Link className="h-[185px] border block" key={i} to="#">
            <div className="w-full h-full relative p-3">
              <img
                src={c.image}
                alt="image"
                className="mx-auto w-[250px] h-[110px] md:w-[250px] lg:w-[250px] xl:w-1/4 2xl:w-1/6"
              />
              <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center">
                <span className="py-[2px] px-6 bg-[#54585c] text-white">
                  {c.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categorys;
