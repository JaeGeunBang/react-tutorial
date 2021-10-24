# 타입스크립트 변수 선언문

## let, const
var는 현재 ESNext에서 사용하지 말라고 권고하며, 현재는 let, const를 사용한다.
- let은 코드에서 그 값이 수시로 벼경될수 있음을 암시한다.
- const는 반드시 초기값을 명시하며, 변수값이 절대 변하지 않는다.

```typescript
let n: number = 1
let b: boolean = true
let s: string = 'hello'
let o: object = {}
o = {name: 'Jack', age: 32}

```

### 타입 추론
```typescript
let n = 1 // number로 판단
let b = true // boolean으로 판단
let s = 'hello' // string으로 판단
let o = {} // object로 판단
```

## any 타입
자바스크립트와의 호환을 위해 any라는 이름의 타입을 제공한다. 어느값이든 저장할수 있다.
```typescript
let a: any = 0 
a = 'hello'
a = true
a = {}
```
## undefined 타입
변수를 초기화하지 않으면 해당 변수는 undefined 값을 가진다. 하지만 타입스크립트는 undefined는 타입이기도 하고 값이기도 한다.

```typescript
let u: undefined = undefined
u = 1 // Type '1' is not assignable to type 'undefined' 오류 발생
```
위와 같이 undefined로 선언이되면, 오로지 undefined 값만 가질수 있다.

### 타입 계층도
any --> number, boolean, string, object --> undefined
- any가 가장 높고, undefined가 가장 낮다.
- 위 예제처럼 더 상위 계층의 number를 undefined에 할당하려 했기 때문에 오류가 발생한것이다.

## 템플릿 문자열
변수에 담긴 값을 조합해 문자열을 만들수 있다.
```typescript
let count = 10, message = 'Your count'
let result = `${message} is ${count}` 
```

# 객체와 인터페이스
object는 클래스의 상위 타입이며, object는 number, boolean, string 타입의 값을 가질순 없지만, 다른 객체를 모두 자유롭게 담을수 있다.

```typescript
let o: object = {name: 'Jack', age: 32}
o = {first: 1, second: 2}
```

## interface
아래 인터페이스의 목적은 객체의 타입 범위를 좁힐수 있다. 아래처럼 name, age만 반드시 포함되야 한다.
```typescript
interface IPerson {
    name: string
    age: number
}

let bad1: IPerson = {name: 'Jack'} // age 속성이 없어서 에러
let bad2: IPerson = {age: 32} // name 속성이 없어서 에러
let bad3: IPerson = {} // name, age 속성이 없어서 에러
let bad4: IPerson = {name: 'Jack', age: 32, etc: true} // etc 속성이 있어서 에러
```

## 선택 속성
```typescript
interface IPerson2 {
    name: string //필수 속성
    age: number //필수 속성
    etc?: boolean //선택 속성
}
```

## 익명 인터페이스
```typescript
let ai: {
    name: string
    age: number
    etc?: boolean
} = {name: 'Jack', age: 32}
```


# 객체와 클래스

클래스는 C++, Java 같은 객체 지향언어세ㅓ 흔히 볼수있는 class, private, public 등과 같은 키워드를 사용한다.

```typescript
class Person1 {
    name: string
    age?: number
}

let jack1: Person1 = new Person1()
jack1.name = 'Jack'
jack1.age = 32
```

접근제어자는 public, private, protected가 있으며 생략된다면 모두 public이다.

## 생성자
```typescript
class Person2 {
    constructor (public name: string, public age?: number){}
}
let jack2: Person2 = new Person2('Jack', 32)
```

## 인터페이스 구현
```typescript
interface IPerson4 {
    name: string
    age?: number
}

class Person2 implements IPerson4 {
    name: string
    age: number
}
```

## 추상 클래스
```typescript
abstract class AbstractPerson5 {
    abstract name: string
    constructor(public age?: number) {}
}

class Persion5 extends AbstractPerson5 {
    constructor(public name: string, age?: number) {
        super(age)
    }
}
```

## static 속성
```typescript
class A {
    static initValue = 1
}

let initVal = A.initValue
```

# 객체의 비구조화 할당문

**IPerson_ICompany.ts**
```typescript
export interface IPerson {
    name: string
    age: number
}

export interface ICompany {
    name: string
    age: number
}
```

위와 같이 IPerson, ICompany를 구조화하여 다른 파일에서 참고해 사용할수 있다.

```typescript
import {IPerson, ICompany} from './IPerson_ICompany'

let jack: IPerson = {name: 'Jack', age: 32},
    jane: IPerson = {name: 'jane', age: 32}
```

## 비구조화란?
구조화된 데이터는 어느 시점에 데이터의 일부만 사용할때가 있다.
- 즉 위에서 선언한 jack이 아닌 jack.name, jack.age 부분을 각각 name, age 변수에 저장한다.
```typescript
let name = jack.name, age = jack.age

let {name2, age2} = jack
```

## 잔여 연산자
점을 연이어 ... 3개 사용하는 연산자를 제공한다.
아래 처럼 address 변수는 5개 속성을 가지는데, 이중 country, city를 제외한 나머지 속성을 별도로 detail이라는 변수에 저장하고 싶다면 아래처럼 잔여 연산자를 붙인다.
```typescript
let address: any = {
    country: 'Korea',
    city: 'Seoul',
    address1: 'aaa',
    address2: 'bbb',
    address3: 'ccc'
}
const {country, city, ...detail} = address

```

# 객체의 타입 변환
```typescript
export default interface INameable {
    name: string
};
```

```typescript
import INameble from './INameable'
let obj: object = {name: 'Jack'}

let name1 = (<INameble>obj).name
let name2 = (obj as INameble).name

// 위와 같이 타입 변환을 위해 두가지 구문이 있다.
```

