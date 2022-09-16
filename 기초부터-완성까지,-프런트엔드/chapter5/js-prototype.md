# 프로토타입

> JS 에서는 프로토타입을 기반으로 객체 지향의 상속 개념을 구현합니다. (class 가 없습니다.) 

<br/>

## 프로토타입과 프로토타입 체인

모든 객체는 `[[Prototype]]` 이라는 내부 프로퍼티가 있습니다. (엔진 내부에서만 사용하는 숨겨진 프로퍼티 입니다.)
이는 자신의 부모 역할을 하는 프로토타입 객체의 참조링크를 가지고 있으며, 이 링크를 통해 프로퍼티나 메서드를 상속받은 것 처럼 사용할 수 있습니다.

### 프로토타입 체인

```
const obj = {
  name: 'javascript'
};

obj.toString(); // '[Object object]'
```
위 코드는 toString() 을 정의하지 않은 객체에서 toString() 을 사용하고 있습니다. 아래 과정처럼 프로토타입 체인을 통해 호출된 것입니다.

1. obj 객체의 toString() 메서드를 호출하기 위해 obj 객체의 프로퍼티나 메서드를 검색합니다.
2. 1번 과정에서 toString() 메서드를 찾지 못했기 때문에 **프로토타입 체인을 통해 상위 프로토타입에서 toString() 메서드를 검색합니다.**
3. 상위 프로토타입에서 toString() 메서드를 찾았기 때문에 이 메서드를 호출합니다.

### 최상위 프로토타입

모든 객체가 가진 프로토타입 체인의 종점은 **Object.prototype**입니다. 즉 모든 객체가 Object.prototype을 프로토타입으로써 공유한다는 의미입니다. (이 안에 toString() 함수도 있습니다.)

객체리터럴로 생성한 모든 객체의 `[[Prototype]]`은 최상위 프로토타입인 Object.prototype을 가리킵니다.

### 다양한 객체의 프로토타입

배열(`[]`)의 `[[Prototype]]`은 Array.prototype을 가리키고, Array.prototype의 `[[Prototype]]`은 Object.prototype을 가리킵니다.

## 프로토타입과 생성자 함수

모든 함수에는 `prototype`이라는 프로퍼티가 존재합니다. 일반 함수로 쓸땐 의미 없지만, new 키워드와 함께 생성자 함수로 사용할 경우에 역할을 합니다. (`[[Prototype]]`과는 또다른 프로퍼티 입니다.)

```
function Vehicle(type) {
  this.type = type;
}

const v1 = new Vehicle('car');
```
위 코드에서 `v1`의 `[[Prototype]]`은 Vehicle.prototype을 가리키고 Vehicle.prototype의 `[[Prototype]]`은 Object.prototype을 가리킵니다. 생성자 함수를 통해 생성된 모든 객체는 이러한 메커니즘으로 상속을 구현합니다.

```
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.stop = function() {
  console.log('stop!');
}

const v2 = new Vehicle('truck');
v2.stop();
```
Vehicle.prototype에 stop() 메서드를 추가하였습니다. 그 결과 `v2`객체에서 프로토타입 체인을 통해 stop() 메서드를 호출할 수 있게 되었습니다.

**단, 객체가 생성된 이후에 프로토타입의 프로퍼티를 수정하는 것은 안티패턴입니다.**

### 프로토타입을 통한 상속 구현

생각보다 까다롭습니다. 생성된 객체와 부모 프로토타입의 링크를 깨뜨리지 않게끔 구현해야 하기 때문입니다.
```
function Vehicle(type) {
  this.type = type;
}
Vehicle.prototype.stop = function () {
  console.log(`stop ${this.type}`);
}

const v = new Vehicle('car');
v.stop(); // 'stop car'

function Car(type, speed) {
  Vehicle.apply(this, [type]);
  this.speed = speed;
}
function inherit(perent, child) {
  child.prototype = new perent();
  child.prototype.constructor = child;
}
inherit(Vehicle, Car);

Car.prototype.run = function () {
  console.log(`run ${this.type} ${this.speed}`);
}

const c = new Car('SUV', 100);
c.stop(); // 'stop SUV'
c.run(); // 'run SUV 100'
```
Vehicle.prototype 은 type 변수와 stop 함수를 가집니다.
Car.prototype 은 Vehicle을 상속 받고 speed 변수와 run 함수만 추가했습니다.

## class

ES2015에서 class 키워드를 이용한 새로운 문법이 등장하였습니다.
class 문법을 사용하여도 내부적으로는 프로토타입을 기반으로 동작합니다.
```
class Vehicle {
  constructor(type) {
    this.type = type;
  }
  
  stop() {
    console.log(`stop ${this.type}`);
  }
}

const v = new Vehicle('car');
v.stop();

class Car extends Vehicle {
  constructor(type, speed) {
    super(type);
    this.speed = speed;
  }

  run() {
    console.log(`run ${this.type} ${this.speed}`);
  }
}

const c = new Car('SUV', 100);
c.stop(); // 'stop SUV'
c.run(); // 'run SUV 100'
```
extends 키워드로 특정 클래스를 상속받는 경우에는 **constructor() 생성자 메서드에서 반드시 this를 사용하기 전에 super()를 먼저 호출**해야 합니다.

### 정적 메서드와 private 접근 제한자

#### static

정적 메서드는 특정 인스턴스에 묶이는 것이 아니기 때문에 this가 아닌 클래스 이름을 사용하여 접근할 수 있습니다.
정적 메서드는 특정한 형태의 인스턴스를 생성하는 팩토리 함수를 정의할 때 많이 사용됩니다.
```
class Car extends Vehicle {
  ...
  static CreateSUV() {
    return new Car('SUV', 100);
  }
}
```

#### private

TC39에서는 # prifix를 추가해 pricate 클래스 필드를 선언하는 명세 작업을 진행하고 있습니다.
```
class Car extends Vehicle {
  #name;

  constructor(type, speed) {
    super(type);
    this.speed = speed;
    this.#name = 'my private';
  }
}
```