import express from "express";
import morgan from "morgan";
import cors from 'cors';
import expressSession from 'express-session';
import passport from 'passport';
import hpp from 'hpp';
import helmet from "helmet";
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import {sequelize} from "./models";

dotenv.config();
const app = express() ;
const prod: boolean = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3065)
sequelize.sync({ force: false }) // force를 true로 하면 시작할때마다 db를 초기화함
    .then(() => {
        console.log('db 연결 성공')
    })
    .catch((err: Error) => {
        console.error(err);
    });

if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'))
    app.use(cors({
        origin: /nodebird\.com$/,
        credentials: true,
    }));
} else {
    app.use(morgan('combined'))
    app.use(cors({
        origin: true,
        credentials: true,
    }));
}
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static('uploads'));
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession( {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: prod ? '.nodebird.com' : undefined
    }
}))

app.get('/', (req, res, next) => {
    res.send('react nodebird 백엔드 정상 동작!')
});

app.listen(app.get('port'),() => {
    console.log(`server is running on ${process.env.PORT}`)
})
