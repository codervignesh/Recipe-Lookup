import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import firebase from 'firebase';
import cover from '../Assets/cover.jpg'
import cover2 from '../Assets/cover7.jpg'
import mobCover2 from '../Assets/mob-cover2.jpg'
import { Link } from 'react-router-dom';

class RecipeHome extends Component{
    constructor(props){
        super(props)
        this.state = {
            query: '',
            user: 'Account',
            isLogged: false
        }
    }

    componentDidMount(){
        try{
            if(firebase.auth().currentUser.uid !== null){
                this.setState({
                    isLogged: true,
                    user: firebase.auth().currentUser.displayName
                })
                console.log(firebase.auth().currentUser.displayName)
            }
        }
        catch(e){
            console.log(e)
        }
        var searchBox = document.getElementById('search-focus')
        searchBox.addEventListener('keydown',(e) =>{
            if(e.keyCode === 13){
                var submit = document.getElementById('srch')
                submit.click()
            }
        })
    }

    render(){
        return(
            <div>
                <div style={{backgroundColor: 'black'}} className='bgDark'>
                    <div className='fnt'>
                        <img src={cover} className='coverImg' alt='cover'></img>
                        {this.state.isLogged === false?
                            <div className='centered-dsktp'>
                                <h1 className="text-center caption-sub">Login To Your Recipe Lookup Account<br/></h1>
                                <p className="text-center caption-sub">To Save your Favourite Recipe<br/><br/></p>
                            </div>
                            :
                            <div className='centered-dsktp'>
                                <h1 className="text-center caption-sub">Welcome Back, {this.state.user}<br/></h1>
                            </div>
                        }
                    </div>
                    <div className='fnt'>
                        <img src={cover2} className='coverImg dsktp-img' alt='cover2'></img>
                        <img src={mobCover2} className='coverImg mobile-img' alt='cover2'></img>
                        {this.state.isLogged === false?
                            <div className='centered-mob'>
                                <h1 className="fnt text-center caption-head">Login To Your Recipe Lookup Account<br/></h1>
                                <p className="fnt text-center caption-head">To Save your Favourite Recipe<br/><br/></p>
                            </div>:
                            <div className='centered-mob'>
                                <h1 className="fnt text-center caption-head">Welcome Back, {this.state.user}<br/></h1>
                            </div>
                        }
                        <div className="input-group srch-box">
                            <div className="form-outline">
                                <input id="search-focus" onChange={(e)=>{
                                    this.setState({
                                        query: e.target.value
                                    })
                                }} type="search" className="form-control" />
                                <label className="form-label" >What's Your Favourite Food?</label>
                            </div>
                            <div>
                            <Link to={`/search/${this.state.query}`}>
                            <button type="button" id='srch' className="btn">
                                <i className="fa fa-search"></i>
                            </button>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeHome;