const fs = require('file-system');
var db = require('../../database-mysql');

const writeReport = function(lectureId) {
  var report = `Lecture ID: ${lectureId}\n`;
  report += `**************************************************************** \n`;
  db.getLectureData(lectureId).
  then((results) => {
    report += `Lecture Summary \n`;
    for(var i =1; i < results.length; i ++) {
      report += `
      Question # ${i}\n
      Average Thumb Data: ${results[i].average_thumb_question}\n
      # of A: ${results[i].answerA}\n
      # of B: ${results[i].answerB}\n
      # of C: ${results[i].answerC}\n
      # of D: ${results[i].answerD}\n
      # of E: ${results[i].answerE}\n
      `
    }
 
}).then(()=> {
  report += `**************************************************************** \n`;
  db.getChoiceData(lectureId)
    .then((choiceData) => {
      //console.log(choiceData)
      choiceData.forEach( (choice) => {
      report += ` USER CHOICE DATA: \n
      Question: ${choice.question_id}\n
      USER: ${choice.user_id} \n
      Answer: ${choice.answer}\n
      `
    });
  }).then(()=> {
     db.getThumbData(lectureId)
     .then((thumbData) => {
       report += `**************************************************************** \n`
       thumbData.forEach( (thumb) => {
       report += `USER THUMB DATA: \n
       Question: ${thumb.question_id}\n
       USER: ${thumb.user_id} \n
       Answer: ${thumb.thumb_value}\n
      `
      report += 'END'
    });
     }).then(()=>{
       console.log(report);
     })
  })


})

    // fs.writeFile(`reports/lecture_${lectureId}.txt`, report, function(err){
    //   if(err){
    //     console.log(err);
    //   } else {
    //     console.log('Write File Functional');
    //   }
    // })
}

module.exports.writeReport = writeReport;