import { User } from "../models/user.model.js";

export const addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);

      if (movieAlreadyLiked) {
        return res.json({ message: "Movie is already in the list" });
      }

      try {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );

        return res.json({
          message: "Movie added successfully",
        });
      } catch (error) {
        return res.status(500).json({ message: "Error updating user" });
      }
    } else {
      await User.create({ email, likedMovies: [data] });

      return res.json({
        message: "Movie added successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error during adding movie to playlist",
    });
  }
};

export const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ message: "Liked Movies", movies: user.likedMovies });
    } else {
      return res.json({ message: "User not Found" });
    }
  } catch (error) {
    return res.json({
      succes: false,
      message: "Error occured when fetching Movies",
    });
  }
};

export const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);

      if (movieIndex === -1) {
        return res.status(400).send("Movie not found");
      }

      likedMovies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(user._id, { likedMovies }, { new: true });

      return res.json({ message: "Movie Deleted successfully", movies: likedMovies });
    } else {
      return res.status(400).send("User not found");
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error occurred when deleting Movies",
    });
  }
};
