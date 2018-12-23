import { connect } from 'react-redux'
import { setLoggedinUser } from './actions'
import App from './App'

const mapStateToProps = (state, ownProps) => ({
  loggedinUser: state.loggedinUser
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setLoggedinUser: (payload) => dispatch(setLoggedinUser(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)