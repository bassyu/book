# 브라우저 객체 모델 (Browser Object Model, BOM)

> BOM은 DOM과 다르게 표준이 없어 브라우저별로 자유롭게 구현되어 있습니다.

## window 객체

브라우저에서 제공하는 여러 가지 기능들은 window 인터페이스를 통해 사용할 수 있습니다.

최상단의 window 인터페이스는 일반적으로 두 가지 의미가 있습니다. 첫 번째로, 브라우저 환경에서의 자바 스크립트 전역 객체를 의미합니다.

두 번째로, 브라우저 창(window)을 의미합니다. 창을 닫거나 경고를 띄우고, 새 창을 띄우는 등 여러 메서드를 제공합니다.

```javascript
window.alert('Hello world!');
window.open('https://google.com');
window.close();
console.log(window.innerWidth);
```

window로 접근할 수 있는 메서드나 변수는 window가 생략된 상태에서 사용할 수 있습니다.

```javascript
alert('Hello world!');
open('https://google.com');
close();
console.log(innerWidth);
```

## History 객체

History 객체는 현재 브라우저의 세션 기록(현재 문서의 탭이나 프레임에서의 방문 기록)을 갖고 있습니다.
window.history로 History 객체에 접근할 수 있으며 보안상의 이유로 사용자가 방문한 목록을 보는 것을 불가능합니다.
하지만 현재 페이지를 기준으로 세션 기록 내의 앞뒤로 이동하거나 특정 위치로 이동시킬 수 있는 메서드를 제공합니다.
메서드 뿐만 아니라 현재 세션에 연결할 상태를 저장하는 state 객체 또한 존재합니다.

#### forward(), back()

세션 기록 내에서 앞으로 이동하려면 forward(), 뒤로 가려면 back()을 사용합니다.

```javascript
history.forward();
history.back();
```

#### go()

현재 위치를 기준으로 오프셋에 해당하는 숫자를 넣어 위치를 이동할 수 있습니다.

```javascript
history.go(1);  // forward()와 동일합니다.
history.go(-1); // back()과 동일합니다.
history.go(0);  // 현재 페이지를 새로고침합니다.
```

#### pushState()

브라우저의 세션 기록에 상태를 추가합니다. 새로운 세션으로 넘겨줘야 할 정보를 나타내는 state, 이동할 페이지의 title, 그리고 이동할 페이지의 url을 매개변수로 가집니다.

```javascript
const state = { userId: 123 };
const title = '';
const url = '/docs/1';

history.pushState(state, title, url);
```

window.location.href 와는 달리 새로운 HTTP 호출을 만들지 않아서 페이지의 존재 여부와 상관없이 추가됩니다.

#### replaceState

메서드의 매개변수와 사용법은 pushState()와 동일하며, 새롭게 추가되는 것이 아닌 현재 세션이 대체된다는 점이 다릅니다.

#### popstate 이벤트

popstate는 같은 문서에 대해 히스토리 엔트리가 변화할 때 발생하는 이벤트입니다. 

popstate 이벤트는 브라우저의 버튼을 눌러 페이지를 이동하거나 go(), back(), forward() 같은 API를 호출할 때 발생합니다. 
다만, pushState()나 replaceState()를 호출할 때는 발생하지 않습니다. 

popstate발생 시의 Event 객체의 state속성으로 세션의 정보인 history.state가 담깁니다.

---

이러한 특징은 SPA(Single-Page Application)의 라우터를 구현할 때 사용됩니다. SPA 환경에서는 화면 간 이동시 url은 바뀌지만 HTTP 통신은 하지 않습니다.
이런 동작을 위해 SPA 라우터는 replaceState(), pushState(), popstate를 이용해 페이지 이동을 구현합니다.

## Location 객체

Location 객체는 현재 체이지의 URL, 프로토콜, hostname, 포트 번호 등 위치에 관련된 정보를 포함합니다. window.location 또는 document.location으로 Location 객체에 접근할 수 있습니다.

```javascript
// example URL: https://test.com:443/tutorial?value=123#what-are-we-building

// 'https://test.com:443/tutorial?value=123#what-are-we-building'
location.href

// 'https:'
location.protocol

// 'test.com:443'
location.host

// 'test.com'
location.hostname

// '443'
location.port

// '/tutorial'
location.pathname

// '?value=443'
location.search

// '#what-are-we-building'
location.hash
```

#### assign()

매개변수에 해당하는 URL로 이동합니다. location.href값이 바뀌면 이 메서드가 호출됩니다.

```javascript
location.assign('https://test.com');

// 현재 도메인의 pathname을 '/tutorial'로 합니다.
location.assign('tutorial');
```

#### replace()

assign()과 동작은 동일하지만 현재 페이지에 대한 history 스택이 초기화된다는 점이 다릅니다.

#### reload()

현재 URL의 리소스를 다시 불러옵니다. 인자로 true를 전달하면 캐시를 무시하고 다시 불러옵니다.

## navigator 객체

Navigator 인터페이스의 navigator 객체는 클라이언트의 ID 및 상태를 나타냅니다.
이는 브라우저마다 다를 수 있습니다.

## Web Storage

**localStorage**와 **sessionStorage**가 있습니다.
보통 대부분의 브라우저 모두 2MB 이상의 데이터를 저장할 수 있습니다.
쿠키와 다르게 HTTP 헤더를 통한 조작이 불가능하며 서버로 전송되지 않습니다.
또한 도메인, 프로토콜, 포트로 구성된 origin으로 관리되어 도메인이나 포트가 동일해도 프로토콜이 다를 경우 해당 데이터에 접근할 수 없습니다.
이런 특징을 이용해 게시글 임시 저장이나 다크 테마 상태 등 개인에 맞춰진 UI 상태를 저장하기 적합합니다.

- getItem(key): 키에 해당하는 값을 얻습니다. 해당하는 값이 없으면 null을 반환합니다.
- setItem(key, value): 키에 해당하는 값을 설정합니다.
- removeItem(key): 키에 해당하는 값을 삭제합니다.
- clear(): 저장된 모든 키-값 쌍을 제거합니다.
- key(index): index에 해당하는 키를 얻습니다.
- length: 저장된 항목의 개수를 얻습니다.

```javascript
localstorage.setItem('NUMBER', 123);

// '123'
localstorage.getItem('NUMBER');

// 'NUMBER'
localstorage.key(0);
```

값은 항상 문자열이며 다른 타입의 값을 넣어도 문자열 형태로 저장됩니다.

객체의 형태로 데이터를 저장하고 싶을 경우 JSON.stringify()와 JSON.parse()를 통해 저장할 수 있습니다.

```javascript
const obj = { name: 'yu', age: 24 };

// '[object Object]'
sessionStorage.setItem('OBJ-DATA', obj);
sessionStorage.getItem('OBJ-DATA'); 

// '{ "name": "yu", "age": 24 }'
sessionStorage.setItem('OBJ-STRINGIFY', JSON.stringify(obj));
sessionStorage.setItem('OBJ-STRINGIFY');

const data = sessionStorage.setItem('OBJ-STRINGIFY');
const json = JSON.parse(data);
```

#### localStorage와 sessionStorage의 차이

localStorage는 orogin이 같을 경우 여러 탭과 창에서 공유됩니다. 
또한 세션 이후에도 지속되는 저장소용으로 설계되어 컴퓨터를 종료하거나 브라우저를 종료하더라도 지속됩니다.

sessionStorage는 한 탭에서 페이지의 세션이 유지되는 동안 origin별로 스토리지를 관리합니다.
페이지가 열려 있는 동안이나 페이지 리로딩 혹은 복원 시에는 데이터가 유지되지만 다른 세션이나 창이 종료될 경우 데이터에 접근할 수 없습니다.
localStorage보다 좀 더 제한적으로 사용됩니다.

#### storage 이벤트

WebStorage의 데이터가 변경될 때 storage 이벤트가 발생합니다.
```javascript
window.addEventListener('storage', (e) => {
  console.log(e);
});
```

storage 이벤트의 이벤트 객체에는 데이터에 대한 여러 가지 정보가 담깁니다.

- key: 변경된 데이터의 키를 나타냅니다. clear()시 null이 반환됩니다.
- oldValue, newValue: 이전 값과 새로운 값을 나타냅니다. 새로 추가되었을 경우 oldValue는 null이 되며 제거될 경우 newValue는 null이 됩니다.
- url: 문서의 URL을 나타냅니다.
- storageArea: 갱신이 일어난 WebStorage 객체를 나타냅니다.(localStorage 또는 sessionStorage)

storage 이벤트는 변경을 일으킨 탭 외에도 같은 origin을 가지는 다른 탭과 다른 창에서도 이벤트가 발생합니다.
하지만 지원하지 않는 브라우저가 많습니다.
