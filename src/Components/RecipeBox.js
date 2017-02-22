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

  handleClick(event) {
    let allDetails = document.getElementsByClassName('recipeDetails');
    let target = event.target;
    let details = target.getElementsByClassName('recipeDetails')[0];
    for (let i=0; i<allDetails.length; i++){
      if (allDetails[i].id!==details.id) {allDetails[i].style.display='none'};
    }
    details.style.display === 'block'
    ? details.style.display = 'none'
    : details.style.display = 'block';
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
    let style = {
        display: 'none'
      }
    var recipeList = this.getFromLocalStorage();
    console.log(recipeList);
    var buttonDelete = <button className="buttonDelete" type='button'>Delete</button>;
    var buttonEdit = <button className='buttonedit' type='button'>Edit</button>;
    recipeList = recipeList.map((e, index) =>
    {  return <li onClick={this.handleClick} className='recipeItem' key={index}>
                {e.title}
                <div id ={'details'+index} className='recipeDetails' style={style}>
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
