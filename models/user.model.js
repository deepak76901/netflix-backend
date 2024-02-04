import { Schema, model } from "mongoose";

const movieDataSchema = new Schema({
  id: Number,
  name: String,
  image: String,
  genres: {
    type: [String],
  },
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: [50, "Maximum characters is 50"],
  },

  likedMovies: [{ type: movieDataSchema }],
});

export const User = model("User", userSchema);
