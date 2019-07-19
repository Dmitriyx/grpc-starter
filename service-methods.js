const path = require('path');
const fs = require('fs');
var base64Img = require('base64-img');


function numberPlusFive({number}) {
  console.log('in number plus five', number + 5);
  return {number: number + 5};
}

function numberToNumber(call, callback) {
  // console.log('inside of numberToNumber')
  // console.log('callback', callback)
  // console.log('call:', call)
  callback(null, numberPlusFive(call.request));
};


function readFile(call) {
  let filePath = path.join(__dirname + '/sampleJPG.jpg')
  // console.log(StreamZip)
  // console.log(call)
  // let readFile = fs.readFileSync(filePath);
  
  // let test = fs.createReadStream(filePath, {
  //   flags: 'r',
  //   // encoding: 'utf-8',
  //   fd: null,
  //   bufferSize: 1
  // });


  base64Img.base64(filePath, function(err, data) {
    if(err) console.log(err);
    console.log(data)
    call.write({path: data})
    call.end()
  })
  
  
  // let test = fs.createReadStream(filePath, {encoding: 'base64'});

  // test.on('data', (data) => {
  //     // console.log(data) 
  //     call.write({path: data}); 
  //     test.resume();
  //   })
    
  // test.on('end', () => {
  //   call.end(); // ending the stream here
  // })
  // test.end; // only ends when all data was read


}

module.exports = {numberToNumber, readFile} 