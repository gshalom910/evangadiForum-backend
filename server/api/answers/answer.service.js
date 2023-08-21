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
      `SELECT answer_id, answer, answer_code_block, question_id, registration.user_id, registration.user_name FROM Answer LEFT JOIN Registration ON answer.user_id = registration.user_id WHERE answer.question_id = ?`,
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
