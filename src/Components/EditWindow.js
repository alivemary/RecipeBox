import React from 'react';

class EditWindow extends React.Component {

  render () {
    console.log(this.props.isOpen);
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
    if (this.props.isOpen) {
      styleVisible = {
      	opacity: '1',
      	pointerEvents: 'auto'
      }
    }
    return (
      <div style={styleVisible} id='editWin' className='modalDialog'>
      <div>
      <a onClick={this.props.onClose} href="#close" title="Close" className="close">X</a>
      <h3>Edit Recipe</h3>
        <hr />
        <label htmlFor='title'>Recipe</label><br />
        <input style={styleTitle} id='title' type="text" /><br />
        <label htmlFor='ingrids'>Ingridients</label><br />
        <textarea style={styleIngrids} id='ingrids' type="text" />
        <hr />
        {buttonSave}
        {buttonClose}
        </div>
      </div>
    );
  }

}

export default EditWindow;
