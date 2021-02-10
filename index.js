console.log('Loading function');

const aws = require('aws-sdk');
const fs = require('fs').promises;

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    try{
        // const data = await getData()
        // console.log(data)
        // const responseData = processData(data)
        // console.log(responseData)
        // return responseData
       
       const html = await fs.readFile("index.html", "utf8");
        const response = {
            statusCode: 200,
            headers: {
              'Content-Type': 'text/html',
            },
            body: html,
         };
       return response;
        
    } catch (err) {
        console.log(err);
        const message = 'Error getting objects from ';
        throw new Error(message);
    }
};


function getData(){
    var params = {
        Bucket: 'oai-demo.maps-dev.services.geo.ca', /* required */
        EncodingType: 'url'
    };
    return s3.listObjects(params).promise();
}

function processData(data){
     return new Promise((resolve, reject) => {
     let listings = `<h3>Object List from oai-demo.maps-dev.services.geo.ca bucket</h3>`;
     data.Contents.forEach((element, index, array) => {
         console.log(element.Key);
         listings += `<p><a href='http://oai-demo.maps-dev.services.geo.ca/${element.Key}'> ${element.Key} </a><p>`;
     })
     let startHTML = "<html><body></body>";
     let endHTML = "</body></html>";
     let html = startHTML + listings + endHTML;
     const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html',
        },
        body: html,
      };
     resolve(response)
     })
}