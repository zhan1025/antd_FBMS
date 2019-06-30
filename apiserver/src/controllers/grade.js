const GradeModel = require('../models/Grade');

/**
 * GET /api/grade
 * 获取班级列表
 */
const getGradeList = async (req, res, next) => {
  try {
    const gradeList = await GradeModel.find();
    res.send({ code: 0, msg: '获取班级列表成功', data: { list: gradeList } });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/grade
 * 新增班级
 */
const createGrade = async (req, res, next) => {
  const grade = new GradeModel({
    gradeName: req.body.gradeName
  });

  try {
    const existingGrade = await GradeModel.findOne({
      gradeName: req.body.gradeName
    });
    if (existingGrade) return res.send({ code: -1, msg: '班级已存在' });

    await grade.save();
    res.send({ code: 0, msg: '新增班级成功' });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/grade/:id
 * 删除班级
 */
const deleteGrade = async (req, res, next) => {
  const id = req.params.id;
  try {
    await GradeModel.deleteOne({ _id: id });
    res.send({
      code: 0,
      msg: '删除班级成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGradeList,
  createGrade,
  deleteGrade
};
