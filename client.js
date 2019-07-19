const grpc = require('grpc');
const routeguide = require('./routeguide');
const fs = require('fs');
var base64Img = require('base64-img');


const stub = new routeguide.RouteGuide(
    'localhost:3000', grpc.credentials.createInsecure());

console.log(stub);
// output: 
    // ServiceClient {
    //   '$interceptors': [],
    //   '$interceptor_providers': [],
    //   '$callInvocationTransformer': undefined,
    //   '$channel': Channel {} }

const ourNumber = {
  number: 5
};

// stub.numberToNumber(ourNumber, function(err, number) {
//   if (err) console.log(err);
//   // console.log(number, 'in client js');
// });




// stub.readFile();
const test = stub.readFile();
// console.log(test)

let allBuffers = [];

test.on('data', (result) => {
  ({path} = result);
  console.log('in here')

  test.write({path: 'OK'}, () => {
    console.log('OK wwas sent')
  })

  // console.log( result )
  allBuffers.push(path);
  // console.log(allBuffers.join())

  // fs.writeFile('clonePNG.png', allBuffers.join(), (err) => {
  //   if(err) console.log(err)
  //   console.log('DONE')
  // })

  // writeFileTest.on('finish', () => {
  //   base64Img.img(allBuffers.join(), './', 'decodedPNG.png', (err, filePath) => {
  //     if(err) console.log(err);
  //     console.log(filePath)
  //   })
  // })
  // console.log(allBuffers.join())

});

test.on('end', () => {
  let tester = allBuffers.join();
  console.log(tester)
  // tester = 'data:' + tester + ';base64,';
  // fs.writeFileSync('./TesterForValidity.txt', tester)
  // console.log(tester)
  base64Img.imgSync(tester, './', 'decodedJPG')
})




