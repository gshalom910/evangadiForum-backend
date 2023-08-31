const pool = require("../../config/database");

module.exports = {
  addQuestion: (data, callback) => {
    pool.query(
      `INSERT INTO Question(question,question_description,question_code_block,tags,post_id,user_id)VALUES(?,?,?,?,?,?)`,
      [
        data.question,
        data.questionDescription,
        data.questionCodeBlock,
        data.tags,
        data.postId,
        data.id,
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  getAllQuestions: (callback) => {
    pool.query(
      `SELECT user_name, question,question_description,question_code_block,tags,post_id FROM Question JOIN Registration ON question.user_id = registration.user_id  ORDER BY question_id DESC`,
      [],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  questionById: (id, callback) => {
    //id is postId
    pool.query(
      `SELECT * FROM Question WHERE post_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
};
