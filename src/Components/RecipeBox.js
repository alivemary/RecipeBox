import React from 'react';
import "./RecipeBox.css";
import Recipe from './Recipe';
import EditWindow from './EditWindow';

class RecipeBox extends React.Component {
  constructor (props) {
		super (props);
		this.state = {
      recipes: [
        {title: 'Spahetti', ingredients: ['pasta', 'tomato sause', 'meatballs'], classString: ''},
        {title: 'Pumpkin soup', ingredients: ['pumpkin', 'cream', 'water'], classString: ''},
        {title: 'Pizza', ingredients: ['tomato', 'cheese'], classString: ''}
      ],
      isModalOpen: false
		};

  }
  handleClick(index) {
    let current = this.state.recipes;
    current.forEach((e, i) => {
      e.classString = (i !== index) ? '' : (e.classString !== '') ? '' : 'active'
    });
    this.setState({recipes: current});
    this.saveToLocalStorage();
  }
  edit() {
    this.setState({isModalOpen: true});
  }
  add() {
    this.setState({isModalOpen: true});
  }
  delete() {
    //
  }
  close() {
    this.setState({isModalOpen: false});
  }
  saveToLocalStorage() {
    let JSONRecipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('RecipeBox', JSONRecipes);
  }
  getFromLocalStorage(){
    return JSON.parse(localStorage['RecipeBox']);
  }
  componentWillMount(){
    if (localStorage.getItem("RecipeBox") === null) {
         this.saveToLocalStorage();
    }
    else {
      let JSONRecipes = JSON.stringify(this.state.recipes);
      if (JSONRecipes !== localStorage['RecipeBox']) {
        this.setState({recipes: JSON.parse(localStorage['RecipeBox'])});

      }
    }
  }
  render() {
    var recipeList = this.getFromLocalStorage();
    console.log(recipeList);
    recipeList = recipeList.map((e, index) =>
    { return <li onClick={() => this.handleClick(index)} className='recipeItem' key={index}>
                {e.title}
                <div className={'recipeDetails '+e.classString}>
                  <Recipe ingredients={e.ingredients}/>
                  <a href='#editWin' className="button buttonDelete" type='button'>Delete</a>
                  <a onClick={() => this.edit()} className='button buttonEdit' type='button'>Edit</a>
                </div>
              </li>});
    return (
      <div className="RecipeBox">
        <ul>  {recipeList} </ul>
        <a onClick={() => this.add()}  className='button buttonAdd' type='button'>Add Recipe</a>
        <EditWindow isOpen={this.state.isModalOpen} onClose={() => this.close()}/>
      </div>

    );
  }
}

export default RecipeBox;
