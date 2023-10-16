/*
  
*/
const ouohoon = (function () {
  /*
    options: 목차 생성 옵션
      content: 목차로 만들 컨텐츠 요소
      headings: 파싱할 요소
    Toc 생성 함수
  */
  function makeToc(options) {
    options = {
      content: ".contents_style",
      headings: ["h1", "h2", "h3", "h4"],
      ...options,
    };

    const parsingData = parseContent(options.content, options.headings);
    const htmlString = toHtmlString(parsingData);

    $(options.content).prepend(htmlString);
  }

  /*
    content: 파싱 대상 루트 DOM
    headings: 찾을 요소

    사용자가 H2, H1, H3 처럼 잘못된 계층 구조로 작성하는 경우는 신경쓰지 않는다.
  */
  function parseContent(content, headings) {
    const contentSelector = $(content);
    const findList = contentSelector.find(headings.join(","));
    return findList;
  }

  /*
    parsingData: 파싱한 결과 리스트
    헤딩 요소들에 id를 설정하고 id에 맞는 링크 요소를 만든다.
  */
  function toHtmlString(parsingData) {
    let htmlString = `<div class="ouohoon-toc-wrapper"><span class="ouohoon-toc-title">목차</span>`;
    for (const node of parsingData) {
      const uniqueId = createUniqueId(node);
      $(node).attr("id", uniqueId);
      htmlString += createLinkElementHtml(node, uniqueId);
    }
    htmlString += "</div>";
    return htmlString;
  }

  /*
    링크 html 생성하기
  */
  function createLinkElementHtml(node, uniqueId) {
    return `<p class="ouohoon-${node.localName}"><a href="#${uniqueId}">${node.innerText}</a></p>`;
  }

  /*
    고유 id 생성하기
    설마 이 안에서 중복이 발생할까..?
  */
  function createUniqueId(node) {
    return node.innerText + Math.trunc(Math.random() * 100000);
  }

  /*
    내가 만든 스타일 추가하기
  */
  function addStyle() {
    const styleString = `    
    <style>
    .ouohoon-toc-wrapper {
      border: 1px solid black;
      padding: 10px;
      width: 300px;
    }
    .ouohoon-toc-wrapper p{
      margin: 8px 0px 0px 8px;
    }

    .ouohoon-toc-wrapper a{
      text-decoration: none;
      color: black;
    }

    .ouohoon-toc-title {
      font-size: x-large;
      font-weight: bold;
    }

    .ouohoon-h1 {
      padding-left: 0px;
    }
    .ouohoon-h2 {
      padding-left: 15px;
    }
    .ouohoon-h3 {
      padding-left: 25px;
    }
    .ouohoon-h4 {
      padding-left: 35px;
    }
    .ouohoon-h5 {
      padding-left: 45px;
    }
    .ouohoon-h6 {
      padding-left: 55px;
    }
  </style>;`;
    $("head").append(styleString);
  }

  return {
    toc: makeToc,
    addStyle: addStyle,
  };
})();

// 테스트 코드

// $().ready(function () {
//   ouohoon.toc();
//   ouohoon.addStyle();
// });
