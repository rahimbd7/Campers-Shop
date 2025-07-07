import { model, Schema } from "mongoose";
import { IUser, IUserService } from "./users.interface";
import bcrypt from 'bcrypt'
import config from "../../config";



const userSchema = new Schema<IUser, IUserService>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String,enum: ['user', 'admin'], default: 'user' },
  contactNo: { type: String, required: true },
  address: { type: String },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true
});


userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})
// Hash on findOneAndUpdate (e.g., findByIdAndUpdate)
userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as Partial<IUser>;
  if (update.password) {
    const hashed = await bcrypt.hash(
      update.password,
      Number(config.bcrypt_salt_round)
    );
    update.password = hashed;
    this.setUpdate(update);
  }
  next();
});


userSchema.statics.isUserExists = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

const UserModel = model<IUser, IUserService>('User', userSchema);
export default UserModel;