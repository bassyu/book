# 시맨틱하게 HTML 작성하기

> "Semantic"이라는 단어는 '의미의', '의미론적인'으로 해석됩니다. 즉 의미에 맞는 태그를 사용해 문서를 작성하는 것을 말합니다.
> 예를 들어 특별한 의미가 없는 `<div>` 태그를 대신해 `<section>`, `<article>`, `<footer>`, `<nav>`, `<aside>` 처럼 의미 있는 태그를 상황에 따라 사용하는 것입니다.

<br/><br/>

## 어떻게 해야 시맨틱하게 작성하는 것일까?

### `<h1>`~`<h6>`

각 섹션의 제목을 나타냅니다. 각 제목의 구획 단계는 `<h1>`이 가장 높고 `<h6>`이 가장 낮습니다.
```
<h1>[news] 00구 00동에 진도 4.0 지진 발생</h1>
```

### `<header>`

제목이나 대표 이미지가 들어가는 요소입니다. `<body>`의 하위로 작성되면 웹 페이지의 전체 해더를 정의하는 영역이며,
`<article>` 또는 `<section>` 등 Sectioning Content의 하위로 사용되면 해당 영역의 헤더를 의미합니다.
일반적으로 `<h1>` 등의 요소나 로고 등을 포함합니다.
```
<article>
  <header>
    <h1>[news] 00구 00동에 진도 4.0 지진 발생</h1>
    <p>00일보 00 기자 작성</p>
  </header>
  <p>11시 30분 00구 00동에 진도 4.0 지진이 발생했다...</p>
</article>
```

### `<footer>`

`<header>` 요소와 마찬가지로 전체 문서 또는 Sectioning Content의 바닥글로 쓰입니다.
이 영역에는 작성자나 관련 문서 링크, 라이선스, 색인 등의 데이터가 들어갑니다.
```
<article>
  <p>11시 30분 00구 00동에 진도 4.0 지진이 발생했다...</p>
  <footer>
    <p>기자: 00일보 00</p>
    <p>모든 콘텐츠(기사)는 저작권법의 보호를 ... </p>
  </footer>
</article>
```

### `<main>`
페이지의 콘텐츠 영역을 의미합니다. `<main>` 은 페이지당 한 번 사용하며 `<main>` 아래 직접 추가합니다. 이 요소는 다른 요소 내에 중첩되지 않아야 합니다.
```
<body>
  <header>
    ...
  </header>
  <main>
    <article>...</article>
    <article>...</article>    
  </main>
  <footer>...</footer>
</body>
```

### `<article>`
요소 자체가 하나의 의미 있는 콘텐츠 블록 영역입니다. 즉 이 요소만으로 단일 게시물을 나타낼 때 사용합니다. 이 요소의 내용은 독립적으로 배포하거나 재사용됩니다. 블로그 항목이나 게시물, 기사, 위젯 등에 사용됩니다.
```
<article>
  <img src="./img.png">
  <h1>[news] 00구 00동에 진도 4.0 지진 발생</h1>
  <p>30분 전 작성...</p>
</article>
<article>
  <img src="./img.png">
  <h1>올해 한국 과학자가 노벨상?</h1>
  <p>1시간 전 작성...</p>
</article>
```

### `<section>`
`<article>` 과 유사하지만 페이지의 단일 부분을 그룹화하는 데에 유용한 요소입니다. 예를 들어 기사의 헤드라인을 모으거나 각 블로그의 피드 정보가 나타나는 영역으로 사용됩니다. 요소의 콘텐츠를 함께 묶는 것이 합리적일 때 `<article>` 대신 `<section>` 요소를 사용하는 것이 좋습니다. 다만, 섹션은 일반 컨테이너 요소가 아니기 때문에 단순 스타일링을 위한 요소로 사용할 때는 `<div>` 를 사용하는 것을 권장합니다.
```
<h1>결혼식 식순</h1>
<section>
  <h2>식순</h2>
  <p>개식사</p>
  <p>주례 소개</p>
  <p>신랑 신부 입장</p>
  <p>...</p>
</section>
<section>
  <h2>피로연</h2>
  <p>하객 인사</p>
  <p>케이크 커팅</p>
  <p>...</p>
</section>
```

### `<aside>`
기본 콘텐츠와는 직접 관련이 없지만 간접적으로 관련된 추가 정보를 포함하는 요소입니다. `<nav>` 요소나 광고, 인용처럼 분리된 콘텐츠를 나타낼 때 사용합니다.
```
<p>React를 사용하다 보면, 'render() 함수는 React 엘리먼트 트리를 만드는 것이다.' 라는 생각이 드는 순간이 있습니다. state나 props가 갱신되면 render() 함수는 새로운 React 엘리먼트 트리를 반환합니다. 이때 React는 방금 만들어진 트리에 맞게 가장 효과적으로 UI를 갱신하는 방법을 알아낼 필요가 있습니다.</p>

<asice>render에 대한 설명은 "https://ko.reactjs.org/docs/rendering-elements.html" 에서 확인할 수 있습니다.</aside>
```

### `<nav>`
다른 페이지 또는 내 문서의 특정 영역(탐색 링크가 있는 섹션)으로 이동시키는 링크를 나타냅니다.
```
<nav>
  <ul>
    <li><a href="/">홈으로 이동</a></li>
    <li><a href="/news.html">뉴스</a></li>
    <li><a href="/live.html">라이브 방송</a></li>
  </ul>
</nav>
```