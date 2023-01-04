interface Data {
  status: number
  message: string 
  data: {}|[]
}

export async function handleResponse(response: any) {
  let data: Data = {status: 0, message: '', data: {}}

  await response.then((res: any) => data = {
    status: res.status,
    message: res.data.message,
    data: res.data.data || {}
  })
  .catch((err: any) => data = {
    status: err.response?.status, 
    message: err.response?.data.message,
    data: {}
  })

  return data
}