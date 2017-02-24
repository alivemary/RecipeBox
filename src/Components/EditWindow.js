import React from 'react';

class EditWindow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      textarea: '',
      windowTitle: ''
    }

  }
  handleInputChange(event) {
    this.setState({value: event.target.value});
  }
  handleTextareaChange(event) {
    this.setState({textarea: event.target.value});
  }
  saveChanges(index, value, textarea){
    this.props.save(index, value, textarea);
  }
  componentWillReceiveProps(nextProps){
    let valueString = '', textareaString = '', windowTitleString = 'Add Recipe';
    if (this.props.modal.type === 'edit') {
      let recipe = this.props.recipes[this.props.modal.index];
      valueString = recipe.title;
      textareaString = recipe.ingredients.join(', ');
      windowTitleString = 'Edit Recipe';
    }
    this.setState({value: valueString, textarea: textareaString, windowTitle: windowTitleString});

  }
  render () {
    let buttonSave = <button onClick={this.saveChanges.bind(this, this.props.modal.index, this.state.value, this.state.textarea)} 
                    className="buttonSave" type='button'>Save</button>;
    let buttonClose = <button onClick={this.props.onClose} className="buttonClose" type='button'>Close</button>;
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
    if (this.props.modal.isOpen) {
      styleVisible = {
      	opacity: '1',
      	pointerEvents: 'auto'
      }
    }

    return (
      <div style={styleVisible} className='modalDialog'>
      <div>
      <a onClick={this.props.onClose} title="Close" className="close">X</a>
      <h3>{this.state.windowTitle}</h3>
        <hr />
        <label htmlFor='title'>Recipe</label><br />
        <input onChange={(event) => this.handleInputChange(event)} value={this.state.value} style={styleTitle} id='title' type="text" /><br />
        <label htmlFor='ingreds'>Ingredients</label><br />
        <textarea onChange={(event) => this.handleTextareaChange(event)} value={this.state.textarea} style={styleIngrids} id='ingreds' type="text" />
        <hr />
        {buttonSave}
        {buttonClose}
        </div>
      </div>
    );
  }

}

export default EditWindow;
