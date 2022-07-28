import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import middlewares from '../middlewares';
import router from '../routers';
import rateLimit from 'express-rate-limit';

const { errorHandler } = middlewares.errorMiddlewares;
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


const app = express();

app.set('case sensitive routing', false);
app.set('strict routing', false);
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(json());
app.use(limiter);
app.use(urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);
export default app;
