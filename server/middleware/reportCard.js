const fs = require('file-system');
var db = require('../../database-mysql');

const writeReport = function(lectureId, callback) {
  var report = `Lecture ID: ${lectureId}\r\n`;
  report += `**************************************************************** \r\n`;
  db.getLectureData(lectureId).
  then((results) => {
    report += `Lecture Summary \r\n`;
    for(var i =1; i < results.length; i ++) {
      report += `
      Question # ${i}\r\n
      Average Thumb Data: ${results[i].average_thumb_question}\r\n
      # of A: ${results[i].answerA}\r\n
      # of B: ${results[i].answerB}\r\n
      # of C: ${results[i].answerC}\r\n
      # of D: ${results[i].answerD}\r\n
      # of E: ${results[i].answerE}\r\n
      `
    }
 
}).then(()=> {
  
  db.getChoiceData(lectureId)
    .then((choiceData) => {
      report += `**************************************************************** \r\n`;
      //console.log(choiceData)
      choiceData.forEach( (choice) => {
      report += ` USER CHOICE DATA: \r\n
      Question: ${choice.question_id}\r\n
      USER: ${choice.user_id} \r\n
      Answer: ${choice.answer}\r\n
      `
    });
  }).then(()=> {
     db.getThumbData(lectureId)
     .then((thumbData) => {
       report += `**************************************************************** \r\n`
       report += 'USER THUMB DATA: \r\n'
       thumbData.forEach( (thumb) => {
        `
        Question: ${thumb.question_id}\r\n
        USER: ${thumb.user_id} \r\n
        Answer: ${thumb.thumb_value}\r\n
        `
      });
      report += 'END'
      return report;
     }).then(()=>{
       console.log(report);
       callback(report);
       return report;
      //  fs.writeFile(`reports/lecture_${lectureId}.txt`, report, function(err){
      //     if(err){
      //       console.log(err);
      //     } else {
      //       console.log('Write File Functional');
      //     }
      //   })
     })
  })


})

    
}

module.exports.writeReport = writeReport;