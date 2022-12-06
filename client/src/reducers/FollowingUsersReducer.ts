function followingUsersReducer(state: any, action:any) {
  switch (action.type) {
    case 'set':
      console.log(action.payload[0].followedUser)
      return [...action.payload[0].followedUser]
    case 'clear':
      return []
    default:
      return
  }
}

export default followingUsersReducer