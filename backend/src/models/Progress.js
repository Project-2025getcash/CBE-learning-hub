/**
 * Progress Model
 * Schema for tracking student competency progress
 */

import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    // Relationships
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    competency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competency',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },

    // Progress Status
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed', 'mastered'],
      default: 'not-started',
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Performance Metrics
    score: Number,
    attempts: {
      type: Number,
      default: 0,
    },
    lastAttemptDate: Date,
    bestScore: Number,

    // Learning Data
    lessonsCompleted: {
      type: Number,
      default: 0,
    },
    assessmentsCompleted: {
      type: Number,
      default: 0,
    },
    averageScore: Number,

    // Timestamps
    startedAt: Date,
    completedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Unique index: one progress record per student per competency
progressSchema.index({ student: 1, competency: 1 }, { unique: true });
progressSchema.index({ course: 1, student: 1 });

export const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
