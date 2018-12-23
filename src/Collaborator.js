import React, { Component } from 'react';
import './App.css';
import BlockButton from './BlockButton'
var _ = require('lodash');

class CollaboratorList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      collaboratorInputText: [],
      collaboratorText: ''
    };
  }

  updateRealtime = () => {
    const {realtimeDb} = this.props;
    let currTime = new Date();
    realtimeDb.ref("detectedProcess").set(currTime.valueOf()).then(resp => console.log(resp))
  };

  deleteCollaborator = (item) => {
    const {db, favorite, collaborators} = this.props;
    let getItemIndex = favorite.collaborator.indexOf(item);

    collaborators[favorite.id].splice(getItemIndex, 1);
    let favoriteRef = db.collection('favorites');
    favoriteRef.doc(favorite.id).update({collaborator: collaborators[favorite.id]}).then(resp => {
      this.props.setCollaborator(favorite.id, collaborators[favorite.id]);
      this.updateRealtime();
    });
  };

  toggleCollaborator = (favoriteId, bool) => {
    this.setState({ collaboratorInputText: {[favoriteId]: bool} })
  };

  handleInputCollaborator = (event) => {
    this.setState({collaboratorText: event.target.value})
  };

  addCollaborator = () => {
    const {db, favorite, collaborators} = this.props;
    const {collaboratorText} = this.state;
    let newValue = [...collaborators[favorite.id], collaboratorText];
    let favoriteRef = db.collection('favorites');
    favoriteRef.doc(favorite.id).update({collaborator: newValue}).then(resp => {
      this.props.setCollaborator(favorite.id, newValue);
      this.toggleCollaborator(favorite.id, false);
      this.updateRealtime();
    });

  };

  render() {
    const {favorite, collaborators} = this.props;
    const {collaboratorInputText} = this.state;

    const renderCollaborator = () => {
      return collaborators[favorite.id].map((item, key) => 
        <BlockButton
          key={key}
          style={{marginLeft: 6, marginBottom: 3}}>
          <div style={{marginLeft: 5}}>
            <label>{item}</label>
          </div>
          <div style={{marginLeft: 5, marginRight: 5}} onClick={() => this.deleteCollaborator(item)}>
            <label>x</label>
          </div>
        </BlockButton>
      )
    };

    const renderAddCollaborator = () => {
      return (
        collaboratorInputText[favorite.id] ?
        <div style={{display: 'flex', alignItems: 'center', marginLeft: 4}}>
          <input className="custom-input" type="text" onChange={this.handleInputCollaborator} />
          <BlockButton
            style={{marginLeft: 6, marginBottom: 3}}
            label="Ok"
            onClick={this.addCollaborator} />
          <BlockButton
            style={{marginLeft: 6, marginBottom: 3}}
            label="Cancel"
            onClick={() => this.toggleCollaborator(favorite.id, false)} />
        </div>
        :
        <BlockButton
          style={{marginLeft: 6, marginBottom: 3}}
          onClick={() => this.toggleCollaborator(favorite.id, true)}>
          <div style={{marginLeft: 5}}>
            <label>+</label>
          </div>
          <div style={{marginLeft: 5, marginRight: 5}}>
            <label>Add Collaborator</label>
          </div>
        </BlockButton>
      )
    }

    return (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {_.isEmpty(collaborators) === false ? renderCollaborator() : null}
        {_.isEmpty(collaborators) === false ? renderAddCollaborator() : null}
      </div>
    );
  }
}

export default CollaboratorList;