import mongoose, { set } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!videoId) throw new ApiError(400, "Video ID is required");

  const videoComments = await Comment.aggregate([
    {
      $match: { video: new mongoose.Types.ObjectId(videoId) },
    },
    {
      $project: {
        content: 1,
        owner: 1,
      },
    },
  ]);

  res
    .status(200)
    .json(
      new ApiResponse(200, videoComments, "Video Comments fetched successfully")
    );
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;

  if (!videoId) throw new ApiError(400, "Video ID is required");

  const { content } = req.body;

  if (!content) throw new ApiError(400, "Comment cannot be empty");

  const video = await Video.findById(videoId);
  if (!video)
    throw new ApiError(400, "Unable to fetch video with the provided video ID");

  const comment = await Comment.create({
    content,
    video,
    owner: req.user,
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, comment, "Comment added to the video successfully")
    );
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { commentId } = req.params;

  if (!commentId) throw new ApiError(400, "Comment Id required");

  const { content } = req.body;
  if (!content)
    throw new ApiError(400, "Comment to be updated cannot be empty");

  const updatedComment = await Comment.findByIdAndUpdate(commentId, {
    $set: {
      content,
    },
  });

  if (!updatedComment) throw new ApiError(400, "Failed to update the comment");

  res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;

  if (!commentId) throw new ApiError(400, "Comment Id required");

  await Comment.findByIdAndDelete(commentId);

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
