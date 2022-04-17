import * as express from "express";
import * as request from "request";
import axios from "axios";

const app: express.Application = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

const client_id = "test"
const secret_id = "12345678"

app.set('view engine', 'ejs')
app.get("/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.render('index')
  }
);

app.get('/login', (req: express.Request, res: express.Response) => {
    const uri = "http://localhost:8080/api/v1/oauth2/authorize?"
      + "client_id=" + client_id + "&"
      + "redirect_uri=http://localhost:3000/authorize&"
      + "response_type=code&"
      + "scope=read&"
      + "access_type=offline&"
    return res.redirect(uri)
})

function doRequest(option: object) {
    return new Promise(function (resolve, reject) {
        const requestOption = {
            method: JSON.parse(JSON.stringify(option)).method,
            uri: JSON.parse(JSON.stringify(option)).uri,
            headers: JSON.parse(JSON.stringify(option)).headers,
            body: JSON.parse(JSON.stringify(option)).body,
        }

        request.post(requestOption, function(err, res, body) {
            if (!err && res.statusCode == 200) {
                resolve(body)
            } else {
                resolve(body)
                //reject(err);
            }
        });
    });
}

app.get('/authorize', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { code } = req.query
    const headers = {'content-type' : 'application/x-www-form-urlencoded', 'Authorization': 'Basic dGVzdDoxMjM0'}

    const body = "code=" + code +
        "&grant_type=authorization_code" +
        "&client_id=" + client_id +
        "&client_secret=" + secret_id +
        "&redirect_uri=http://localhost:3000/authorize";
    const requestOption = {
        method: 'POST',
        uri: 'http://localhost:8080/api/v1/oauth2/token',
        headers: headers,
        body: body
    }
    const result = await doRequest(requestOption) as string

    const authorization: string = `Bearer ${JSON.parse(result).access_token}`
    const result2 = await axios.get('http://localhost:8080/api/v1/oauth2/me',{
        headers: {
            Authorization: authorization
        }
    })
    res.send({'email': result2.data.email})
})


export default app;



