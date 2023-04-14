import { PORT } from 'src/configuration';
import { getApp } from 'src/app';

const startServer = () => {
    try {
        const app = getApp();

        app.listen(PORT, () => {
            console.log(`server started at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();
