# oauth 과정

oauth-google을 통해 인증 구현

전체 과정
- Google Login -> 인증코드 발급 -> 인증 코드로 Token 발급 -> Token으로 사용자 정보 조회

## 인증 과정
1. 먼저 구글아래 링크에 접속해 Oauth2 Client에 대한 정보를 입력한다.
  - https://console.cloud.google.com/projectselector2/apis/credentials/consent?supportedpurview=project&authuser=1
  - Oauth2 Client는 현재 typescript로 구현하려고 하는 웹서버가 될것이다.
  - base uri, redirect uri가 필요하다.
    - base uri는 http://localhost:3000
    - redirect uri는 http://localhost:3000/authorize

2. 사용자가 Google 로그인을 통해 인증한다.
- Oauth2 client의 `/login`에서 구글 auth code를 요청한다.
```js
const uri = "https://accounts.google.com/o/oauth2/v2/auth?"
      + "client_id=" + client_id + "&"
      + "redirect_uri=http://localhost:3000/authorize&"
      + "response_type=code&"
      + "scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&"
      + "access_type=offline&"
      + "include_granted_scopes=true"
```
- Oauth2 Server의 uri path는 /o/oauth2/v2/auth
- 그외 필요한 파라미터들을 넣어준다.
- 그럼 실제 Google Login 화면이 뜨는것을 볼수있으며, 로그인을 수행하면 redirect uri로 이동한다.

3. redirect uri에서 토큰 발급
- 정확한 google id, password 입력을 하면 사용자 인증이 완료되며, redirect uri로 넘어온다.
  - 더불어 `code를 반환`받는다.
- redirect uri에서 사용자 인증을 위한 Token을 요청해야한다.
- Oauth2 Server의 uri path는 /oauth2/v4/token

필요한 body, header
```js
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
```

일반 oauth2 방식
- header에 Authorization을 추가한다.
  - Basic `Base64(client id:client_secret)`

```js
const headers2 = {'content-type' : 'application/x-www-form-urlencoded', 'Authorization': 'Basic dGVzdDoxMjM0'}
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
```

4. Token을 통해 사용자 정보 가져오기
- 받환받은 Token을 통해 사용자 정보를 가져올수 있다.

4.1 POST 방식

필요한 body, header
```js
const body2 = "access_token=" + JSON.parse(result).access_token;
const headers2 = {'content-type' : 'application/x-www-form-urlencoded'}
const requestOption2 = {
        method: 'POST',
        uri: 'https://www.googleapis.com/oauth2/v1/tokeninfo',
        headers: headers2,
        body: body2
    }
```

4.2 GET 방식
- header에 Authorization을 추가해준다.
  - Bearer `access token`

필요한 body, header
```js
const authorization: string = `Bearer ${JSON.parse(result).access_token}`
    const result2 = await axios.get('http://localhost:8080/api/v1/oauth2/me',{
        headers: {
            Authorization: authorization
        }
    })
    res.send({'email': result2.data.email})

```

5. Token 재발급
- Token의 만료시간이 지나 재발급 받기 위해 refresh token이 필요하다.
  - refresh token은 3에서 token을 받아올때 같이 받아온다. 
    
- 3과 body가 거의 비슷하며, grant_type을 refresh_token으로 바꿔주면 된다.

필요한 body, header
```js
const headers3 = {'content-type' : 'application/x-www-form-urlencoded'}
const body3 = "code=" + code +
    "&client_id=" + client_id +
    "&client_secret=" + secret_id +
    "&refresh_token=" + refresh_token +
    "&grent_type=refresn_token" ;
const requestOption3 = {
        method: 'POST',
        uri: 'https://www.googleapis.com/oauth2/v4/token',
        headers: headers3,
        body: body3
    }
```
