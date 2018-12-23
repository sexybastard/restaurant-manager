import { connect } from 'react-redux'
import { setFavorites, addCollaborator, setCollaborator } from './actions'
import Collaborator from './Collaborator'

const mapStateToProps = (state, ownProps) => ({
  user: state.loggedinUser,
  favorites: state.favorites,
  collaborators: state.collaborators
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFavorites: (payload) => dispatch(setFavorites(payload)),
  addCollaborator: (key, payload) => dispatch(addCollaborator(key, payload)),
  setCollaborator: (key, payload) => dispatch(setCollaborator(key, payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collaborator)