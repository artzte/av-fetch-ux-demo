const server =require('node-http-server');
 
server.deploy({
  port: 8008,
}, serverReady);

server.onRequest = function(request, response, serve) {
  const { pathname, query } = request.uri;
  let body, statusCode;

  const path = pathname.substr(5);

  switch(path) {
    case 'success':
      body = { hello: 'Fetch success!' };
      statusCode = 200;
      break;

    case 'invalid':
      body = { error: 'You gave invalid params' };
      statusCode = 400;
      break;

    case 'nobody':
      body = null;
      statusCode = 503;
      break;

    default:
      body = { error: 'The thing was not found' };
      statusCode = 404;
      break;
  }

  response.statusCode = statusCode;
  console.log(pathname, statusCode, body);
  serve(request, response, body && JSON.stringify(body));

  return true;
};

function serverReady(server){
   console.log( `Server on port ${server.config.port} is now up`);
}
