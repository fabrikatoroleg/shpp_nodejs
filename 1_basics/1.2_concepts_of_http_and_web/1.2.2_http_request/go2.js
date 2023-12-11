cd// input data reading function
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

let contents = readHttpLikeInput();

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));

// parsing function
function parseTcpStringAsHttpRequest(string) {
    // Split lines
    const lines = string.split('\n');
    // the method is indicated by capital letters before the first space
    const methodMatch = lines[0].match(/[A-Z]*(?=\s)/);
    const method = methodMatch ? methodMatch[0] : null;;
    // uri 
    const uriMatch = lines[0].match(/(\/[^\s]*)/);
    const uri = uriMatch ? uriMatch[0] : null;
    /* headers header_name: header_value
    header name any number of characters
    name and value separator ":"
    header value any characters in any number
    we do a global g, multi-line m search
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