var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var db = require('../database-mysql');
var google = require('./middleware/googleAuth.js');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//var data = require('./middleware/thumbsData.js');

const port = 3000;

server.listen(port);

var lectureId = '';
var questionId = '';
var thumbs = '';
var instructorId = '';  // this will be the socket.id

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/googleLogin', (req, res) => {
  console.log('this is the req query for google', req.query.role);
  var googleResults;
  google.verifyToken(req.query.tokenId, '663612425604-5tilrctspqjau1je9hgkq9h725gpjbp1.apps.googleusercontent.com')
    .then(fromGoogle => {
      googleResults = fromGoogle;
      console.log('hi-----');
      return db.getUserType(fromGoogle.gmail);
    })
    .then(result => {
      console.log(result);
      if (result.length === 0) {
        //add user to db
        console.log(`add user to db, ${googleResults.gmail}`);
        if (req.query.role === 'STUDENT') {
          return db.addStudent(googleResults.first, googleResults.last, googleResults.gmail);
        }
        if (req.query.role === 'INSTRUCTOR') {
          return db.addInstructor(googleResults.first, googleResults.last, googleResults.gmail);
        }
      } else {
        db.UpdateRole(req.query.role, googleResults.gmail)
          .then(result => {
            res.status(200).send(result);
            throw ('early exit from promise chain');
          })
      }
    })
    .then(result => {
      console.log(result);
      return db.getUserType(googleResults.gmail);
    })
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      console.log(err);
    })
})

app.get('/FBlogin', (req, res) => {
  console.log('this is the query', req.query);
  db.getUserType(req.query.email)
    .then(result => {
      console.log(result);
      if (result.length === 0) {
        //add user to db
        console.log(`add user to db, ${req.query}`);
        if (req.query.role === 'STUDENT') {
          return db.addStudent(req.query.firstName, req.query.lastName, req.query.email);
        }
        if (req.query.role === 'INSTRUCTOR') {
          return db.addInstructor(req.query.firstName, req.query.lastName, req.query.email);
        }
      } else {
        db.UpdateRole(req.query.role, req.query.email)
          .then(result => {
            res.status(200).send(result);
            throw ('early exit from promise chain');
          })
      }
    })
    .then(result => {
      console.log(result);
      return db.getUserType(req.query.email);
    })
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      console.log(err);
    })
})

app.post('/lecture', (req, res) => {
  let name = req.query.name;
  db.createNewLecture(name)
    .then(results => {
      lectureId = results.insertId;
      res.send({ lectureId: lectureId });
      io.emit('lectureStarted', {
        lectureId: lectureId,
        lectureName: name
      })
    })
})

app.post('/checkthumbs', (req, res) => {
  let lecture = req.query.lecture_id;
  db.createNewQuestion(lecture)
    .then(results => {
      questionId = results.insertId;
      thumbs = new ThumbsData(lectureId, questionId);
      //Emit the new question to students here
      io.emit('checkingThumbs', { questionId: questionId });
      //This will add thumbsdata in the db after the question ends
      db.asyncTimeout(32000, () => {
        for (let student in thumbs.students) {
          //console.log(`${thumbs.students[student].gmail}, ${thumbs.questionId}, ${thumbs.students[student].thumbValue}`);
          db.createThumbData(thumbs.students[student].gmail, thumbs.questionId, thumbs.students[student].thumbValue);

        // after question ends
          //db query to find all specific votes

        }
        db.addAvgThumbForQuestion(questionId, thumbs.getAverageThumbValue());
      });
      //send the response to the teacher
      res.send({ questionId: questionId });
    })
})

app.post('/checkLectures', (req, res) => {
  let lecture = req.query.lectureName;
  db.lectureExists(lecture).
    then(result => {
      if (result.length > 0) {
        res.send('1');
      } else {
        res.send('0');
      }
    })
})

app.post('/endLecture', (req, res) => {
  let lecture = req.query.lectureId;
  // calculate the average for all thumbs in lecture
  // and store it in the database
  io.emit('lectureEnded', { response: 'ok' });

  db.getAvgThumbsForQuestionsInLecture(lectureId)
    .then(results => {
      console.log(results);
      let sum = 0;
      let avg = 0;
      for (let i = 0; i < results.length; i++) {
        sum += results[i].average_thumb_question;
      }
      avg = (sum / results.length);
      db.addAvgThumbForLecture(lectureId, avg);
    });
  res.status(200).send('end lecture');
});

io.on('connection', function (socket) {

  console.log(`socket: ${socket}`);
  //console.log(`rooms: ${socket._rooms}`);

  socket.on('lectureName', function (data) {
    socket.join(data.lecture);
    //console.log(io.sockets.adapter.rooms);
  })

  socket.on('changeLecture', function (data) {
    socket.leave(data.currentLecture);
    socket.join(data.newLecture);
  })

  //socket.join('Test Room');
  //put the gmail username on each socket that is connected
  socket.on('username', function (data) {
    console.log('username', data);
    socket.username = data.username;
  });

  socket.on('instructor', data => {
    instructorId = socket.id;
    socket.instructor = data.username;
    console.log(`the instructor is: ${socket.instructor}`);

  })

  //recieve the thumb value from the student
  socket.on('thumbValue', data => {
    if (thumbs) {
      if (!thumbs.hasStudent(socket.username)) {
        let student = new Student(socket.username, socket.id);
        thumbs.addStudent(student);
      }
      thumbs.setThumbValueForStudent(socket.username, data.thumbValue);
      //use getVotes and emit votes
      let votes = thumbs.getVotes();
      io.emit('thumbVotes', { thumbVotes: votes });
      console.log(`-----sending thumbVotes of ${votes}`);

      let average = thumbs.getAverageThumbValue();
      io.emit('averageThumbValue', { averageThumbValue: average });
      console.log(`sending averageThumbValue of ${average}`);
      console.log(`thumb value for ${socket.username} is ${data.thumbValue}`);
    }
  })
});

class ThumbsData {
  constructor(lectureId, questionId, instructor) {
    this.lectureId = lectureId;
    this.questionId = questionId;
    this.students = {};
    this.instructor = instructor;
  }

  //adds a student to the data structure
  addStudent(student) {
    this.students[student.gmail] = student;
  }

  //sets the thumb value for the student
  setThumbValueForStudent(gmail, thumbValue) {
    this.students[gmail].thumbValue = thumbValue;
  }

  //returns the average thumb value
  getAverageThumbValue() {
    let count = 0;
    let total = 0;
    for (let student in this.students) {
      if (this.students[student].thumbValue || this.students[student].thumbValue === 0) {
        count++;
        total += this.students[student].thumbValue;
      }
    }
    return total / count;
  }

  // returns student votes
  getVotes() {
    let thumb_e = 0;
    let thumb_d = 0;
    let thumb_c = 0;
    let thumb_b = 0;
    let thumb_a = 0;
    for (let student in this.students) {
      if (this.students[student].thumbValue === 0) {
        thumb_e++;
      } else if (this.students[student].thumbValue === 1) {
        thumb_d++;
      } else if (this.students[student].thumbValue === 2) {
        thumb_c++;
      } else if (this.students[student].thumbValue === 3) {
        thumb_b++;
      } else if (this.students[student].thumbValue === 4) {
        thumb_a++;
      }
    }
    return [thumb_e, thumb_d, thumb_c, thumb_b, thumb_a];
  }

  //check if a student is connected
  hasStudent(gmail) {
    return this.students.hasOwnProperty(gmail);
  }
}

class Student {
  constructor(gmail, socketId) {
    this.gmail = gmail;
    this.socketId = socketId;
    this.thumbValue = null;
  }
}
