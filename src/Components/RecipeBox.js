import React from 'react';
import "./RecipeBox.css";
import Recipe from './Recipe';

class RecipeBox extends React.Component {
  constructor (props) {
		super (props);
		this.state = {
      recipes: [
        {title: 'Spahetti', ingredients: ['pasta', 'tomato sause', 'meatballs']},
        {title: 'Pumpkin soup', ingredients: ['pumpkin', 'cream', 'water']},
        {title: 'Pizza', ingredients: ['tomato', 'cheese']}
      ]
		};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event){
    event.preventDefault();
    console.log('Recipe clicked!');
  }
  saveToLocalStorage() {
    var JSONRecipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('RecipeBox', JSONRecipes);
  }
  getFromLocalStorage(){
    return JSON.parse(localStorage['RecipeBox']);
  }
  componentWillMount(){
    this.saveToLocalStorage();
  }
  render() {
    var recipeList = this.getFromLocalStorage();
    console.log(recipeList);
    recipeList = recipeList.map((e, index) =>
    {return <li onClick={this.handleClick} className='recipeItem' key={index}>{e.title}</li>});
    return (
      <div className="RecipeBox">
        <ul>  {recipeList} </ul>
      </div>
    );
  }
}

export default RecipeBox;
