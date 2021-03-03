import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../Assets/logo.png'
import RecipeFavs from './Favourites'
import RecipeHome from './Home'
import RecipeAbout from './About'
import RecipeAccount from './Login'
import '../App.css';
import {Button as Btn} from '@material-ui/core';
import RecipeSearch from './Search';

class RecipeNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            isTop: true,
            user: 'Account'
        }
        this.onScroll = this.onScroll.bind(this);
    }
    
    componentDidMount(){
        document.addEventListener('scroll', () => {
          const isTop = window.scrollY < 300;
          if (isTop !== this.state.isTop) {
            this.onScroll(isTop);
          }
        });
    }
    
    onScroll(isTop) {
        this.setState({ isTop });
    }

    render() {
        return (
            <div className = "App" >
            <Router>
                <Route path='/' exact component={RecipeHome}></Route>
                <Route path='/about' exact component={RecipeAbout}></Route>
                <Route path='/account' component={RecipeAccount}/>
                <Route path='/favourites' component={RecipeFavs} />
                <Route path='/search/:food' component={RecipeSearch}></Route>
            <Navbar fixed="top"  collapseOnSelect expand='lg' variant={this.state.isTop?'dark':'dark'} bg={this.state.isTop?'':'white'}>
            <Navbar.Brand >
            <img
                alt=""
                src = {logo}
                width="50"
                height="32"
                className="d-inline-block align-top"
            />{' '}

            </Navbar.Brand>
            
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Link to='/'><Navbar.Brand>Recipe Lookup</Navbar.Brand></Link>                    
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item text-center">
                        <Link to='/' className={this.state.isTop ?"nav-link fnt text-light":"nav-link fnt text-dark"}>Home</Link>
                        </li>
                        <li className="nav-item text-center">
                        <Link to='/about' className={this.state.isTop ?"nav-link fnt text-light":"nav-link fnt text-dark"}>About Us</Link>
                        </li>
                        <li className="nav-item text-center">
                        <Link to='/favourites' className={this.state.isTop ?"nav-link fnt text-light":"nav-link fnt text-dark"}>Favourites</Link>
                        </li>
                    </ul>
                    <div className='d-flex justify-content-center'>
                    <Btn size='small' className="fnt" variant="contained" style={{backgroundImage: "linear-gradient(to top, #f2994a, #f2c94c)", color: 'white'}}>
                        <Link to='/account' className={this.state.isTop ?"fnt text-light":"fnt text-dark"} >{this.state.user}</Link> 
                    </Btn>
                    </div>
                </Navbar.Collapse>
            </Navbar>
            </Router>
        </div>
        );
    }
}

export default RecipeNav;