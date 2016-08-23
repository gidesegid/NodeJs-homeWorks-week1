var http = require('http');
var url = require('url');
var fs = require("fs");


function onRequest(request,response){
    var requestUrl=url.parse(request.url,true);
    var querystring=requestUrl.query;
    var path;
   if(requestUrl.pathname=='/'){
       path=__dirname + '/index.html';
   }else{
    path=__dirname + '/'+requestUrl.pathname;
   }
   fs.readFile(path,'utf-8',function(error,data){
    if(error==null){
        if('name' in querystring && querystring.name !=''){
           data=data.replace(/\{name\}/g,'<strong>'+ querystring.name + '</strong>');
    } else{
         data=data.replace(/\{name\}/g,'<strong>name</strong>');
    }
    //response.writeHead(200,{"content-type":"text/html"})
    response.write(data);
    response.end();
    }
    else if(error.code='ENOENT'){
       // response.writeHead(404,{"content-type":"text/plain"});
        response.end();
    }
   })
}
http.createServer(onRequest).listen(8080);
console.log("server is running and it is saying that gide is a web developer");