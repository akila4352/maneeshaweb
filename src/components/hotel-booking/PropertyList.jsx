import React from "react";
import "./propertyList.css";

const propertyData = [
  {
    name: "Hotels",
    count: "233 hotels",
    img: "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
  },
  {
    name: "Apartments",
    count: "2331 hotels",
    img: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
  },
  {
    name: "Resorts",
    count: "2331 hotels",
    img: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
  },
  {
    name: "Villas",
    count: "2331 hotels",
    img: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
  },
  {
    name: "Cabins",
    count: "2331 hotels",
    img: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  },
];

const PropertyList = ({ selected, setSelected }) => {
  const handleSelect = (name) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="pList">
      {propertyData.map((item, idx) => (
        <div
          className={`pListItem${
            selected.includes(item.name) ? " selected" : ""
          }`}
          key={idx}
          onClick={() => handleSelect(item.name)}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <img src={item.img} alt={item.name} className="pListImg" />
          {/* Selected indicator */}
          {selected.includes(item.name) && (
            <span
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "#FEA116",
                color: "#fff",
                borderRadius: "50%",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "1.2rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                zIndex: 2,
              }}
            >
              ✓
            </span>
          )}
          <div className="pListTitles">
            <h1>{item.name}</h1>
            <h2>{item.count}</h2>
          </div>
        </div>
      ))}
      <style>{` 
        .pListItem.selected {
          box-shadow: 0 0 0 3px #FEA116;
        }
        @media (max-width: 900px) {
          .pList {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.5rem !important;
            padding: 0 2vw !important;
          }
          .pListItem {
            width: 100% !important;
            max-width: 100vw !important;
            padding: 6px 0 !important;
            margin: 0 !important;
            border-radius: 10px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          }
          .pListImg {
            width: 100% !important;
            height: 90px !important;
            object-fit: cover !important;
            border-radius: 8px !important;
          }
          .pListTitles {
            padding: 6px 0 !important;
          }
          .pListTitles h1 {
            font-size: 1rem !important;
            margin-bottom: 2px !important;
          }
          .pListTitles h2 {
            font-size: 0.85rem !important;
            margin-bottom: 0 !important;
          }
        }
        @media (max-width: 600px) {
          .pListImg {
            height: 60px !important;
          }
          .pListTitles h1 {
            font-size: 0.95rem !important;
          }
          .pListTitles h2 {
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PropertyList;
