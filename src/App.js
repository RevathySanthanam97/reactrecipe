import { Component } from "react";
import { BsSearch } from "react-icons/bs";
import "./App.css";
import Recipe from "./components/Recipe";
const API_ID = "b965d9f9";
const API_KEY = "73524bd94170108b8fdf2051cb86cc0c";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loaded: false,
      ifSubmitted: "false",
      query: "chicken",
    };
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({
      ifSubmitted: true,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.query !== prevProps.query && this.state.ifSubmitted) {
      fetch(
        `https://api.edamam.com/search?q=${this.state.query}&app_id=${API_ID}&app_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            items: result.hits,
            ifSubmitted: false,
          });
        });
    }
  }

  componentDidMount() {
    fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${API_ID}&app_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          items: result.hits,
          loaded: true,
        });
      });
  }

  render() {
    if (this.state.loaded) {
      return (
        <div className="mainContainer">
          <div className="formSection">
            <h2>Search any Recipe</h2>
            <form className="form" onSubmit={this.handleSearch.bind(this)}>
              <input
                className="input"
                value={this.state.query}
                onChange={(e) =>
                  this.setState({
                    query: e.target.value,
                  })
                }
                placeholder="Search"
              ></input>
              <button className="button">
                <BsSearch />
              </button>
            </form>
          </div>
          <div className="receipeItem">
            {this.state.items.map((item) => (
              <Recipe
                key={item.recipe.label}
                title={item.recipe.label}
                img={item.recipe.image}
                calorie={item.recipe.calories}
                ingredients={item.recipe.ingredients}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return <p>Page Loading...</p>;
    }
  }
}
export default App;
