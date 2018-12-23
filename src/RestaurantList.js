import React from 'react'
import AddFavoriteContainer from './AddFavoriteContainer'

const RestaurantList = ({data, db, realtimeDb, user}) => {
  const renderItem = (item, key) => {
    return (
      <div key={key} style={{display: 'flex', border: '1px solid black'}}>
        <div style={{display: 'flex', flex: 5, flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 10, paddingBottom: 10, paddingLeft: 15}}>
          <div style={{display: 'flex'}}>
            <label style={{fontWeight: 'bold'}}>{item.name}</label>
          </div>
          <div style={{display: 'flex'}}>
            <label style={{fontSize: 14}}>{item.scheduleText}</label>
          </div>
        </div>
        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingRight: 15}}>
          <AddFavoriteContainer db={db} realtimeDb={realtimeDb} restaurant={item} />
        </div>
      </div>
    )
  }

  return (
    <div style={{border: '2px solid black'}}>
      {
        data.length > 0 ?
        data.map((item, key) => renderItem(item, key)) :
        <label>No restaurant open</label>
      }
    </div>
  );
}

export default RestaurantList;