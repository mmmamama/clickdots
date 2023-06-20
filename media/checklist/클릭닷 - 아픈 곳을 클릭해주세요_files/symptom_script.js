function search() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var results = document.getElementById("results").getElementsByTagName("p");

  // 모든 결과 요소를 숨김
  for (var i = 0; i < results.length; i++) {
    results[i].style.display = "none";
  }

  var selectedCategories = []; // 선택된 카테고리를 담을 배열

  // 체크된 체크박스의 카테고리를 수집
  for (var j = 0; j < checkboxes.length; j++) {
    if (checkboxes[j].checked) {
      var category = checkboxes[j].id.replace("checkbox-", "");
      selectedCategories.push(category);
    }
  }

  // 선택된 카테고리에 해당하는 결과를 보여줌
  for (var k = 0; k < selectedCategories.length; k++) {
    var categoryResults = document.querySelectorAll(
      '[data-category="' + selectedCategories[k] + '"]'
    );
    for (var l = 0; l < categoryResults.length; l++) {
      categoryResults[l].style.display = "block";
      // 링크 추가
      var link = document.createElement("a");
      link.href = "symptom.html#" + selectedCategories[k];
      categoryResults[l].appendChild(link);
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
