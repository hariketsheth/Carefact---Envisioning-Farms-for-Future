import express from 'express';
import cors from 'cors';
import insightRouter from './insights';
import earthData from './data/earthData.json';

export const getApp = () => {
    const app = express();
    
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors(
        {
            origin: "*",
            optionsSuccessStatus: 200
        }
    ));
    // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
    app.all('*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.use('/insight', insightRouter);
    app.get('/data/earth', (req, res) => {
        res.json(earthData);
    });

    return app;
};
