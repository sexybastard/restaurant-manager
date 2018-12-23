import React, { Component } from 'react';
import CollaboratorContainer from './CollaboratorContainer'
import './App.css';
import BlockButton from './BlockButton'
var _ = require('lodash');

class FavoriteList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      toggleEdit: []
    };

    this.getFavorites();
    const that = this;
    const {realtimeDb} = this.props
    var starCountRef = realtimeDb.ref('detectedProcess');
    starCountRef.on('value', function(snapshot) {
      that.getFavorites();
    });
  }

  updateRealtime = () => {
    const {realtimeDb} = this.props;
    let currTime = new Date();
    realtimeDb.ref("detectedProcess").set(currTime.valueOf()).then(resp => console.log(resp))
  };

  getFavorites = (callback) => {
    const {db, user, setCollaborator} = this.props;
    let favoriteRef = db.collection('favorites');
    let favoriteList = [];

    favoriteRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if(doc.data().owner === user || doc.data().collaborator.includes(user)){
          favoriteList.push(doc.data())
          setCollaborator(doc.data().id, doc.data().collaborator)
        }
      });
      this.props.setFavorites(favoriteList);
      if(typeof callback === 'function'){
        callback();
      }
    })
    .catch((error) => {
      console.log("Error getting favorites: ", error);
    });
  };

  handleRemove = (item, favoriteKey, favorite) => {
    const {db} = this.props;
    let newList = _.filter(favorite.restaurants, (x) => {
      return item.id !== x.id
    });
    let favoriteRef = db.collection('favorites');
    favoriteRef.doc(favoriteKey).update({restaurants: newList}).then(resp => {
      // this.getFavorites();
      this.updateRealtime();
    });
  };

  handleEdit = (key) => {
    const {db} = this.props;
    let favoriteRef = db.collection('favorites');
    favoriteRef.doc(key).update({name: this.state.newName}).then(resp => {
      // this.getFavorites(() => this.toggleEdit(key, false));
      this.toggleEdit(key, false)
      this.updateRealtime();
    });
  };

  toggleEdit = (key, bool) => {
    this.setState({ toggleEdit: {[key]: bool} })
  };

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  };

  render() {
    const {favorites, user, db, realtimeDb} = this.props;
    const {toggleEdit} = this.state;

    const renderRestaurant = (item, index, favoriteKey, favorite) => {
      return <div key={index} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, borderStyle: 'solid', borderWidth: 1, borderColor: 'black', borderRadius: 5, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, paddingLeft: 10, paddingRight: 10}}>
        <label>{item.name}</label>
        <BlockButton
          style={{marginLeft: 6}}
          label="Remove"
          onClick={() => this.handleRemove(item, favoriteKey, favorite)} />
      </div>
    }

    const renderFavorite = (favorite, key) => {
      return (
        <div key={key} style={{display: 'flex', justifyContent: 'flex-start', border: '1px solid black', flexDirection: 'column', paddingBottom: 20}}>
          <div style={{marginBottom: 10}}>
            { 
              toggleEdit[key] ? 
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: 45}}>
                <input className="custom-input" style={{marginBottom: 2}} type="text" onChange={this.handleNameChange} />
                <BlockButton
                  style={{marginLeft: 6, marginBottom: 3}}
                  label="Ok"
                  onClick={() => this.handleEdit(key)} />
                <BlockButton
                  style={{marginLeft: 6, marginBottom: 3}}
                  label="Cancel"
                  onClick={() => this.toggleEdit(key, false)} />
              </div>: 
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: 45}}>
                <label style={{fontSize: 24, fontWeight: 'bold'}}>{favorite.name}</label>          
                <BlockButton
                  style={{marginLeft: 6, marginBottom: 3}}
                  label="Edit"
                  onClick={() => this.toggleEdit(key, true)} />
              </div>
            }
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 4}}>
              <label style={{fontSize: 14}}>Collaborators:</label>
            </div>
            <CollaboratorContainer favorite={favorite} user={user} db={db} realtimeDb={realtimeDb} />
          </div>
          {
            favorite.restaurants.map((item, index) => {
              return renderRestaurant(item, index, key, favorite)
            })
          }
        </div>
      )
    }

    return (
      <div style={{border: '2px solid black'}}>
        {
          favorites.length > 0 ?
          favorites.map((item, index) => renderFavorite(item, item.id)) :
          <label>No favorite</label>
        }
      </div>
    );
  }
}

export default FavoriteList;