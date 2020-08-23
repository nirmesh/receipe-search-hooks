import React, { useContext } from "react";
import Recipe from "./Recipe";
import { Context } from "../context";

function Results(props) {
  const [results] = useContext(Context);

  return (
    <div className="container">
      <div className="row mt-4">
        {results &&
          results.map(item => (
            <Recipe
              recipe={item}
              key={item.recipe.uri}
              handleClickDetails={props.handleClickDetails}
            />
          ))}

        {results.length === 0 && (
          <h4>No matching results. Try a different search.</h4>
        )}
      </div>
    </div>
  );
}

export default Results;
