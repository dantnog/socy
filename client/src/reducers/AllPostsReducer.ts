function allPostsReducer(state: any, action: any) {
  switch (action.type) {
    case 'set':
      console.log(action.payload)
      return action.payload
    case 'clear':
      return {message: ''}
    default:
      return state
  }
}

export default allPostsReducer

