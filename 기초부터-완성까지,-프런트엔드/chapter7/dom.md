# 문서 객체 모델 (Document Object Model, DOM)

> DOM은 일종의 인터페이스로 해당 요소를 나타내는 노드, 노드의 속성을 나타내는 프로퍼티와 이를 조작할 수 있는 여러 메서드를 담아 구조화한 객체로 표현합니다.
> 또한 DOM을 통해 자바스크립트 같은 여러 프로그래밍 언어로 해당 요소에 접근해 해당 구조나 내용, 스타일을 변경할 수 있습니다.

JavaScript 에서 DOM API(`document`)의 여러 속성과 함수를 사용해 문서를 추가, 삭제, 수정 그리고 이동할 수 있습니다.

## DOM 이벤트

> 프런트엔드 개발자에게 이벤트를 제어하는 것은 광장히 중요한 부분입니다. 
> 이벤트의 발생 시점에 맞춰 여러 가지 동작을 추가하여 사용자와 인터렉션할 수 있기 때문입니다.

### Event 객체

#### target과 currentTarget

두 프로퍼티는 같은 값을 갖기도 하고 다른 값을 갖기도 해 많은 사람들이 헷갈려하는 프로퍼티 중 하나입니다.

- target: 이벤트가 처음 발생했던 대상 DOM 요소의 참조를 갖습니다.
- currentTarget: 발생한 이벤트가 등록된 DOM 요소의 참조를 갖습니다.

```html
<ul id="list">
  <li id="1">
    list1
  </li>
  <li id="2">
    list2
  </li>
  <li id="3">
    list3
  </li>
</ul>

<script>
  const list = document.getElementById("list");

  list.addEventListener('click', (ev) => {
    // if click <li id="2">
    console.log(ev.target.id);        // 2
    console.log(ev.currentTarget.id)  // list
  });
</script>
```

#### stopPropagation()과 preventDefault()

- stopPropagation(): **이벤트가 전파되는 것을 막습니다.** 대신 이벤트를 취소하지 않습니다.
- preventDefault(): **현재 이벤트의 기본 동작만 중단합니다.** 대신 전파되는 이벤트를 막지 않습니다.

### 이벤트 종류

#### User Interface 이벤트

문서나 요소의 조작 시 발생하는 이벤트입니다.

| 이름 | 설명 |
| - | - |
| load | 문서나 종속된 리소스(이미지나 스크립트 파일, CSS 파일 등)가 완전히 로드되었을 때, 이 이벤트가 발생합니다. 일반적으로 window에 접근할 수 없어 주로 `<body>`에 이벤트 리스너를 할당해 사용합니다. |
| unload | 문서나 종속된 리소스(이미지나 스크립트 파일, CSS 파일 등)가 완전히 제거되었을 때, 이 이벤트가 발생합니다. 주로 페이지를 완전히 종료하거나 다른 페이지로 이동 시 발생합니다. 주로 메모리 누수를 방지하는 목적으로 사용됩니다. |
| abort | 리소스가 중단된 경우(로드가 진행되는 동안 사용자가 취소했을 때 같은 경우) 이 이벤트가 발생합니다. |
| error | 리소스가 로드되었지만 유효하지 않을 때, 스크립트 실행 오류, 잘못된 형식 등의 에러가 발생했을 때 이 이벤트가 발생합니다. |
| select | `<input>`, `<textarea>` 요소 안에 작성된 텍스트를 선택할 경우 발생합니다. |


#### Focus 이벤트

Focus 이벤트는 대상이 포커스를 받거나 잃을 때 발생하는 이벤트입니다.

| 이름 | 설명 |
| - | - |
| focusin | 포커스를 받으려 할 때 이벤트가 발생합니다. 포커스가 실제로 가기 전 이벤트가 발생합니다. |
| focusout | 포커스를 잃으려 할 때 이벤트가 발생합니다. 포커스를 실제로 잃기 전 이벤트가 발생합니다. |
| focus | 대상이 포커스를 받을 때 이벤트가 발생합니다. |
| blur | 대상이 포커스를 잃을 때 이벤트가 발생합니다. |


**A 요소로 포커스를 잡은 뒤 B 요소로 포커스가 이동할 경우**

1. A: focusin
2. A: focus
3. A: focusout
4. B: focusin
5. **A: blur**
6. B: focus

#### 마우스 이벤트

마우스 이벤트는 항상 가장 깊이 중첩된 요소를 target으로 합니다.

| 이름 | 설명 |
| - | - |
| mousedown | 타깃을 눌렀을 때 이벤트가 발생합니다. |
| mouseup | 타깃의 위에서 눌렀던 포인터가 해제될 때 이벤트가 발생합니다. |
| click | 타깃에 클릭 동작을 했을 경우 이벤트가 발생합니다. mousedown과 mouseup 이벤트가 발생한 뒤 발생합니다. |
| dbclick | 더블 클릭을 했을 경우 이벤트가 발생합니다. click 이벤트의 동작을 취소해도 dbclick 이벤트는 동일하게 발생합니다. |
| mousemove | 타깃 내에서 포인터가 이동할 경우 이벤트가 발생합니다. |
| mouseenter | 포인터가 타깃 밖에서 안으로 처음 이동할 때 발생합니다. 이후 자식 요소에 올라갈 때는 발생하지 않습니다. |
| mouseleave | 타깃 밖으로 이동할 때 발생합니다. |
| mouseover | mouseenter와 동일한 조건에서 발생하지만 이벤트가 버블링이 발생합니다. |
| mouseout | mouseleave와 동일한 조건에서 발생하지만 이벤트가 버블링이 발생합니다. |

마우스 이벤트는 Event 객체에 이벤트가 발생한 시기의 마우스 좌표를 제공합니다.

#### Input 이벤트

| 이름 | 설명 |
| - | - |
| beforeinput | 입력 후 DOM 요소에 업데이트되기 전 이벤트가 발생합니다. |
| input | 입력 후 DOM 요소에 업데이트된 뒤 바로 이벤트가 발생합니다. |


#### 키보드 이벤트

| 이름 | 설명 |
| - | - |
| keydown | 키보드를 누를 때 발생합니다. |
| keyup | 누를 키를 뗄 때 발생합니다. |

키보드 이벤트는 Event 객체에서 어떤 키를 입력했는지, 함께 누를 키는 어떤 키인지에 대한 정보를 함께 제공합니다.

key는 입력한 키를 문자열로 반환하며 ctrlKey, altKey, shiftKey, metaKey 값은 해당 버튼을 입력했는지 불리언 값으로 반환합니다.

---

W3C의 events 명세나 MDN 문서에는 더 많은 이벤트에 대한 특징이 잘 정리되어 있습니다.

### 이벤트 리스너 추가하기

이벤트 리스너를 추가하는 방법은 크게 세 가지가 있습니다. DOM 프로퍼티로 할당하는 방법, HTML 요소에 속성으로 할당하는 방법, 마지막으로 권장되는 방식인 addEventListener()가 있습니다.

#### HTML요소 속성으로 할당하기

`on<event>` 형태로 되어 있는 속성에 리스너를 할당할 수 있습니다.
```html
<button onclick="alert('hello world!')">button1</button>


<button id="button-id" onclick="clickEventHandler(event)">button2</button>
<script>
  function clickEventHandler(e) => {
    console.log(e);
  }
</script>
```

#### DOM 프로퍼티로 할당하기(DOM level 0)

DOM 프로퍼티를 할당하여 이벤트 리스너를 등록할 수도 있습니다.

```html
<button id="button-id">alert</button>
<script>
  document.getElementById('button-id').onclick = (e) => {
    alert('hello world');
  }
</script>
```

**HTML 요소의 속성으로 이벤트 리스너를 등록하거나, DOM 프로퍼티로 이벤트 리스너를 등록하는 방법은 동일한 이벤트를 대상으로 여러 이벤트 리스너를 동시에 등록할 수 없다는 단점이 있습니다.**

#### addEventListener 사용하기(DOM level 2)

한 이벤트 타입에 여러개의 리스너를 등록할 수 있으며 
버블링을 사용할지, 캡처링을 사용할지 등 정밀한 제어를 할 수 있어 가장 권장되는 방식입니다.

```html
<button id="button-id">alert up</button>
<script>
  const $button = document.getElementById('button-id');

  function sayHello() {
    alert('hello');
  }
  $button.addEventListener('click', sayHello, true); // 캡처링 사용
  $button.removeEventListener('click', sayHello); // 이벤트 핸들러 제거
</script>
```

### 버블링과 캡처링

target 에 이벤트가 발생하면 최상단 DOM 노드부터 target 까지 캡처링 이벤트가 발생하고, 바로 다음에 target 부터 최상단 DOM 노드까지 캡처링이 발생합니다.

addEventListener() 는 기본적으로 버블링 이벤트를 등록하지만, 세번째 인자로 true를 주면 캡처링 이벤트를 등록합니다.

```javascript
const $form = document.getElementById('form-id');
const $div = document.getElementById('div-id');
const $p = document.getElementById('p-id');

[$form, $div, $p].forEach($target => {
  $target.addEventListener('click', () => {
    console.log(String(target.tagName));
  }, true); // target이 p일 때 캡처링: form -> div -> p
```
