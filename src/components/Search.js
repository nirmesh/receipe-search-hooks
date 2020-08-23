import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import Results from "./Results";
import Spinner from "./Spinner";
import Error from "./Error";
import { Context } from "../context";

function Search(props) {
  const [query, setQuery] = useState("");

  const [healthLabels, setHealthLabels] = useState([
    {
      label: "vegan",
      checked: false
    },
    {
      label: "vegetarian",
      checked: false
    },
    {
      label: "sugar-conscious",
      checked: false
    },
    {
      label: "peanut-free",
      checked: false
    },
    {
      label: "alcohol-free",
      checked: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const APP_ID = process.env.REACT_APP_ID;
  const APP_KEY = process.env.REACT_APP_KEY;

  const [results, setResults] = useContext(Context);

  const myRef = useRef(null);
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop + 300);

  useEffect(() => {
    scrollToRef(myRef);
  }, [isLoading]);

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    getRecipes();
  };

  const onToggleHealthLabel = index => {
    setHealthLabels(currentHealthLabels =>
      
      currentHealthLabels.map((healthLabel, healthLabelIndex) => {
        //console.log(healthLabel, healthLabelIndex)
        if (healthLabelIndex === index) {
          console.log({
            ...healthLabel,
            checked: !healthLabel.checked
          })
          return {
            ...healthLabel,
            checked: !healthLabel.checked
          };
        }
        //console.log(healthLabel);
        return healthLabel;
      })
    );
  };

  const getRecipes = () => {
    const healthLabelsChecked = healthLabels.filter(
      healthLabel => healthLabel.checked === true
    );

    let queryHealthLabels = "";
    if (healthLabelsChecked) {
      healthLabelsChecked.map(
        label =>
          (queryHealthLabels = queryHealthLabels
            .concat("&health=")
            .concat(label.label))
      );
    }

    const url = `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}%20&from=0&to=30${queryHealthLabels}`;

    setIsError(false);
    setIsLoading(true);

    return axios
      .get(url)
      .then(response => {
        const results = response.data.hits;
        setResults(results);
        setIsLoading(false);
      })
      .catch(error => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <header className="masthead text-white text-center">
        <div className="overlay" />
        <div className="container">
          <div ref={myRef} className="row">
            <div className="col-xl-9 mx-auto">
              <h1 className="title mb-5">Recipes Searcher</h1>
              <h3 className="intro">
                Find the recipe to fit your lifestyle and health
              </h3>
            </div>
            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
              <form onSubmit={handleOnSubmit}>
                <div className="form-row mb-4">
                  <div className="col-12 col-md-9 mb-2 mb-md-0">
                    <input
                      type="text"
                      name="query"
                      value={query}
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                      placeholder="What are you looking for?"
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-lg btn-primary"
                    >
                      Search
                    </button>
                  </div>
                </div>

                <div className="col-12 col-md-9 mb-2 mb-md-0">
                  <div className="form-row justify-content-center">
                    {healthLabels.map((healthLabel, index) => (
                      <div className="form-group form-check mr-4" key={index}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={index}
                          checked={healthLabel.checked}
                          value={healthLabel.label}
                          onChange={() => onToggleHealthLabel(index)}
                        />
                        <label className="form-check-label" htmlFor={index}>
                          {healthLabel.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
      {isError && <Error />}

      <div />

      {isLoading ? (
        <Spinner />
      ) : (
        results && <Results handleClickDetails={props.handleClickDetails} />
      )}
    </div>
  );
}

export default Search;
