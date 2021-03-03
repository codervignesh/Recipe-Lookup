import React, { Component } from 'react';
import RecipeNav from './Components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
class App extends Component {
    render() {
        return (
        <div className='bgDark' style={{backgroundColor: 'black'}}>
            <RecipeNav/>
        </div>
        );
    }
}

export default App;