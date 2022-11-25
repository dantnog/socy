import mongoose from 'mongoose'


mongoose.connect('mongodb://localhost:27017/socy', () => {
  console.log('CONNECTED TO MONGODB')
})

export default mongoose