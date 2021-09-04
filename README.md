# typescript-tutorial

## typescript 란?
javascript에 타입 기능이 추가된 버전으로 typescript에 `타입 기능을 사용하지 않는다면 javascript와 동일`하다.

### 타입의 필요성?
코드를 작성한 쪽과 사용하는 쪽에 커뮤니케이션을 위해 타입을 사용한다.
```js
function makePerson(name, age){} // 해당 함수에서 에러가 발생하면 오류의 원인을 찾기 힘들다.
function makePerson(name: string, age: number) {}
```
타입을 통해 타입 스크립트 컴파일러는 문제의 원인이 어디에 있는지 친절하게 알려주기 때문에 코드를 좀더 수월하게 작성할수 있다.



## 설치
```
npm install -g typescript
```

npm? (node package manager)
- npm이라는 것은 Node.js로 만들어진 pakage(module)을 관리해주는 툴. 
- 즉, Node.js로 만들어진 모듈을 웹에서 받아서 설치하고 관리해주는 프로그램

npm으로 프로젝트를 만들면 package.json 파일이 만들어지는데,
- "scripts"는 run 명령어를 통해서 실행할 것을 의 
- "dependencies"의 경우는 설치할 모듈들을 의미

> Yarn?
>> Yarn도 npm과 같이 javascript 패키지 관리를 해주는툴로써, npm 보다 성능이나 보안 측면에서 더 좋은듯 하다.

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

### save-dev, save의 차이는?
- `--save-dev (-D)`는 개발에 필요한 패지키만 설치한다. package.json에 'devDependencies'항목에 등록됨
- `--save (-S)`는 프로젝트 실행에 필요한 패키지로 설치한다. package.json에 'dependencies'항목에 등록됨

위 명령을 바탕으로 nodemon, ts-node를 추가설치한다.
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

@types/node 패키지 설치
- Promise와 같은 타입을 사용하려면 아래 패키지를 설치해야한다.
```
npm install --save-dev @types/node
```
