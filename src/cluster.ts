import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';

(async () => {
    if (cluster.isPrimary) {
        const numCPUs = cpus().length;
        console.log(`Primary ${process.pid} is running`);
    
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        };
    
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    } else {
        const id = cluster.worker?.id;
        await import('./server');
        console.log(`Worker id: ${id}, pid: ${process.pid}`);
    };
})();
