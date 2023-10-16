# my-toc
티스토리 목차 생성용 스크립트입니다.
Square 스킨에서 사용하려고 만들었습니다.

## 사용법
Jquery가 필요합니다. 저는 3.7.1 버전으로 만들었지만 기본적인 기능만 사용했으니 버전 문제는 없을거라고 생각합니다.


ouohoon.toc()를 호출하면 목차가 생기고, ouohoon.addStyle()을 호출하면 기본 스타일이 적용됩니다.


Square 스킨에서는 contents_style div 요소가 여러 개 있을 수 있어서 하나씩 적용해줘야 합니다.

저는 아래와 같이 여러 contents_style에 index 값을 주고 하나씩 적용했습니다.

```html
<script>
$(document).ready(function () {
	$.each($('.contents_style'), function(i, value) {
		$(value).addClass(`ouohoon-toc-${i}`);
		ouohoon.toc({content: `.ouohoon-toc-${i}`});
	});
	ouohoon.addStyle();
});
</script>
```
