import React from "react";
import { Link } from "react-router-dom";

function DetailCard(props) {
  const { item } = props;
  return (
    <>
      <Link to="/" className="btn btn-secondary btn-sm mb-4">
        Go Back
      </Link>
      <div className="container">
        <div className="row mb-4">
          <div className="col-sm-12 col-md-6">
            <img src={item.image} alt={item.label} />
          </div>

          <div className="preparation-section col-sm-12 col-md-6">
            <h3>{item.label}</h3>
            <br />
            <h4>Preparation</h4>
            <p>
              {" "}
              See full recipe on{" "}
              <a target="_blank" rel="noopener noreferrer" href={item.url}>
                {item.source}{" "}
              </a>
            </p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="ingredients-section col-sm-12 col-md-6 mb-4">
            <h4>Ingredients</h4>
            <ul className="list-group list-group-flush">
              {item.ingredientLines.map((ingredient, index) => (
                <li className="list-group-item" key={index}>
                  {" "}
                  <i className="far fa-check-circle" /> {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="nutrition-section col-sm-12 col-md-6 ">
            <h4>Nutrition</h4>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Calories <span>{Math.round(item.calories)}</span>
              </li>
              {item.digest.slice(0, 3).map((item, index) => (
                <li className="list-group-item" key={index}>
                  <span>{item.label}</span>{" "}
                  <span>{Math.round(item.total)}</span> <span>{item.unit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailCard;
