import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: "Fullname is required",
    },
    username: {
      type: String,
      required: "Username is required",
      max: 25,
    },
    email: {
      type: String,
      required: "Email is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

export default mongoose.model("User", UserSchema);
