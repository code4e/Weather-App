const http = require('http');
const fs = require('fs');
const port = 8500;
function requestHandler(req, res){
    console.log(req.url);
    fs.readFile('./index.html', (err, data) => {
        if(err){
            return res.end('<h1>Error!</h1>');
        }
        else{
            return res.end(data);
        }
    });
}
const server = http.createServer(requestHandler);
server.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log('Server is up at port: ', port);
    }
});
cont https = require('https');
