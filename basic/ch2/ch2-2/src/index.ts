
import IPerson from './person/IPerson'
import Person, {makePerson} from './person/Person'
import Change from 'chance'
import * as R from 'ramda'

const change = new Change() // change 패키지는 가짜 데이터를 만들어줄떄 사용
let persons: IPerson[] = R.range(0,2) // ramda는 함수형 유틸패키지
    .map((n: number) => new Person(change.name(), change.age()))
console.log(persons)
