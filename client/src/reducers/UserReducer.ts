function userReducer(stateUser: any, action:any) {
  switch (action.type) {
    case 'setUser':
      delete action.payload.password
      return action.payload[0] || action.payload
    case 'updateList':
      return {...stateUser, followinglist: action.payload[0].followinglist[0].list || []}
    case 'updateLikes':
      console.log(action.payload)
      return {...stateUser, likeslist: action.payload[0].likeslist[0].list || []}
    case 'clear':
      return {logged: false}
    default:
      return stateUser
  }
}

export default userReducer