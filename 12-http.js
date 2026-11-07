const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Welcome to home page');
    } else if (req.url === '/about') {
        res.end('here is our short history');
    } else {
        res.statusCode = 404;
        res.end(`
            <h1>Oops! Page not found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/">back home</a>
        `);
    }
});

server.listen(5000);