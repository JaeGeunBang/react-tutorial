import * as express from "express";
import * as request from "request";
import * as google_oauth2 from "../config/google_oauth2"

const app: express.Application = express();

const client_id = google_oauth2.client_id
const secret_id = google_oauth2.secret_id

app.set('view engine', 'ejs')
app.get("/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.render('index')
  }
);

app.get('/login', (req: express.Request, res: express.Response) => {
    const uri = "https://accounts.google.com/o/oauth2/v2/auth?"
      + "client_id=" + client_id + "&"
      + "redirect_uri=http://localhost:3000/authorize&"
      + "response_type=code&"
      + "scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&"
      + "access_type=offline&"
      + "include_granted_scopes=true"
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
                reject(err);
            }
        });
    });
}

app.get('/authorize', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { code } = req.query
    const headers = {'content-type' : 'application/x-www-form-urlencoded'}
    const body = "code=" + code +
        "&grant_type=authorization_code" +
        "&client_id=" + client_id +
        "&client_secret=" + secret_id +
        "&redirect_uri=http://localhost:3000/authorize";
    const requestOption = {
        method: 'POST',
        uri: 'https://www.googleapis.com/oauth2/v4/token',
        headers: headers,
        body: body
    }

    const result = await doRequest(requestOption) as string
    const body2 = "access_token=" + JSON.parse(result).access_token;
    const headers2 = {'content-type' : 'application/x-www-form-urlencoded'}
    const requestOption2 = {
        method: 'POST',
        uri: 'https://www.googleapis.com/oauth2/v1/tokeninfo',
        headers: headers2,
        body: body2
    }

    const result2 = await doRequest(requestOption2) as string
    res.send("Email " + JSON.parse(result2).email);
})


export default app;



