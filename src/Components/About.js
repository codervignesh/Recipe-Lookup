import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import cover from '../Assets/cover4.jpg'
import mobileCover from '../Assets/mob-abt.jpg'

class RecipeAbout extends Component{
    render(){
        return(
            <div className='fnt'>
                <div className='fnt img-chng'>
                    <img src={mobileCover} className='coverImg mobile-img' style={{flex: 1, backgroundSize: 'cover', backgroundPositionY: 'center', height: 'auto',width: '100%'}} alt='cover'></img>
                    <img src={cover} className='coverImg dsktp-img' style={{flex: 1, backgroundSize: 'cover', backgroundPositionY: 'center', height: 'auto',width: '100%'}} alt='cover'></img>
                </div>
                <div className='abt-cap'>
                    <h1 className='fnt text-light mx-auto text-center'>It's Recipe-lookup</h1>
                    <p className='fnt text-light text-center mx-auto'>Ever thought of having good food at home but dont know the recipe to cook</p>
                    <p className='fnt text-light text-center mx-auto'>Our Website is the place to know the recipe to cook</p>
                </div>
            </div>
        );
    }
}

export default RecipeAbout;