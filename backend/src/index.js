import authRoutes from "./projects/auth/routes/authRoutes.js";
import routeNotFound from './utils/routeNotFound.js';
import cookieParser from "cookie-parser";
import config from './config/index.js';
import dbCon from './connection/db.js';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';


const app = express();
const publicDir = 'public';


app.use(express.json()); // allows us to parse incoming requests:req.body into json...
app.use(cookieParser()); // allows us to parse incoming cookies...

app.use(express.static(publicDir)); // Serve static files from the 'public' directory
app.use(bodyParser.json({ limit: '30mb', extended: true })); // client side body data processing
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors({ origin: config.clientUrl, credentials: true }));




app.use('/api/auth', authRoutes);




// ✅ Default welcome message at root/index page...
app.get('/', (_, res) => res.sendFile(path.join(__dirname, publicDir, 'index.html')));


// ✅ url checking...
app.use('/test', (_, res) => res.json({ message: 'Hello Testing... | Api Working... ✅' }));


// 🚩 | 404 | Route Not Found, must call at last of the application...
app.use('/', routeNotFound);


app.listen(config.port, () => { 
    console.log('Server Start On Port :', config.port, '🟩'); 
    dbCon();
});