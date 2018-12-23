import React, { Component } from 'react';
import BlockButton from './BlockButton'
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

class AddFavorite extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      toggleButton: false
    };
  }

  handleChange = (event) => {
    this.setState({favoriteAs: event.target.value})
  };

  updateRealtime = () => {
    const {realtimeDb} = this.props;
    let currTime = new Date();
    realtimeDb.ref("detectedProcess").set(currTime.valueOf()).then(resp => console.log(resp))
  };

  addToFavorite = () => {
    const {db, restaurant, user} = this.props;
    const {favoriteAs} = this.state;
    const that = this;

    let restaurantRef = db.collection('favorites');
    restaurantRef.where('name', '==', favoriteAs).get()
    .then(snapshot => {
      if (snapshot.empty) {
        let newItem = {
          name: favoriteAs,
          owner: user,
          collaborator: [],
          restaurants: [restaurant]
        };
        restaurantRef.add(newItem).then(ref => {
          restaurantRef.doc(ref.id).update({id: ref.id}).then(resp => {
            that.updateRealtime();
            alert('Added to ' + favoriteAs)
          });
        })
        return;
      }  

      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        if(!doc.data().restaurants.includes(restaurant.id)){
          let updatedData = {
            restaurants: [...doc.data().restaurants, restaurant]
          }
          restaurantRef.doc(doc.id).update(updatedData).then(resp => {
            that.updateRealtime();
            alert('Added to ' + favoriteAs)
          });
        }
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
    this.toggleButton(false)
  };

  toggleButton = (bool) => {
    this.setState({toggleButton: bool})
  };
 
  render() {
    const {toggleButton} = this.state;

    return (
      toggleButton ?
      <React.Fragment>
        <input className="custom-input" type="text" onChange={this.handleChange}></input>
        <BlockButton
          style={{marginLeft: 6, marginBottom: 3}}
          label="Ok"
          onClick={this.addToFavorite} />
        <BlockButton
          style={{marginLeft: 6, marginBottom: 3}}
          label="Cancel"
          onClick={() => this.toggleButton(false)} />
      </React.Fragment> :
      <React.Fragment>
        <BlockButton
          style={{marginLeft: 6, marginBottom: 3}}
          label="Add To Collection"
          onClick={() => this.toggleButton(true)} />
      </React.Fragment>
    );
  }
}

export default AddFavorite;