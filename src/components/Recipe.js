import React, { Component } from "react";
import "./Recipe.css";
export class Recipe extends Component {
  render() {
    const { title, img, calorie, ingredients } = this.props;

    return (
      <div key={title}>
        <h3>{title}</h3>
        <img src={img} alt="recipeImg" />
        <p>
          Calories: <strong>{calorie}</strong>
        </p>
        <ol>
          <p>
            <b>Recipe:</b>
          </p>
          {ingredients.map((ingredient) => (
            <li>{ingredient.text}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Recipe;
