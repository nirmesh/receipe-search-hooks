import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import DetailCard from "./components/DetailCard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "./context";

function App() {
  const [recipe, setRecipe] = useState(null);

  const handleClickDetails = recipeSelected => {
    setRecipe(recipeSelected);
  };

  return (
    <Provider>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Search handleClickDetails={handleClickDetails} />}
          />

          <Route
            path="/detail/recipe/:id"
            render={() => <DetailCard item={recipe} />}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
