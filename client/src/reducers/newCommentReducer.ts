function newCommentReducer(state: any, action: any) {
  switch (action.type) {
    case 'set':
      return {comment: action.payload}
    case 'clear':
      return {comment: ''}
    default:
      return state
  }
}

export default newCommentReducer

