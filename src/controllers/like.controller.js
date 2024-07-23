import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video

  if (!isValidObjectId(videoId))
    throw new ApiError(400, "Failed to like the video");

  let newCollection;

  const isVideoLiked = (
    await Like.aggregate([
      {
        $match: { likedBy: req.user._id },
      },
      {
        $match: { video: new mongoose.Types.ObjectId(videoId) },
      },
    ])
  ).length;

  if (isVideoLiked) {
    const currentCollection = await Like.aggregate([
      {
        $match: { likedBy: req.user._id },
      },
      {
        $match: { video: new mongoose.Types.ObjectId(videoId) },
      },
    ]);
    await Like.findByIdAndDelete(currentCollection[0]._id);

    return res.status(200).json(new ApiResponse(200, {}, "Video unliked"));
  } else {
    newCollection = await Like.create({
      video: videoId,
      likedBy: req.user,
    });

    if (!newCollection) throw new ApiError(400, "Filed to like the video");

    res.status(200).json(new ApiResponse(200, newCollection, "Video liked"));
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment

  if (!isValidObjectId(commentId))
    throw new ApiError(400, "Failed to like the comment");

  let newCollection;

  const isCommentLiked = (
    await Like.aggregate([
      {
        $match: { likedBy: req.user._id },
      },
      {
        $match: { comment: new mongoose.Types.ObjectId(commentId) },
      },
    ])
  ).length;

  if (isCommentLiked) {
    const currentCollection = await Like.aggregate([
      {
        $match: { likedBy: req.user._id },
      },
      {
        $match: { comment: new mongoose.Types.ObjectId(commentId) },
      },
    ]);

    await Like.findByIdAndDelete(currentCollection[0]._id);

    return res.status(200).json(new ApiResponse(200, {}, "Comment unliked"));
  } else {
    newCollection = await Like.create({
      comment: commentId,
      likedBy: req.user,
    });

    if (!newCollection) throw new ApiError(400, "Filed to like the comment");

    res.status(200).json(new ApiResponse(200, newCollection, "Comment liked"));
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet

  if (!isValidObjectId(tweetId))
    throw new ApiError(400, "Failed to like the tweet");

  let newCollection;

  const isTweetLiked = (
    await Like.aggregate([
      {
        $match: { likedBy: req.user._id },
      },
      {
        $match: { tweet: new mongoose.Types.ObjectId(tweetId) },
      },
    ])
  ).length;

  if (isTweetLiked) {
    const currentCollection = await Like.aggregate([
      {
        $match: { likedBy: req.user._id },
      },
      {
        $match: { tweet: new mongoose.Types.ObjectId(tweetId) },
      },
    ]);

    await Like.findByIdAndDelete(currentCollection[0]._id);

    return res.status(200).json(new ApiResponse(200, {}, "Tweet unliked"));
  } else {
    newCollection = await Like.create({
      tweet: tweetId,
      likedBy: req.user,
    });

    if (!newCollection) throw new ApiError(400, "Filed to like the tweet");

    res.status(200).json(new ApiResponse(200, newCollection, "Tweet liked"));
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos

  const likedVideos = await Like.find({
    video: { $exists: true, $ne: null },
    likedBy: req.user._id,
  }).populate("video");

  if (likedVideos.length === 0)
    throw new ApiError(404, "You haven't liked any video");

  res
    .status(200)
    .json(
      new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
