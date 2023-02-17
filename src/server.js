import http from "node:http"
const server = http.createServer((req, res) => {

    return res.end("OK!")

})

server.listen(5555)