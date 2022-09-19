# 함수

> 자바스크립트에서 함수는 가장 중요한 개념 중 하나이며 자바스크립트 함수만의 독특한 특징들이 있습니다.
> 함수의 특징을 얼마나 잘 이해하느냐가 자바스크립트 개발자로서의 역량을 판가름하는 기준이 될 수 있습니다.

<br/><br/>

### 일급 함수(firts-class function)

일급 함수는 아래와 같은 조건을 만족해야 합니다.
- 변수에 함수를 할당할 수 있습니다.
- 함수를 인자로 전달할 수 있습니다.
- 함수를 반환 값으로 사용할 수 있습니다.

자바스크립트의 함수는 일급 함수입니다.
```javascript
function do(callback) {
  callback();
}
```

## this

this는 읽기 전용 값으로 런타임 시 설정할 수 없으며 **함수를 호출한 방법에 의해 값이 달라집니다.**

참고로 전역 실행 컨텍스트에서의 this는 항상 **전역 객체**를 참조합니다.
브라우저 환경에서 실행하면 window 객체, Node.js 환경에서 실행하면 global 객체가 전역 객체가 됩니다.

```javascript
this === window; // true
```

### 일반 함수
엄격모드에서 일반 함수는 this의 값이 undefined 입니다.
```javascript
'use strict'

function do() {
  this === undefined;
}

do()
```

### 생성자 함수

new 키워드를 사용하여 함수를 호출하면 생성자 함수로 동작합니다.
생성자 함수의 this 바인딩은 일반 함수 호출과는 다르게 동작합니다.

#### 1. 객체를 생성하여 this에 바인딩

생성자 함수 내의 코드를 실행하기 전에 객체를 만들어 this에 바인딩합니다.
**생성된 객체는 생성자 함수의 prototype 프로퍼티에 해당하는 객체를 프로토타입으로 설정합니다.** 이 객체는 이후 this를 통해 계속 참조됩니다.

#### 2. 프로퍼티 생성 (함수 내의 코드 실행)

```javascript
function Vehicle(type) {
  this.type = type;
}
```

#### 3. 객체 반환

생성된 객체 즉, this에 바인딩한 객체를 반환합니다. 반환 값을 따로 명시하지 않아도 this에 바인딩한 객체가 반환됩니다. 다만, 다른 값을 반환하면 해당 값이 반환됩니다.

```javascript
function Veihcle(type) {
  this.type = type;
  return this; // 이 부분을 생략해도 this에 바인딩한 객체가 반환됩니다.
}
```

### 메서드

자바스크립트에서는 객체의 프로퍼티인 함수를 일반 함수와 구분하여 메서드라고 부르며, this 바인딩도 일반 함수와는 다르게 동작합니다.
```javascript
const obj = {
  name: 'javascript',
  greeting() {
    return `hello ${this.name}`;
  }
};
```
여기서 중요한 것은 **메서드를 어떻게 호출했느냐에 따라 this 바인딩이 달라진다**는 것입니다.

```javascript
obj.greeting(); // 'hello javascript'

const greeting = obj.greeting;
greeting(); // 'hello undefined'
```
메서드를 의도한 대로 사용하기 위해서는 반드시 해당 객체의 컨텍스트(obj)로 명확하게 지정하여 호출해야 합니다.

### call(), apply(), bind()

호출 방법에 상관없이 this를 특정한 객체로 바인딩할 수 없을까요?
자바스크립트에서는 함수의 내장 메서드인 call(), apply(), 그리고 bind() 메서드를 이용하여 this로 바인딩될 객체를 변경할 수 있습니다. 
그리고 이러한 방법을 **명시적 바인딩**이라고 부릅니다.

#### call(), apply()

call() 메서드는 첫번째 인자로 'this로 바인딩할 객체'를 지정합니다. 
그리고 call() 메서드를 통해 호출하는 함수로 인자를 전달할 수도 있습니다.
```javascript
const obj = {name: 'Yu'};

function info(age, country) {
  return `name: ${this.name}, age: ${age}, country: ${country}`;
}

info.call(obj, 20, 'Korea'); // 'name: Yu, age: 20, country: Korea'
```
<br/>

apply() 메서드는 call() 메서드와 동일하지만 호출하는 함수에 전달할 인자들을 배열 형태로 전달합니다.
```javascript
const obj = {name: 'Yu'};

function info(age, country) {
  return `name: ${this.name}, age: ${age}, country: ${country}`;
}

info.apply(obj, [20, 'Korea']); // 'name: Yu, age: 20, country: Korea'
```

#### bind()
bind() 메서드는 함수의 **this 바인딩을 영구적으로 변경합니다.**
그리고 this를 바인딩하여 함수를 호출하는 것이 아니라 **새로운 함수를 반환합니다.**

```javascript
const obj1 = { name: 'Yu' };
const obj2 = { name: 'Lee' };

function info(age, country) {
  return `name : ${this.name}, age: ${age}, country: ${country}`;
}

const bound = info.bind(obj1, 20); // this는 obj1, age는 20으로 고정

bound('Korea');                 // 'name: Yu, age: 20, country: Korea'
bound.call(obj2, 18, 'Japan');  // 'name: Yu, age: 20, country: Japan'
```
bound() 함수는 this 값이 영구적으로 고정되었기 때문에 this의 값이 obj1로 고정됩니다. 
bind() 함수는 this뿐만 아니라 함수에 전달할 인자도 고정시킬 수 있습니다.

<br/>

### 화살표 함수와 렉시컬 this

화살표 함수는 this를 바인딩하지 않습니다.

#### 렉시컬 this

함수 호출에 따라 동적으로 this를 바인딩하는 것이 아니라 함수를 어디에 선언하는지에 따라 this의 값이 결정됩니다.
**화살표 함수의 this는 화살표 함수를 둘러싸고 있는 렉시컬 스코프에서 this의 값을 받아 사용합니다.**
이러한 this를 **렉시컬 this**라고 하며 이 값은 변경되지 않습니다.
```javascript
const obj = {
  name: 'javascript',
  greeting: () => {
    return `hello ${this.name}`;
  }
};

obj.greeting(); // 'hello undefined'
```
위 예제에서 화살표 함수의 this는 obj가 아닌 obj를 둘러싸고 있는 전역 컨텍스트에서 값을 받아옵니다.

#### 화살표 함수의 특징

화살표 함수는 this를 따로 바인딩하지 않고 변경되지 않는 렉시컬 this를 갖습니다.
이러한 특징 때문에 화살표 함수의 this는 call(), apply(), bind() 함수를 사용하여 변경할 수 없습니다.
```javascript
const obj = { name: 'Yu' };
const greeting = () => {
  return `hello ${this.name}`;
}

greeting.call(obj); // 'hello undefined'
```

또한 화살표 함수는 생성자 함수로도 사용할 수 없습니다. 
생성자 함수는 객체를 생성하여 this에 바인딩하지만, 화살표 함수는 이러한 동작을 할 수 없기 때문입니다.

화살표 함수는 정적인 렉시컬 this를 사용하기 때문에 기존의 동적인 this 바인딩의 혼잡함에서 벗어나 단순하게 사용할 수 있습니다.
```javascript
const obj = {
  name: 'javascript',
  greeting() {
    setTimeout((function timer() {
      console.log(this.name);
    }).bind(this), 1000);
  }
};
```
위 예제는 timer() 함수가 setTimeout() 함수 내에서 실행되므로 this가 전역 객체로 바인딩됩니다. 그래서 이후에 bind() 함수를 사용해서 this를 obj로 바인딩 합니다.
화살표 함수를 사용하면 간결하게 변경할 수 있습니다.
```javascript
const obj = {
  name: 'javascript',
  greeting() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};
```
<br/>

DOM에 이벤트를 추가하는 addEventListener() 함수에서는 화살표 함수를 주의해서 사용해야합니다.
```javascript
block.addEventListener('click', function () {
  this // block 객체
})

block.addEventListener('click', () => {
  this // 전역 객체
})
```
일반 함수를 addEventListener() 함수의 콜백으로 넘긴 경우는 this는 event.currentTarget 프로퍼티와 동일한 값을 가집니다.
하지만 화살표 함수를 사용하는 경우에는 this의 값이 완전히 달라집니다.
