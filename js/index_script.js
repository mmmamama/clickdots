// 버튼 클릭 시 스크롤 이동
document.getElementById('scroll-button').addEventListener('click', function(event) {
    event.preventDefault(); // 기본 동작 중단
    const bodElement = document.getElementById('bod');
    bodElement.scrollIntoView({ behavior: 'smooth' }); // 부드럽게 스크롤 이동
  });

//   function togglePopup(head, shoulder, chest, belly, important, leftarm, rightarm, heobukji, knee, ankle, foot) {
//     var popup = document.getElementById("popup-" + head, shoulder, chest, belly, important, leftarm, rightarm, heobukji, jongari, ankle, foot);
//     if (popup.style.display === "none") {
//       popup.style.display = "block";
//     } else {
//       popup.style.display = "none";
//     }
//   }


//   // 다른 팝업 닫기
//   var popups = document.getElementsByClassName("popup");
//   for (var i = 0; i < popups.length; i++) {
//     var otherPopup = popups[i];
//     if (otherPopup.id !== "popup-" + id) {
//       otherPopup.style.display = "none";
//     }
//   }

function togglePopup(id) {
    var popup = document.getElementById("popup-" + id);
    if (popup.style.display === "none") {
      popup.style.display = "block";
    } else {
      popup.style.display = "none";
    }
  
    // 다른 팝업 닫기
    var popups = document.getElementsByClassName("popup");
    for (var i = 0; i < popups.length; i++) {
      var otherPopup = popups[i];
      if (otherPopup.id !== "popup-" + id) {
        otherPopup.style.display = "none";
      }
    }
  }
  

  var menuLinks = document.querySelectorAll('.nav_text');

  menuLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      menuLinks.forEach(function(link) {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
  