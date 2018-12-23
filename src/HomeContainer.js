import { connect } from 'react-redux'
import { setRestaurants } from './actions'
import Home from './Home'

const mapStateToProps = (state, ownProps) => ({
  restaurants: state.restaurants,
  user: state.loggedinUser
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setRestaurants: (payload) => dispatch(setRestaurants(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)