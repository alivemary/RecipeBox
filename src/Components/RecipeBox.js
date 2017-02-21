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
      ],
      isModalOpen: false
		};

  }
  handleDetails(index){
    (document.getElementsByClassName('recipeDetails')[index].style.display==='block')
    ? document.getElementsByClassName('recipeDetails')[index].style.display='none'
    : document.getElementsByClassName('recipeDetails')[index].style.display='block';

  }

  saveToLocalStorage() {
    var JSONRecipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('RecipeBox', JSONRecipes);
  }
  getFromLocalStorage(){
    return JSON.parse(localStorage['RecipeBox']);
  }
  componentWillMount(){
    if (localStorage.getItem("RecipeBox") === null) {
      this.saveToLocalStorage();
    }
  }
  render() {

    var recipeList = this.getFromLocalStorage();
    console.log(recipeList);
    var buttonDelete = <button className="buttonDelete" type='button'>Delete</button>;
    var buttonEdit = <button className='buttonedit' type='button'>Edit</button>;
    recipeList = recipeList.map((e, index) =>
    {  return <li onClick={() => this.handleDetails(index)} className='recipeItem' key={index}>
                {e.title}
                <div className='recipeDetails'>
                  <Recipe ingredients={e.ingredients}/>
                  {buttonDelete}
                  {buttonEdit}
                </div>
              </li>});
    return (
      <div className="RecipeBox">
        <ul>  {recipeList} </ul>
      </div>

    );
  }
}

export default RecipeBox;
