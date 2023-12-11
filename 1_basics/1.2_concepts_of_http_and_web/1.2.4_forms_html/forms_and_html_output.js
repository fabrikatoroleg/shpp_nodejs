var fs = require("fs");
// input data reading function
function readHttpLikeInput() {
    // var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }
    return res;
}
let contents = readHttpLikeInput();

// response output function
function outputHttpResponse(statusCode, statusMessage, headers, body) {
    let responseString = `HTTP/1.1 ${statusCode} ${statusMessage}\n`;
    for (const key in headers) {
        responseString += `${key}: ${headers[key]}\n`;
    }
    responseString += `\n${body}`;
    console.log(responseString);
}

// input data analysis function, result calculation
function processHttpRequest($method, $uri, $headers, $body) {
    const filePath = "./passwords.txt"
    let statusCode;
    let statusMessage;
    let responseHeaders = {
        // Date: new Date().toUTCString(),
        Server: 'Apache/2.2.14 (Win32)',
        'Content-Length': 0,
        Connection: 'Closed',
        'Content-Type': 'text/html; charset=utf-8',
    }
    let responseBody;
    if ($uri === "/api/checkLoginAndPassword" && $headers["Content-Type"] === 'application/x-www-form-urlencoded') {
        // information about the user's login and password
        let userInfoMatch = $body.match(/login=([\w]*)&password=([\w]*)/);
        if (userInfoMatch) {
            const receivedLogin = userInfoMatch[1];
            const receivedPassword = userInfoMatch[2];
            let fileExists = fs.existsSync(filePath);
            if (fileExists) {
                // Read username:password pairs from a file
                const userInfoFromFileBuffer = fs.readFileSync(filePath);
                const userInfoFromFile = userInfoFromFileBuffer.toString();
                const pairsLoginPassword = userInfoFromFile.split('\n');

                // Check each pair
                const found = pairsLoginPassword.some(pair => {
                    const [loginFromFile, passwordFromFile] = pair.split(':');
                    return receivedLogin === loginFromFile.trim() && receivedPassword === passwordFromFile.trim();
                });
                if (found) {
                    statusCode = 200;
                    statusMessage = "OK";
                    responseBody = '<h1 style="color:green">FOUND</h1>';
                } else {
                    statusCode = 401;
                    statusMessage = 'Unauthorized';
                    responseBody = 'unauthorized';
                }
            } else {
                statusCode = 500;
                statusMessage = 'Internal Server Error';
                responseBody = 'internal server error';
            }
        } else {
            statusCode = 400;
            statusMessage = 'Bad Request';
            responseBody = 'bad request';
        }
    } else {
        statusCode = 404;
        statusMessage = 'Not Found';
        responseBody = 'not found';
    }
    responseHeaders['Content-Length'] = responseBody.length;
    outputHttpResponse(statusCode, statusMessage, responseHeaders, responseBody);
}

// parsing function
function parseTcpStringAsHttpRequest(string) {
    // Split lines
    const lines = string.split('\n');
    // the method is indicated by capital letters before the first space
    const methodMatch = lines[0].match(/[A-Z]*(?=\s)/);
    const method = methodMatch ? methodMatch[0] : null;;
    // uri 
    const uriMatch = lines[0].match(/\/[a-zA-Z0-9\/.-]*/);
    const uri = uriMatch ? uriMatch[0] : null;;
    /* headers header_name: header_value
    header name any number of characters
    name and value separator ":"
    */
    const headers = {};
    for (let i = 1; i < lines.length; i++) {
        const headerMatch = lines[i].match(/^(.*?):\s*(.*?)$/);
        if (headerMatch) {
            const key = headerMatch[1];
            const value = headerMatch[2];
            headers[key] = value;
        }
    }
    // body according to the principle that the body comes after headers, which may not be there
    const bodyMatch = /(?:\r?\n\r?\n)([\s\S]*)$/.exec(string);;
    const body = bodyMatch ? bodyMatch[1].trim() : null;
    return {
        method: method,
        uri: uri,
        headers: formatObjectKeys(headers),
        body: body,
    };
    function formatObjectKeys(obj) {
        const formattedObj = {};
        for (const key in obj) {
            const formattedKey = key
                .split('-')
                .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word))
                .join('-');
            formattedObj[formattedKey] = obj[key];
        }
        return formattedObj;
    }
}

const http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);