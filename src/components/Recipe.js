import { Component } from "react";
import "./Recipe.css";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    const API_ID = "b965d9f9";
    const API_KEY = "73524bd94170108b8fdf2051cb86cc0c";
    fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=10&calories=591-722&health=alcohol-free`
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          items: result.hits,
        });
      });
  }

  render() {
    <div>
      {items.map((item) => (
        <div>
          <h3>{item.recipe.label}</h3>
          <img src={item.recipe.image} />
          <p>{item.recipe.cuisineType}</p>
        </div>
      ))}
    </div>;
  }
}

export default Recipe;
