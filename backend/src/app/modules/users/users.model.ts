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


// Hash password before saving (only if modified and not already hashed)
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password && !this.password.startsWith('$2b$')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_round)
    );
  }
  next();
});

// Hash password before findOneAndUpdate (only if provided and not already hashed)
userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as Partial<IUser>;
  if (update.password && !update.password.startsWith('$2b$')) {
    update.password = await bcrypt.hash(
      update.password,
      Number(config.bcrypt_salt_round)
    );
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