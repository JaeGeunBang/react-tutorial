# typescript-tutorial

## 설치
```
npm install -g typescript
```

## 프로젝트 생성 및 컴파일
```
mkdir typescript-project
cd typescript-project
npm init

tsc --init
```
이후 tsconfig.json 이라는 파일이 생성되며, 이 프로젝트는 typescript 프로젝트의 루트임을 나타낸다

## 추가 설치
```
npm install --save-dev nodemon ts-node 
```
nodemon, ts-node를 추가설치한다.
- nodemon: node monitor의 약자로 노드가 실행하는 파일이 속한 디렉토리를 감시하다가 파일이 수정되면 자동으로 어플리케이션을 재시작해준다.
- ts-node: 메모리상에서 타입스크립트를 transpile 하여 바로 실행할수 있게 한다.

package.json을 아래와 같이 수정해준다.

**package.json**
```
“scripts”: {
  “start”: “nodemon —-exec ts-node src/www.ts”
 }
```
npm start를 하면 위 `nodemon --exec ts-node src/www.ts`가 실행된다.
