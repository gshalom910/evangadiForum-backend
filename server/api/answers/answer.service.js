const pool = require("../../config/database");

module.exports = {
  answerQuestion: (data, callback) => {
    pool.query(
      `INSERT INTO Answer(answer,answer_code_block,question_id,user_id)VALUES(?,?,?,?)`,
      [data.answer, data.answerCodeBlock, data.questionId, data.id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  answerByQuestionId: (id, callback) => {
    //id is questionId
    pool.query(
      `SELECT answer_id, answer, answer_code_block, question_id, user_id, user_name FROM Answer LEFT JOIN Registration ON Answer.answer_id = Registration.user_id WHERE question_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};
