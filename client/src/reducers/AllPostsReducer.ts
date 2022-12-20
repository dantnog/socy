function allPostsReducer(statePost: any, action: any) {
  switch (action.type) {
    case 'set':
      return action.payload
    case 'updateLikesLocal':
      // avoid calling the api
      return statePost.map((each: any) => {
        if (each._id === action.payload[0]) {
          if (action.payload[1] === 'add') {
            return {...each, likesCount: each.likesCount + 1}
          } else {
            return {...each, likesCount: each.likesCount - 1}
          }
        } else {
          return each 
        }
      })
    case 'updateCommentsLocal':
      // avoid calling the api
      return statePost.map((each: any) => {
        if (each._id === action.payload[0]) {
          if (action.payload[1] === 'add') {
            return {...each, commentsCount: each.commentsCount + 1}
          } else {
            return {...each, commentsCount: each.commentsCount - 1}
          }
        } else {
          return each 
        }
      })
    case 'clear':
      return {empty: true}
    default:
      return statePost
  }
}

export default allPostsReducer

