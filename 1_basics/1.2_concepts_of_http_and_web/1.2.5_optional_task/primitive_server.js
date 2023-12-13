const fs = require('fs');
const path = require('path');

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

const contents = readHttpLikeInput();

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    let responseString = `HTTP/1.1 ${statusCode} ${statusMessage}\n`;
    for (const key in headers) {
        responseString += `${key}: ${headers[key]}\n`;
    }
    responseString += `\n${body}`;
    console.log(responseString);
<<<<<<< HEAD
=======
    // console.log("Response String:");
    // console.log(responseString);
    // console.log("Expected Response String:");
    // console.log("HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nAccess Forbidden\n");
>>>>>>> 4b131f959749253850e8d114386247346df5533d
}

function processHttpRequest(method, uri, headers, body) {
    // We define the value of the header Host
    const hostHeader = headers['Host'];
    let filePath;
<<<<<<< HEAD
    if (pathEscapesHomeDirectory(uri)) {
=======
    if (/(\.\.(\/|\\|$))|([/\\]\.\.(\/|\\|$))/.test(uri)) {
>>>>>>> 4b131f959749253850e8d114386247346df5533d
        outputHttpResponse(403, 'Forbidden', { 'Content-Type': 'text/plain' }, 'Access Forbidden');
        return;
    }
    if (uri === "/") {
        uri = "/index.html";
        // We build the path to the file    
        filePath = path.join(__dirname, uri);
    } else {
        let subfolder = '';
        if (hostHeader && hostHeader.startsWith('student.shpp.me')) {
            subfolder = 'student';
        } else if (hostHeader && hostHeader.startsWith('another.shpp.me')) {
            subfolder = 'another';
        } else {
            subfolder = 'else';
        }
        filePath = path.join(__dirname, subfolder, uri);
    }
    fs.readFile(filePath, 'utf-8', (error, fileContent) => {
        if (error) {
            outputHttpResponse(404, 'Not Found', { 'Content-Type': 'text/plain' }, 'File not found');
        } else {
            outputHttpResponse(200, 'OK', headers, fileContent);
        }
    });
}

<<<<<<< HEAD
function pathEscapesHomeDirectory(uri) {
    const pathParts = uri.split('/');
    for (const pathPart of pathParts) {
        if (pathPart === '..') {
            return true;
        }
    }
    return false;
}

=======
>>>>>>> 4b131f959749253850e8d114386247346df5533d
function parseTcpStringAsHttpRequest(string) {
    const lines = string.split('\n');
    // the method is indicated by capital letters before the first space
    const methodMatch = lines[0].match(/[A-Z]*(?=\s)/);
    const method = methodMatch ? methodMatch[0] : null;;
    // uri 
    const uriMatch = lines[0].match(/\/[^\s]*/);
    const uri = uriMatch ? uriMatch[0] : null;;
    /*
    headers header_name: header_value
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