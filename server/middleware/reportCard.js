const fs = require('file-system');
var db = require('../../database-mysql');

const writeReport = function(lectureId) {
  var report = '';
  db.getLectureData(lectureId).
  then((results) => {
    console.log(results);
    // for(var i = 0; i < results.length; i++) {
    //   console.log(results[i]);
    // }
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