import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(morgan('dev'));
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initializeDatabaseConnection(): void {
        const { MONGODB_URL }: any = process.env;

        mongoose.connect(MONGODB_URL);

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB successfully');
        });

        mongoose.connection.on('error', (err: any) => {
            console.log('Error connecting to MongoDB', err);
        });
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`server is running on port ${this.port}`);
        });
    }
}

export default App;
