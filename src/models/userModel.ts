import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name!'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please provide password!'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
