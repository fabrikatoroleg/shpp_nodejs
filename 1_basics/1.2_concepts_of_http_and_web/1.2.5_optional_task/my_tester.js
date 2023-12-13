if (process.argv.length != 4) {
    console.log(process.argv)
    console.log("usage: node tester.js <tasknum> <path/to/taskN.js>\nexample: node tester.js 1 t1.js\n");
    process.exit(1);
}

const inputs = {
    1: `GET / HTTP/1.1
Host: student.shpp.me
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0

`,
    2: `GET  /hey/text.txt  HTTP/1.1
Host: student.shpp.me
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0

`,
    3: `GET  /hey/hello.html  HTTP/1.1
Host: another.shpp.me
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0
    
`,
    4: `GET /hey/hello.html HTTP/1.1
Host: else.shpp.me
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0

`,

    5: `GET /../student/hey HTTP/1.1
Host: student.shpp.me
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0
`,

}

// =============================================== ANSWERS
answers = {
    1: `HTTP/1.1 200 OK
Host: student.shpp.me
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate    
User-Agent: Mozilla/4.0

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">        
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index Page</title>
</head>

<body>
    <p>Please do it yourself</p>
</body>

</html>`,
    2: `HTTP/1.1 200 OK
Host: student.shpp.me
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0

Hello, student`,
    3: `HTTP/1.1 200 OK
Host: another.shpp.me
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0
    
<link href="https://getbootstrap.com/docs/4.0/dist/css/bootstrap.min.css" rel="stylesheet">
<div class="text-center cover-container d-flex h-100 flex-column">
    <header class="mb-auto inner"></header>
    <main class="inner cover">
        <h1 class="cover-heading">Привіт це заголовок.<br /></h1>
        <a href="#" class="lead btn btn-lg btn-secondary">Ця кнопка не працює :)</a>
    </main>
    <footer class="mt-auto inner" />
</div>`,
    4: `HTTP/1.1 404 Not Found
Content-Type: text/plain

File not found`,

    5: `HTTP/1.1 403 Forbidden
Content-Type: text/plain

Access Forbidden`,
}

const execSync = exports.execSync = (cmd, input) => {
    try {
        return "" + require('child_process').execSync(cmd, { input });
    } catch (e) {
        return undefined;
    }
};

let res = execSync("node " + process.argv[3], inputs[process.argv[2]]);
console.log(`got: 
=======================
${res}
=======================
`);
res = res.replace(/Date:[^\n]+\n/, "").replace(/[\n\r]+$/, "");
<<<<<<< HEAD
=======
console.log(res.length);
console.log(answers[process.argv[2]].length);
>>>>>>> 4b131f959749253850e8d114386247346df5533d

if (res === answers[process.argv[2]])
    console.log("OK");

else
<<<<<<< HEAD
    console.log("mismatch, was waiting for response like: \n" + answers[process.argv[2]]);

// console.log("res.length " + res.length);
// console.log("answers[process.argv[2]].length " + answers[process.argv[2]].length);
=======
    console.log("mismatch, was waiting for response like: \n" + answers[process.argv[2]]);
>>>>>>> 4b131f959749253850e8d114386247346df5533d
