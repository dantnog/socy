function formReducer(state: any, action: any) {
  switch (action.type) {
    case 'name':
      return {...state, name: action.payload}
    case 'email':
      return {...state, email: action.payload}
    case 'password':
      return {...state, password: action.payload}
    case 'confirm':
      return {...state, confirm: action.payload}
    default:
      return state
  }
}

export default formReducer