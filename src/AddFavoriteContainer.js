import { connect } from 'react-redux'
import AddFavorite from './AddFavorite'

const mapStateToProps = (state, ownProps) => ({
  user: state.loggedinUser
})

export default connect(
  mapStateToProps
)(AddFavorite)