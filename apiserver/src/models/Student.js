/**
 * 学生模块
 */
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    gradeId: { type: String, required: true, ref: 'Grade' },
    gender: { type: Number, default: 1 },
    gravatar: { type: String }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Student', studentSchema);
