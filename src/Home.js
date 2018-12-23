import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import TimeInput from 'react-time-input';
import "react-datepicker/dist/react-datepicker.css";
import RestaurantList from './RestaurantList';
import FavoriteListContainer from './FavoriteListContainer';
import BlockButton from './BlockButton'

var _ = require('lodash');
const dayLibs = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class Home extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      selectedDate: new Date(),
      selectedTime: '00:00',
      restaurantList: {},
      favoriteList: [],
      filteredRestaurantList: []
    };

    this.getRestaurants();
  }

  getRestaurants = () => {
    const {db} = this.props;
    let restaurantRef = db.collection('restaurants');
    restaurantRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({ 
          restaurantList: {
            ...this.state.restaurantList,
            [doc.id]: doc.data()
          }
        }, () => this.inquiryRestaurant());
      });
    })
    .catch((error) => {
      console.log("Error getting restaurants: ", error);
    });
  };

  onDateChange = (selectedDate) => {
    console.log(selectedDate.getDay())
    this.setState({selectedDate}, () => {
      this.inquiryRestaurant();
    });
    console.log(this.state.restaurantList)
  };

  onTimeChange = (selectedTime) => {
    this.setState({selectedTime}, () => {
      this.inquiryRestaurant();
    })
  };

  inquiryRestaurant = () => {
    let selectedDay = dayLibs[this.state.selectedDate.getDay()];
    let filteredRestaurantList = _.filter(this.state.restaurantList, (x) => {
      console.log(selectedDay)
      if(x.schedules[selectedDay]){
        let isOvernight = x.schedules[selectedDay].hourStart > x.schedules[selectedDay].hourEnd ? true : false;
        
        if(isOvernight){
          return (x.schedules[selectedDay].hourStart <= this.state.selectedTime || x.schedules[selectedDay].hourEnd >= this.state.selectedTime)
        }
        else{
          return (x.schedules[selectedDay].hourStart <= this.state.selectedTime && x.schedules[selectedDay].hourEnd >= this.state.selectedTime)
        }
      }
      else{
        return false
      }
    });
    this.setState({ filteredRestaurantList })
    this.props.setRestaurants(filteredRestaurantList)
  };

  gotoInquiry = () => {
    this.setState({tab: 'INQUIRY'})
  };

  gotoFavorite = () => {
    this.setState({tab: 'FAVORITE'})
  };

  
 
  render() {
    const {db, realtimeDb, user, restaurants} = this.props;

    const renderInquiry = (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div>
            <label>Input date: </label>
            <DatePicker
              className="custom-input"
              selected={this.state.selectedDate}
              onChange={this.onDateChange} />
          </div>
          <div style={{ marginLeft: 20 }}>
            <label>Input time: </label>
            <TimeInput
              initTime={this.state.selectedTime}
              ref="TimeInputWrapper"
              className='form-control custom-input'
              mountFocus='true'
              onTimeChange={this.onTimeChange} />
          </div>
        </div>
        <div style={{marginTop: 10}}>
          <RestaurantList data={restaurants} db={db} realtimeDb={realtimeDb} user={user} />
        </div>
      </React.Fragment>
    )

    const renderFavorite = <FavoriteListContainer db={db} realtimeDb={realtimeDb} />

    const renderContent = () => {
      let content;
      switch(this.state.tab){
        case 'INQUIRY':
          content = renderInquiry
          break;
        case 'FAVORITE':
          content = renderFavorite
          break;
        default:
          content = renderInquiry
      }

      return content;
    }

    return (
      <div style={{width: '75%', margin: '0 auto'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <BlockButton
            style={{marginLeft: 6, marginBottom: 3}}
            label="INQUIRY"
            onClick={this.gotoInquiry} />
          <BlockButton
            style={{marginLeft: 6, marginBottom: 3}}
            label="COLLECTION"
            onClick={this.gotoFavorite} />
        </div>
        <div style={{marginTop: 30}}>
          {renderContent()}
        </div>
      </div>
    );
  }
}

export default Home;