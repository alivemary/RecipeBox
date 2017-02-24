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
      modal: {isOpen: false, type: 'none', index: null}
		};
    this.save=this.save.bind(this);

  }
  handleClick(index) {
    let current = this.state.recipes;
    current.forEach((e, i) => {
      e.classString = (i !== index) ? '' : (e.classString !== '') ? '' : 'active'
    });
    this.mySetState({recipes: current});
  }
  edit(event, index) {
    let current = this.state.modal;
    current.isOpen = true;
    current.type = 'edit';
    current.index = index;
    this.setState({modal: current});
    event.stopPropagation();
    this.forceUpdate();
  }
  add() {
    this.setState({modal: {isOpen: true, type: 'add', index: null}});
  }
  delete(event, index) {
    let newRecipes = this.state.recipes;
    newRecipes = newRecipes.filter((item, i) => i !== index);
    this.mySetState({recipes: newRecipes});
    event.stopPropagation();
    this.forceUpdate();
  }
  close() {
    this.setState({modal: {isOpen: false, type: 'none', index: null}});
  }
  save(index, value, textarea) {
    let current = {};
    current.title = value;
    current.ingredients = textarea.split(', ');
    current.classString = 'active';
    let newRecipes = this.state.recipes;
    newRecipes.forEach((e) => {e.classString = ''});
    if (index !== null) {
      newRecipes[index] = current;
    }
    else {
      newRecipes.push(current);
    }
    this.mySetState({recipes: newRecipes, modal: {isOpen: false, type: 'none', index: null}});
  }
  saveToLocalStorage() {
    let JSONRecipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('RecipeBox', JSONRecipes);
  }
  mySetState(object) {
      this.setState(object, () => {this.saveToLocalStorage()});
  }
  getFromLocalStorage(){
    let recipesList = JSON.parse(localStorage['RecipeBox']);
    this.setState({recipes: recipesList});
  }
  componentWillMount(){
    if (localStorage.getItem("RecipeBox") === null) {
         this.saveToLocalStorage();
    }
    else {
      let JSONRecipes = JSON.stringify(this.state.recipes);
      console.log(this.state.recipes);
      if (JSONRecipes !== localStorage['RecipeBox']) {
        this.getFromLocalStorage();

      }
    }
  }

  render() {
    var recipeList = this.state.recipes;
    recipeList = recipeList.map((e, index) =>
    { return <li onClick={() => this.handleClick(index)} className='recipeItem' key={index}>
                {e.title}
                <div className={'recipeDetails '+e.classString}>
                  <Recipe ingredients={e.ingredients}/>
                  <a onClick={(event) => this.delete(event, index)}
                     className="button buttonDelete"
                     type='button'>Delete</a>
                  <a onClick={(event) => this.edit(event, index)}
                     className='button buttonEdit'
                     type='button'>Edit</a>
                </div>
              </li>});
    return (
      <div className="RecipeBox">
        <ul>  {recipeList} </ul>
        <a onClick={() => this.add()}  className='button buttonAdd' type='button'>Add Recipe</a>
        <EditWindow recipes={this.state.recipes}
                    modal={this.state.modal}
                    save={this.save}
                    onClose={() => this.close()} />
      </div>

    );
  }
}

export default RecipeBox;
