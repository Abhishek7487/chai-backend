import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //TODO: create playlist

  if (!name) throw new ApiError(400, "Name of the playlist is required");

  const createdPlaylist = await Playlist.create({
    name,
    description: description || "",
    owner: req.user,
  });

  if (!createPlaylist)
    throw new ApiError(500, "Something went wrong while creating a playlist");

  return res
    .status(200)
    .json(
      new ApiResponse(200, createdPlaylist, "Playlist created successfully")
    );
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists

  if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid user id");

  console.log(userId);

  const userPlaylists = await Playlist.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
  ]);

  if (userPlaylists.length < 1) throw new ApiError(404, "No playlist found");

  return res
    .status(200)
    .json(
      new ApiResponse(200, userPlaylists, "User playlists fetched successfully")
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id

  if (!playlistId) throw new ApiError(400, "Playlist Id is required");

  if (!isValidObjectId(playlistId))
    throw new ApiError(400, "Invalid playlist id");

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) throw new ApiError(400, "Playlist not found");

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video id");

  if (!isValidObjectId(playlistId))
    throw new ApiError(400, "Invalid playlist id");

  const currentVideo = await Video.findById(videoId);

  const isVideoInPlaylist = await Playlist.findOne({
    videos: currentVideo,
  });

  if (isVideoInPlaylist)
    throw new ApiError(400, "Video is already in the playlist");

  const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, {
    $push: { videos: currentVideo },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Video added to playlist"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist

  if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video id");

  if (!isValidObjectId(playlistId))
    throw new ApiError(400, "Invalid playlist id");

  const currentVideo = await Video.findById(videoId);

  const isVideoInPlaylist = await Playlist.findOne({
    videos: currentVideo,
  });

  if (!isVideoInPlaylist)
    throw new ApiError(400, "Video not found in playlist");

  const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, {
    $pull: { videos: currentVideo._id },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Video removed from playlist"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist

  if (!isValidObjectId(playlistId))
    throw new ApiError(400, "Invalid playlist id");

  await Playlist.findByIdAndDelete(playlistId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist

  if (!isValidObjectId(playlistId))
    throw new ApiError(400, "Invalid playlist id");

  if (!name && !description) throw new ApiError(400, "Update fields are empty");

  const currentPlaylist = await Playlist.findById(playlistId);

  let updateDoc = {};

  if (name && name !== currentPlaylist.name) {
    updateDoc.name = name;
  }

  if (description && description !== currentPlaylist.description) {
    updateDoc.description = description;
  }

  if (Object.keys(updateDoc).length > 0) {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $set: updateDoc },
      { new: true }
    );

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedPlaylist, "Playlist updated successfully")
      );
  } else {
    throw new ApiError(400, "No changes detected");
  }
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
