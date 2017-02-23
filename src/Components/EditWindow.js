import React from 'react';

class EditWindow extends React.Component {

  render () {
    let buttonSave = <button className="buttonSave" type='button'>Save</button>;
    let buttonClose = <button className="buttonClose" type='button'>Close</button>;
    let styleTitle={
      width: '100%',
      height: '25px'
    }
    let styleIngrids = {
      width: '100%',
      height: '105px',
      resize: 'none'
    }
    let styleVisible = {
      opacity: '0'
    }
    if (this.props.data.modal.isOpen) {
      styleVisible = {
      	opacity: '1',
      	pointerEvents: 'auto'
      }
    }
    var value = '', textarea = '', windowTitle = 'Add Recipe';
    if (this.props.data.modal.type === 'edit') {
      var recipe = this.props.data.recipes[this.props.data.modal.index];
      value = recipe.title;
      textarea = recipe.ingredients.join(', ');
      windowTitle = 'Edit Recipe';
    }
    return (
      <div style={styleVisible} className='modalDialog'>
      <div>
      <a onClick={this.props.onClose} title="Close" className="close">X</a>
      <h3>{windowTitle}</h3>
        <hr />
        <label htmlFor='title'>Recipe</label><br />
        <input value={value} style={styleTitle} id='title' type="text" /><br />
        <label htmlFor='ingreds'>Ingredients</label><br />
        <textarea value={textarea} style={styleIngrids} id='ingreds' type="text" />
        <hr />
        {buttonSave}
        {buttonClose}
        </div>
      </div>
    );
  }

}

export default EditWindow;
