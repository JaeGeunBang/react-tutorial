# 타입스크립트 주요 문법
    
1. 비구조화 할당
```ts
let person = {name: "Jane", age:22}
let {name, age} = person // name = Jane, age = 22

let array = [1,2,3,4]
let [head, ...rest] = array // head = 1, rest = 2,3,4

let a = 1, b = 2;
[a,b] = [b,a] // a = 2, b = 1
```

2. 화살표 함수
```ts
function add(a,b) {return a+b}
const add2 = (a, b) => a + b // function 을 쓰지 않고 화살표 함수를 만들수 있다. 변수에 할당하는 함수를 만들고 싶을때 사용
```

3. 클래스
```ts
abstract class Animal {
    constructor(public name?: string, public age?: number) {} // ? 는 입력 받아도 되고 안받아도 되고
    abstract say(): string
}

class Cat extends Animal {
    say() { return '야옹'}
}

class Dog extends Animal {
    say() { return '멍멍'}
}

let animals: Animal[] = [new Cat('야옹이, 2'), new Dog('멍멍이', 3)]
let sounds = animals.map(a => a.say()) // ['야옹', '멍멍']
```

4. 모듈
```ts
import * as fs from 'fs' // 아래에서 만든 모듈을 가져오고 싶을때 사용할수 있다.

export function writeFile(filePath: string, content: any) { // 모듈을 만들어 다른 파일에서도 사용할수 있다.
    fs.writeFile(filePath, content, (err) => {
        err && console.log('error', err)
    })
}
```

5. 생성기
```ts
function* gen() { // 생성기는 function 키워드에 *을 겹합하고, yield 키워드를 이용해 만든다.
    yield* [1,2]
}
for(let value of gen()) { console.log(value)} // 1, 2
```

6. promise, async/await 구문
```ts
async function get() {
    let values = []
    values.push(await Promise.resolve(1))
    values.push(await Promise.resolve(2))
    values.push(await Promise.resolve(3))
    return values
}
get().then(values => console.log(values)) // [1,2,3]
```

# 타입스크립트 고유 문법

1. 타입 주석과 타입 추론
```ts
let n: number = 1
let m = 2
```

2. 인터페이스
```ts
interface Person {
    name: string
    age?: number
}

let person: Person = {name: "Jane"}
```

3. 튜플
```ts
let numberArray: number[] = [1,2,3] // 배열
let tuple: [boolean, number, string] = [true, 1, 'Ok'] // 튜플
```

4. 제네릭 타입
```ts
class Container<T> {
    constructor(public value: T) {}
}
let numberContainer: Container<number> = new Container<number>(1)
let stringContainer: Container<string> = new Container<string>('Helle world')
```

5. 대수 타입

ADT란, 추상 데이터 타입을 의미하기도 하지만 대수 타입이라는 의미로도 사용됨.함
- 대수 타입이란? 다른 자료형의 값을 가지는 자료형을 의미   
```ts
type numberOrString = number | string // 합집합 타입
type AnamalAndPerson = Animal & Person // 교집합 타입
```


