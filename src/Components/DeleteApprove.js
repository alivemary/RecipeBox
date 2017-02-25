import React from 'react';

class DeleteApprove extends React.Component {

  deleteItem(index){
    this.props.deleteItem(index);
  }
  render() {
    let styleVisible = {
      opacity: '0'
    }
    if (this.props.item.isOpen) {
      styleVisible = {
      	opacity: '1',
      	pointerEvents: 'auto'
      }
    }
    let title = (this.props.item.index !== null)
        ? this.props.recipes[this.props.item.index].title
        : '';
    return(
      <div style={styleVisible} className='modalDialog'>
        <div>
          <a onClick={this.props.onClose} title="Close" className="close">X</a>
          <h3>You are going to delete {title} recipe</h3>
          <button onClick={this.deleteItem.bind(this, this.props.item.index)} type='button'>Delete</button>
          <button onClick={this.props.onClose} type='button'>Cancel</button>
        </div>
      </div>
    );
  }
}

export default DeleteApprove;
