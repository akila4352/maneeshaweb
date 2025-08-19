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
    </div>
  );
};

export default FeaturedProperties;