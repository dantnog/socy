function userReducer(stateUser: any, action:any) {
  switch (action.type) {
    case 'setUser':
      delete action.payload.password
      return action.payload[0] || action.payload
    case 'updateList':
      return {...stateUser, followinglist: action.payload || []}
    case 'updateLikes':
      return {...stateUser, likeslist: action.payload || []}
    case 'clear':
      return {logged: false}
    default:
      return stateUser
  }
}

export default userReducer