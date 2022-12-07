import mongoose from '../db/conn'


const schema = new mongoose.Schema({
  user_id: {type: mongoose.Types.ObjectId, required: true},
  list: {type: [mongoose.Types.ObjectId], default: []}
},
{
  timestamps: true
})

const Likes = mongoose.model('Like', schema)

export default Likes