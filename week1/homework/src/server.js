let http = require("http");

let port = 9000;

function getHome( req , resp ){
    resp.writeHead( 200 , {"Content-Type":"text/html"});
    resp.write('<html><head><title>Home</title></head><body><h1>Welcome to my first node js server</h1></body></html>');
    resp.end();
}

function getState( req , resp , stateNum , stateStr ){
    
    resp.writeHead( 200  , {"Content-Type":"text/html"});
    resp.write(`<html><head><title>${stateStr}</title></head><body>${stateNum}: ${stateStr}!  Go to  <a href="/">Home page</a></body></html>`);
    resp.end();
}


function get404( req , resp){
    resp.writeHead( 404 , "Resource Not Found" , {"Content-Type":"text/html"});
    resp.write('<html><head><title>404</title></head><body>404: Resource not found.  Go to  <a href="/">Home page</a></body></html>');
    resp.end();
};


function get405( req , resp){
    resp.writeHead( 405 , "Method not supported" , {"Content-Type":"text/html"});
    resp.write('<html><head><title>404</title></head><body>405: Method not supported.  Go to  <a href="/">Home page</a></body></html>');
    resp.end();
};

function newServer(){
    let state = 10;
    http.createServer( function( req , resp) {

        switch (req.method) {
            case "GET" :{
                if( req.url ==='/' ){
                    getHome( req , resp);
                }
                else if(req.url ==='/state'){getState( req , resp , state , 'state' );}
                else if(req.url ==='/add'){ ++state; getState(  req , resp , state , 'add ' );}
                else if(req.url ==='/subtract'){ --state; getState( req , resp , state , 'subtract ' );}
                else if(req.url ==='/reset'){ state = 10; getState( req , resp , state , 'reset ' );}
                
                else {
                    get404( req , resp);
                }
                break;
    
                } 
            case "POST" : 
                get405( req , resp);
                break;
            default:
                get405( req , resp);
                break;
        }
    
    } ).listen(port)
}

module.exports.createServer = newServer();
