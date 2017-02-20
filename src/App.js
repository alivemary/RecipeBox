import React from 'react';
import './App.css';
import RecipeBox from './Components/RecipeBox'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Recipe Box!</h2>
        </div>
        <RecipeBox />
      </div>
    );
  }
}

export default App;
