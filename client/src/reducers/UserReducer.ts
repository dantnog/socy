function userReducer(state: any, action:any) {
  switch (action.type) {
    case 'setUser':
      delete action.payload.password
      delete action.payload.__v
      return {...action.payload}
    case 'clear':
      return {logged: false}
    default:
      return
  }
}

export default userReducer