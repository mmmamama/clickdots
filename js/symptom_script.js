function search() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var results = document.getElementById("results").getElementsByTagName("p");

  for (var i = 0; i < results.length; i++) {
    results[i].style.display = "none";
  }

  for (var j = 0; j < checkboxes.length; j++) {
    if (checkboxes[j].checked) {
      var category = checkboxes[j].id.replace("checkbox-", "");
      var categoryResults = document.querySelectorAll(
        '[data-category="' + category + '"]'
      );
      for (var k = 0; k < categoryResults.length; k++) {
        categoryResults[k].style.display = "block";
        // 링크 추가
        var link = document.createElement("a");
        var link = document.getElementById("link-a1");
        link.href = "symptom.html#a1";
        categoryResults[k].appendChild(link);
      }
    }
  }
}

// 페이지 로드 후 URL의 해시값 가져오기
window.addEventListener("DOMContentLoaded", function () {
  var category = window.location.hash.substr(1); // 해시값의 첫 번째 문자(#) 제거

  // 결과 요소들 숨기기
  var results = document.getElementsByClassName("result");
  for (var i = 0; i < results.length; i++) {
    results[i].style.display = "none";
  }

  // 해당 카테고리 결과 요소 보여주기
  var resultElement = document.querySelector(
    '[data-category="' + category + '"]'
  );
  if (resultElement) {
    resultElement.style.display = "block";
  }
});

function toggleDetails(element) {
  var details = element.nextElementSibling;
  details.classList.toggle("show");
}
