const http = require("http");
const fs = require("fs");
const port = 3000;
let users = [
  { name: "san wan aung", email: "sanwanaung400042@gmail.com", age: 20 },
  { name: "zaw mun aung", email: "zawmunaung089@gmail.com", age: 26 },
  { name: "kyaw kyaw", email: "kyawkyaw@gmail.com", age: 30 },
  { name: "aung aung", email: "aungaung@gmail.com", age: 20 },
];

const server = http.createServer((req, res) => {
  const method = req.method;
  const route = req.url;
  const isRootUrl = route === "/";

  if (isRootUrl) {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (route === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else if (route === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (route === "/users") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      res.end();
    } else if (method === "POST") {
      let newData = "";
      req.on("data", (chunk) => {
        newData += chunk;
      });
      req.on("end", () => {
        const changeObj = JSON.parse(newData);
        console.log(changeObj);
        users.push(changeObj);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      });
    } else if (method === "DELETE") {
      let dataFromScript = "";
      let filterEmail;
      req.on("data", (chunk) => {
        dataFromScript += chunk;
      });
      req.on("end", () => {
        console.log(dataFromScript);
        const changeData = JSON.parse(dataFromScript);
        console.log(changeData);
        const deleteUserId = changeData.email;
        filterEmail = users.filter((elem) => {
          return elem.email !== deleteUserId;
        });
        users = filterEmail;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      });
    } else if (method === "PUT") {
      let newData = "";

      req.on("data", (chunk) => {
        newData += chunk;
      });
      req.on("end", () => {
        const chagneObj = JSON.parse(newData);
        const changeUserEmail = chagneObj.email;
        const user = users.find((elem) => elem.email === changeUserEmail);
        if (user) {
          user.name = chagneObj.name;
          user.age = chagneObj.age;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      });
    }
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Not Home Url");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server Started: Listenning on port ${port}`);
});
