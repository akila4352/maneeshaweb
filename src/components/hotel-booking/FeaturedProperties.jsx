import "./featuredProperties.css";
import { featuredPropertiesData } from "../data/Data";

const FeaturedProperties = () => {
  return (
    <div className="fp">
      {featuredPropertiesData.map((item, idx) => (
        <div className="fpItem" key={idx}>
          <img src={item.img} alt={item.name} className="fpImg" />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">{item.price}</span>
          <div className="fpRating">
            <button>{item.rating}</button>
            <span>{item.ratingText}</span>
          </div> 
        </div> 
      ))}
      <style>{`
        @media (max-width: 900px) {
          .fp {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.5rem !important;
            padding: 0 2vw !important;
          }
          .fpItem {
            width: 100% !important;
            max-width: 100vw !important;
            padding: 6px 0 !important;
            margin: 0 !important;
            border-radius: 10px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          }
          .fpImg {
            width: 100% !important;
            height: 90px !important;
            object-fit: cover !important;
            border-radius: 8px !important;
          }
          .fpName, .fpCity, .fpPrice {
            font-size: 0.95rem !important;
          }
          .fpRating button {
            font-size: 0.85rem !important;
          }
        }
        @media (max-width: 600px) {
          .fpImg {
            height: 60px !important;
          }
          .fpName, .fpCity, .fpPrice {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedProperties;