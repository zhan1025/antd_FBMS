const StudentModel = require("../models/Student");

/**
 * GET /api/student
 * 获取学生列表
 */
const getStudentList = async (req, res, next) => {
  const filter = {};
  const { gradeId, studentName } = req.query;
  const pageNum = parseInt(req.query.pageNum) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  if (gradeId) filter.gradeId = gradeId;
  if (studentName) filter.studentName = new RegExp(studentName);

  try {
    // 获取到的总数
    const studentTotal = await StudentModel.find(filter).countDocuments();
    const studentList = await StudentModel.find(filter)
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize)
      .sort({ _id: 1 })
      .populate("gradeId");

    res.send({
      code: 0,
      msg: "获取学生列表成功",
      data: { list: studentList, pageTotal: Math.ceil(studentTotal / pageSize) }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/student
 * 新增学生
 */
const addStudent = async (req, res, next) => {
  const student = new StudentModel(req.body);

  try {
    await student.save();
    res.send({ code: 0, msg: "新增学生成功" });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/student/:id
 * 删除学生
 */
const delStudent = async (req, res, next) => {
  const id = req.params.id;
  try {
    await StudentModel.deleteOne({ _id: id });
    res.send({ code: 0, msg: "删除学生成功" });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/student/:id
 * 修改学生信息
 */
const updStudent = async (req, res, next) => {
  const id = req.params.id;
  try {
    await StudentModel.updateOne({ _id: id }, req.body);
    res.send({ code: 0, msg: "修改学生信息成功" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudentList,
  addStudent,
  delStudent,
  updStudent
};
