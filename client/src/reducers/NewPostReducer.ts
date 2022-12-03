function newPostReducer(state: any, action: any) {
  switch (action.type) {
    case 'message':
      return {message: action.payload}
    case 'clear':
      return {message: ''}
    default:
      return state
  }
}

export default newPostReducer
