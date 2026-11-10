// In-memory test of the server request handler without network sockets
const { EventEmitter } = require('events');
const server = require('./server');

function testEndpoint(url, expectedStatus, expectedContentType, expectedContentSubstr) {
  return new Promise((resolve, reject) => {
    const req = new EventEmitter();
    req.url = url;
    req.method = 'GET';

    const res = new EventEmitter();
    let statusCode = null;
    let headers = {};
    let body = '';

    res.writeHead = function(status, h) {
      statusCode = status;
      headers = h || {};
    };

    res.end = function(chunk) {
      if (chunk) body += chunk.toString();
      
      console.log(`Testing [${url}] -> Status: ${statusCode}, Content-Type: ${headers['Content-Type']}`);
      
      if (statusCode !== expectedStatus) {
        return reject(new Error(`Expected status ${expectedStatus} but got ${statusCode}`));
      }
      if (expectedContentType && !headers['Content-Type'].includes(expectedContentType)) {
        return reject(new Error(`Expected Content-Type containing ${expectedContentType} but got ${headers['Content-Type']}`));
      }
      if (expectedContentSubstr && !body.includes(expectedContentSubstr)) {
        return reject(new Error(`Body does not contain ${expectedContentSubstr}`));
      }
      resolve();
    };

    server.emit('request', req, res);
  });
}

async function runTests() {
  try {
    await testEndpoint('/', 200, 'text/html', 'Bambookart');
    console.log('✓ Root route (/) served index.html correctly');

    await testEndpoint('/index.html', 200, 'text/html', 'Bambookart');
    console.log('✓ /index.html served correctly');

    await testEndpoint('/css/style.css', 200, 'text/css', '--green-primary');
    console.log('✓ /css/style.css served correctly');

    await testEndpoint('/js/app.js', 200, 'application/javascript', 'AppState');
    console.log('✓ /js/app.js served correctly');

    await testEndpoint('/assets/images/logo.svg', 200, 'image/svg+xml', '<svg');
    console.log('✓ /assets/images/logo.svg served correctly');

    await testEndpoint('/assets/images/winnowing-basket.svg', 200, 'image/svg+xml', '<svg');
    console.log('✓ /assets/images/winnowing-basket.svg served correctly');

    console.log('\n🌟 ALL IN-MEMORY SERVER ENDPOINT TESTS PASSED!');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

runTests();
