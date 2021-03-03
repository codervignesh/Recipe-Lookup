import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import {Card} from 'react-bootstrap'
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import 'dotenv'

class RecipeSearch extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            imgLink: [],
            names: [],
            srcUrl: [],
            uri: []
        }
    }

    componentDidMount(){
        var searchBox = document.getElementById('search-focus')
        searchBox.addEventListener('keydown',(e) =>{
            if(e.keyCode === 13){
                document.getElementById('srch').click()
                window.location.reload()
                this.props.history.push(`/search/${e.target.value}`)
            }
        })

        var query = this.props.match.params.food
        const url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`
        fetch(url).then(response => response.json()).then(data =>{
            console.log(data)
            const imgs = []
            const name = []
            const uri = []
            const src = []
            for(var i=0;i<Object.keys(data.hits).length;i++){
                imgs.push(data.hits[i].recipe.image)
                name.push(data.hits[i].recipe.label)
                uri.push(data.hits[i].recipe.uri)
                src.push(data.hits[i].recipe.url)
            }
            console.log(src)
            this.setState({
                isLoaded: true,
                imgLink: imgs,
                names: name,
                srcUrl: src,
                uri: uri
            })
        })
    }

    

    render(){
        return(
            <div>
                <div className='pt-5'>
                    <h1 className='fnt p-2 mb-5 mt-5 text-light'>Search Results for &nbsp;<b>{this.props.match.params.food}</b></h1>
                    <h1 className='fnt p-2 mb-5 mt-5 text-light'>Results Loaded? &nbsp;<b>{this.state.isLoaded === true? 'Done': 'Not Yet'}</b></h1>                    
                    <div className="input-group">
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
                <div className='dsktp-srch mob-srch mx-auto'>
                    <div className='card-deck p-5 mr-auto'>
                    {this.state.isLoaded === true?
                    this.state.imgLink.map((value,index) =>{
                        return (
                            <div key={index} className=''> 
                            <Card className='mr-4 mb-5' style={{width: '200px', resizeMode: 'contain', height: '330px', borderRadius: '10px'}}>
                                <a href={this.state.srcUrl[index]} target = '_blank' rel = 'noreferrer' style = {{textDecoration: 'none'}}>
                                <Card.Img  src={this.state.imgLink[index]}></Card.Img>
                                <Card.Title className='fnt font-weight-bold text-center my-auto mx-auto text-dark'>{this.state.names[index]}</Card.Title>
                                </a>
                                <Card.Text className='text-right' style={{cursor: 'pointer'}} onClick={()=>{
                                    try{
                                        const db = firebase.firestore()
                                        db.collection('Users').doc(firebase.auth().currentUser.uid).get().then((snapshot) =>{
                                            if(snapshot.exists){
                                                console.log(snapshot.data().uid)
                                                db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Favourites').doc(this.state.uri[index].split('#')[1]).set({
                                                    uri: this.state.uri[index],
                                                    name: this.state.names[index],
                                                    img: this.state.imgLink[index],
                                                    src: this.state.srcUrl[index]
                                                }).then(() =>{
                                                    alert('Added to faourites')
                                                })
                                            }
                                        })
                                    }
                                    catch(e){
                                        console.log(firebase.auth().currentUser)
                                    }
                                }}>
                                    <i className='fa fa-bookmark' style={{color: 'red',fontSize: '25px'}}/>&nbsp;
                                </Card.Text>
                            </Card>
                            </div>
                        );
                    })
                    :
                    <h1 className="text-light text-bold">Loading...</h1>                    
                }
                </div>
                </div>
            </div>
        );
    }
}

export default RecipeSearch;