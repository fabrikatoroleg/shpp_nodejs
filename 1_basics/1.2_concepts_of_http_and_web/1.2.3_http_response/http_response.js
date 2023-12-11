// input data reading function
function readHttpLikeInput() {
    var fs = require("fs");
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
let contents = `GET /sum?nums=1,2,3 HTTP/1.1
Host: student.shpp.me`
contents = readHttpLikeInput();

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
    let statusCode;
    let statusMessage;
    let responseHeaders = {
        // Date: new Date().toUTCString(),
        Server: 'Apache/2.2.14 (Win32)',
        Connection: 'Closed',
        'Content-Type': 'text/html; charset=utf-8',
    }
    let responseBody;
    if (typeof $uri === 'string' && $uri.startsWith("/sum")) {
        const numsMatch = $uri.match(/\/sum\?nums=(\d+(?:,\d+)*)/);
        if ($method === "GET" && numsMatch) {
            // розрахувати сумму
            const numsArray = numsMatch[1].split(',').map(Number);
            const sum = numsArray.reduce((acc, num) => acc + num, 0);
            statusCode = 200;
            statusMessage = "OK";
            responseBody = sum.toString();
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
    const uriMatch = lines[0].match(/\/[^\s]*/);
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
