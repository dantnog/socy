function allPostsReducer(state: any, action: any) {
  switch (action.type) {
    case 'set':
      return action.payload
    case 'clear':
      return {message: ''}
    default:
      return state
  }
}

export default allPostsReducer

