import React from 'react';

class Recipe extends React.Component {

  render(){
    let ingredientsList=this.props.ingredients.map((ingredient, index) => {
      return (<li key={index} className='ingredient'>{ingredient}</li>);
    });

    return(
      <ul>{ingredientsList}</ul>
    );
  }
}

export default Recipe;
