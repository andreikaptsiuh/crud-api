import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    if (req.url === 'api/users') {
        res.end('USERS');
    } else {
        res.end(req.url);
    }
});
  
server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
