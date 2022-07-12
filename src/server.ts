import 'dotenv/config';
import http from 'http';
import { userRouter } from './routers/userRouter';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url?.includes('/api/users')) {
        userRouter(req, res);
    } else {
        const message = 'For this url nothing not found';
        res.writeHead(404, message);
        res.end(message);
    }
});
  
server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
