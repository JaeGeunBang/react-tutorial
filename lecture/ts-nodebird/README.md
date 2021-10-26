# ts-nodebird

## ts-node?
- typescript는 실제 nodejs에서 바로 실행할수 없기 때문에, javascript로 변환을 해야한다.
- ts-node는 typescript를 javascript 변환해 nodejs 위에서 실행할수 있게 해주는 툴이다.
- 허나 실제 배포할때는 ts-node를 쓰지 않는다. (실제 서비스에서 번거롭게 바꿔주는 작업은 필요없고 느리다.)
  - `npx tsc`를 통해 ts를 js로 변경후에 배포한다. 이후 `node index`로 실행해준다.

## npx?
- npm 으로 global 설치를 하면, package.json에 남지 않아 배포나 인수인계에 어려움이 있음
  - ex)
```typescript
npm install ts-node
ts-node ...
```
- 즉, global 설치를 피하기 위해, `npx`명령은 global 설치 하지 않고 실행할수 있다.
```typescript
npm install -D ts-node
npx ts-node ...
```

## sequelize?
typescript에서 많이 사용하는(?) ORM

```typescript
npm install sequelize sequelize-cli mysql2
npx sequelize init // model, config 폴더 생성됨

npx sequelize db:create // db 생성 (sequelize cli 사용)
// 해당 명령은 config.js 여야만 실행가능하다. (sequelize cli가 js에서만 인식하기 떄문)
// 즉, 초반엔 config.js로 만든후 sequelize cli를 실행후 config.ts로 변경해준다.
```

## passport?
설명
- Node.js에서 사용하는 인증관련 미들웨어로써, 로그인 이나 접근권한 등을 인터셉트해서 권한을 체크함

관련내용
- https://kmseop.tistory.com/155
