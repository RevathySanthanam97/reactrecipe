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
      isLoaded: false,
      query: "paneer",
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    const QUERY = this.state.query;
    fetch(
      `https://api.edamam.com/search?q=${QUERY}&app_id=${API_ID}&app_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          items: result.hits,
        });
      });
  }
  updateQuery(e) {
    this.setState({
      query: e.target.value,
    });
  }

  componentDidMount() {
    fetch(
      `https://api.edamam.com/search?q=${this.state.query}&app_id=${API_ID}&app_key=${API_KEY}`
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
    return (
      <div className="mainContainer">
        <div className="formSection">
          <h2>Search any Recipe</h2>
          <form className="form" onSubmit={this.handleSearch}>
            <input
              className="input"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e)}
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
  }
}
export default App;
