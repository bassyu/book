# CSS (Cascading Style Sheets)

## 상속

대표적으로 font 관련 프로퍼티나 색상, 정렬 방식의 프로퍼티가 상속됩니다.

```html
<div style="font-size: 20px;">
  parent
  <p>child</p>
</div>
```

반대로 width, height, margin, display, board처럼 상속되지 않는 프로퍼티 또한 존재합니다.

```html
<div style="border: 1px solid;">
  parent
  <p>child</p>
</div>
```

상속되는 프로퍼티지만 HTML 요소의 종류에 따라 상속되지 않기도 합니다. 
대표적으로 `<button>` 요소가 이에 해당합니다.

```html
<div style="font-size: 20px;">
  parent
  <button>child</button>
</div>
```

만약 프로퍼티와 요소의 종류에 영향받지 않고 부모 요소의 프로퍼티를 상속받고 싶다면 명시적으로 **inherit** 값을 지정합니다.

```html
<div style="font-size: 20px;">
  parent
  <button style="font-size: inherit;">child</button>
</div>
```

## 선택자

- 전체 선택자 (*)
- 타입 선택자 (div)
- id 선택자 (#)
- class 선택자 (.)
- 속성 선택자

### 속성(attribute) 선택자

```css
/* id 속성을 갖는 span 요소 */
span[id] {
  ...
}

/* href 속성이 "https://example.com"인 a 요소 */
a[href="https://example.com"] {
  ...
}

/* 클래스로 "class2"를 갖는 span 요소 */
span[class~="class2"] {
  ...
}

/* id 중 "hi" 또는 "hi-" 형태를 갖는 span 요소 */
span[id|="hi"] {
  ...
}

/* id의 접두사가 "test"인 span 요소 */
span[id^="test"] {
  ...
}

/* id의 접미사가 "test"인 span 요소 */
span[id$="test"] {
  ...
}

/* id에 "javascript"가 포함된 span 요소 */
span[id*="javascript"] {
  ...
}
```

```html
<span id="id"></span>
<a href="https://example.com"></a>
<span class="class1 class2 class3"></span>
<span id="hi-1"></span>
<span id="test-id"></span>
<span id="id-test"></span>
<span id="id-javascript-1"></span>
```

## 우선순위와 명시도(Specificity)

여러 스타일이 한 요소에 중첩되는 상황에서 어떤 스타일이 우선순위로 적용되는지 살펴보겠습니다.

### 마지막에 작성된 스타일이 적용된다

```css
div {
  color: blue;
  color: red;
}
```

```html
<link rel="stylesheet" href="./src/style1.css">
<link rel="stylesheet" href="./src/style2.css">
```

### 명시도(Specificity)가 높은 선택자의 스타일이 적용된다

상위 명시도를 가진 선택자가 하나라도 있으면 아무리 하위 선택자의 개수가 많아도 상위 명시도를 가진 선택자의 스타일이 적용됩니다.

명시도의 우선순위는 

1. id 
2. class, 속성, 의사 클래스 
3. 요소, 의사 요소

입니다.

```css
/* (2,0,0) */
#parent-id #child-id {
  ...
}

/* (1,1,2) */
#parent-id .child-class div div {
  ...
}
```

인라인 스타일(`style="..."`)과 `!important`는 지금까지 살펴본 특성을 모두 무시하고 더 높은 명시도를 가집니다.

`!important`를 사용하는 것은 모든 종속성이나 규칙을 무시하고 디버깅을 어렵게 만들기 때문에 안티패턴으로 취급됩니다.

## 박스 모델과 여백 상쇄

### 박스 모델

- content
- padding
- border
- margin

box-sizing 프로퍼티는 요소의 너비와 높이를 계산하는 방식을 지정합니다.

- `box-sizing: content-box;`: == content
(width: 100px 값을 준다면 content 는 100px이 되며 padding, border는 별개로 계산됩니다.)

- `box-sizing: border-box;`: == content + padding + border
(width: 100px 값을 주고 양쪽 border의 합이 10px, 양쪽 padding의 합이 10px이라면 content 는 80px가 됩니다.)

### 여백 상쇄

인접한 같은 레벨의 블록 요소에 상하 여백이 겹치면 여백이 하나로 합쳐집니다. 이때 여백은 인접한 여백 중 큰 여백으로 상쇄됩니다.

여백 상쇄는 display 프로퍼티 값이 flex, grid일 때나 
position 프로퍼티 값이 absolute, float일 때는 적용되지 않습니다.

