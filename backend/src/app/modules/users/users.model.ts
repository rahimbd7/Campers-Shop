import { model, Schema } from "mongoose";
import { IUser, IUserService } from "./users.interface";
import bcrypt from 'bcrypt'
import config from "../../config";



const userSchema = new Schema<IUser, IUserService>(
  {
    firebaseUid: { type: String, unique: true, sparse: true }, 
    // sparse ensures unique works only when field exists

    name: { type: String, required: true },

    email: { type: String, unique: true, sparse: true }, 
    // not required for Firebase logins (Google/Github), but unique if exists

    password: { type: String }, 
    // required only for manual login

    role: { type: String, enum: ["user", "admin"], default: "user" },

    contactNo: { type: String, unique: true, sparse: true },

    address: { type: String },

    isDeleted: { type: Boolean, default: false },

    profile_img: { type: String },

    provider: { type: String, enum: ["local", "firebase", "google", "github"], default: "local" },
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', async function (next) {
  const user = this
 if(user.password){
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
 }
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

userSchema.statics.isFirebaseUserExists = async function (firebaseUid: string) {
  return await UserModel.findOne({ firebaseUid });
};


userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

const UserModel = model<IUser, IUserService>('User', userSchema);
export default UserModel;