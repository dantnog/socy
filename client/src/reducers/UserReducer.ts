function reducer(state: any, action:any) {
  switch (action.type) {
    case 'setUser':
      delete action.data.password
      delete action.data.__v
      return {...action.data}
    case '':
    case '':
    default:
      return
  }
}

export default reducer