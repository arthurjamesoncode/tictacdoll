import mongoose from './index';

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  passwordHash: {type: String, required: true}
})

const User = mongoose.model('User', userSchema);

export default User;