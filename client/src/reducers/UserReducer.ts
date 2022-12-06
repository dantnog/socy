function userReducer(state: any, action:any) {
  switch (action.type) {
    case 'setUser':
      return {...action.payload[0] || action.payload}
    case 'updateList':
      return {...state, followinglist: action.payload[0].followinglist[0].list || []}
    case 'clear':
      return {logged: false}
    default:
      return
  }
}

export default userReducer