import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import {Card} from 'react-bootstrap'
import firebase from 'firebase';
import 'dotenv'

class RecipeFavs extends Component{
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
        firebase.auth().onAuthStateChanged((user) =>{
            console.log(user.uid)
            const uid = user.uid
            firebase.firestore().collection('Users').doc(uid).collection('Favourites').get().then((snapshot) =>{
                const imgs = []
                const name = []
                const src = []
                const uri = []
                snapshot.forEach(element => {
                    console.log(element.data())
                    imgs.push(element.data().img)
                    name.push(element.data().name)
                    src.push(element.data().src)
                    uri.push(element.data().uri)
                });
                this.setState({
                    imgLink: imgs,
                    names: name,
                    uri: uri,
                    srcUrl: src,
                    isLoaded: true
                })
            })
        })
    }

    render(){
        return(
            <div>
                <h1 className='fnt text-light' style={{paddingTop: '80px',paddingBottom: '80px', fontSize: '30px', textShadow: '2px 5px 5px', paddingLeft: '50px', fontWeight: '700'}}>Your Favourite Foods</h1>
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
                                                db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Favourites').doc(this.state.uri[index].split('#')[1]).delete().then(() =>{
                                                    alert('Deleted from your faourites')
                                                    window.location.reload()
                                                })
                                            }
                                        })
                                    }
                                    catch(e){
                                        console.log(firebase.auth().currentUser)
                                    }
                                }}>
                                    <i className='fa fa-trash' style={{color: 'red',fontSize: '25px'}}/>&nbsp;
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

export default RecipeFavs;