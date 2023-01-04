function followingUsersReducer(state: any, action:any) {
  switch (action.type) {
    case 'set':
      return action.payload
    case 'clear':
      return []
    default:
      return
  }
}

export default followingUsersReducer