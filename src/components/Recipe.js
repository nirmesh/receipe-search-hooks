import React from "react";
import { Link } from "react-router-dom";

function Recipe(props) {
  const { recipe } = props.recipe;

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
      <div className="card mb-4 shadow-sm ">
        <img className="card-img-top" src={recipe.image} alt={recipe.label} />

        <div className="card-body">
          <h4 className="recipe-title">
            {recipe.label.length < 20
              ? `${recipe.label}`
              : `${recipe.label.substring(0, 15)}...`}
          </h4>

          <Link
            className="btn btn-block btn-secondary"
            role="button"
            to={`/detail/recipe/${recipe.uri}`}
            onClick={() => props.handleClickDetails(recipe)}
          >
            View more
          </Link>

          <p>
            <small>{recipe.source}</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
