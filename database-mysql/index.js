var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'thumbscheck'
});


console.log(`db connection: DB_HOST localhost, DB_USERNAME root, DB_PASSWORD plantlife, DB_NAME thumbscheck`);


// exports.getVotes = function() {

// }

exports.getUserType = function(gmail) {
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT user_type FROM users WHERE gmail = "${gmail}"`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.createNewLecture = function(name) {
  return new Promise ((resolve, reject) => {
    pool.query(`INSERT INTO lectures (name) VALUES ("${name}")`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.deleteLecture = function(name) {
  return new Promise ((resolve, reject) => {
    pool.query(`DELETE FROM lectures where name = ("${name}")`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.lectureExists = function(lectureName) {
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT * FROM LECTURES WHERE NAME = ("${lectureName}")`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    })
  })
}

exports.createNewQuestion = function(lectureId) {
  return new Promise ((resolve, reject) => {
    pool.query(`INSERT INTO questions (lecture_id) VALUES ("${lectureId}")`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

/* Section
*/

exports.addAvgThumbForQuestion = function(questionId, avgThumbValue) {
  return new Promise ((resolve, reject) => {
    pool.query(`UPDATE questions SET average_thumb_question=${avgThumbValue} WHERE id=${questionId}`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.addAvgThumbForLecture = function(lectureId, avgThumbValue) {
  return new Promise ((resolve, reject) => {
    pool.query(`UPDATE lectures SET average_thumb_lecture=${avgThumbValue} WHERE id=${lectureId}`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.getAvgThumbsForQuestionsInLecture = function(lectureId) {
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT average_thumb_question FROM questions WHERE lecture_id=${lectureId}`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}


/* Section
*/

exports.createThumbData = function(gmail, questionId, thumbsValue) {
  return new Promise ((resolve, reject) => {
    pool.query(`INSERT INTO thumbs (user_id, question_id, thumb_value) VALUES ((SELECT id FROM users WHERE gmail="${gmail}"), ${questionId}, ${thumbsValue})`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.getUserId = function(gmail) {
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT id FROM users WHERE gmail = "${gmail}"`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}


exports.addStudent = function(first, last, gmail) {
  return new Promise ((resolve, reject) => {
    pool.query(`INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("${first}", "${last}", "${gmail}", "STUDENT");`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}
exports.addInstructor = function(first, last, gmail) {
  return new Promise ((resolve, reject) => {
    pool.query(`INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("${first}", "${last}", "${gmail}", "INSTRUCTOR");`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.UpdateRole = function(role, email) {
  return new Promise ((resolve, reject) => {
    pool.query(`UPDATE users SET user_type = "${role}" WHERE gmail = "${email}"`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

// test

/*
=======
/* Section
*/

exports.asyncTimeout = function(time, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let results = 'no callback';
      if (callback) {
        results = callback();
      }
      resolve(results);
    }, time || 1000);
  });
}

/* Test Functions

// 1
var prom1 = exports.getUserId('caaker.0@gmail.com');
prom1.then(results => {
  console.log(results[0].id);
});

//2
var prom2 = exports.createThumbData(4, 1, 5);
prom2.then(results => {
  console.log(results);
});

// 3
asyncTimeout(3000, function(){console.log('done')}).then(function(){console.log('continue')})

*/