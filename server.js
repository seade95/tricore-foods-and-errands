const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'out');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
};

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (e, data) => {
    if (e) {
      res.writeHead(500);
      res.end('Server error');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  if (url === '/') url = '/index.html';

  let filePath = path.join(OUT, url);

  // Try exact file first
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      return serveFile(filePath, res);
    }
    // Try adding .html
    const withHtml = filePath + '.html';
    fs.stat(withHtml, (err2, stats2) => {
      if (!err2 && stats2.isFile()) {
        return serveFile(withHtml, res);
      }
      // Try index.html in directory
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (err3, stats3) => {
        if (!err3 && stats3.isFile()) {
          return serveFile(indexPath, res);
        }
        // 404
        fs.readFile(path.join(OUT, '404.html'), (e4, d4) => {
          res.writeHead(404);
          res.end(d4 || 'Not found');
        });
      });
    });
  });
});

server.listen(3000, () => {
  console.log('Tricore website running at http://localhost:3000');
});
