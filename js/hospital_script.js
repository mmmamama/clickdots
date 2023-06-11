function initMap() {
    var map = new naver.maps.Map('map');
// XML 데이터를 처리하는 함수
function processXMLData(xmlData) {
    // 병원 정보를 담을 배열 선언
    var hospitals = [];
  
    // XML에서 병원 요소들을 선택
    var hospitalElements = xmlData.getElementsByTagName("hospital");
  
    // 각 병원 요소를 순회하며 정보 추출
    for (var i = 0; i < hospitalElements.length; i++) {
      var hospitalElement = hospitalElements[i];
  
      // 병원 이름 추출
      var name = hospitalElement.getElementsByTagName("name")[0].textContent;
  
      // 진료과목 추출
      var specialty = hospitalElement.getElementsByTagName("specialty")[0].textContent;
  
      // 진료시간 추출
      var openingHours = hospitalElement.getElementsByTagName("openingHours")[0].textContent;
  
      // 병원 주소 추출
      var address = hospitalElement.getElementsByTagName("address")[0].textContent;
  
      // 전화번호 추출
      var phoneNumber = hospitalElement.getElementsByTagName("phoneNumber")[0].textContent;
  
      // 좌표 추출 (geocode에 필요한 정보)
      var latitude = parseFloat(hospitalElement.getElementsByTagName("latitude")[0].textContent);
      var longitude = parseFloat(hospitalElement.getElementsByTagName("longitude")[0].textContent);
  
      // 추출한 정보를 객체로 저장
      var hospitalInfo = {
        name: name,
        specialty: specialty,
        openingHours: openingHours,
        address: address,
        phoneNumber: phoneNumber,
        latitude: latitude,
        longitude: longitude
      };
  
      // 병원 정보 배열에 추가
      hospitals.push(hospitalInfo);
    }
  
    return hospitals;
  }
  
  // XML 데이터를 가져오는 함수
  function fetchData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var xmlData = xhr.responseXML;
        // 가져온 XML 데이터를 처리하는 함수 호출
        var hospitals = processXMLData(xmlData);
        // 병원 정보 배열을 활용하여 지도에 표시
        showHospitalsOnMap(hospitals);
      }
    };
    xhr.open("GET", "safemap.go.kr/openApiService/data/getTotHospitalData.do", true);
    xhr.send();
  }
  
  // 병원 정보를 지도에 표시하는 함수
  function showHospitalsOnMap(hospitals) {
    var map = new naver.maps.Map('map');
  
    for (var i = 0; i < hospitals.length; i++) {
      var hospital = hospitals[i];
      var address = hospital.address;
      var latitude = hospital.latitude;
      var longitude = hospital.longitude;
  
      insertAddress(address, latitude, longitude);
    }
  }
  
  // 나머지 코드는 그대로 유지합니다.
  
  // fetchData 함수 호출하여 XML 데이터 가져오기 시작
  fetchData();
  
    function insertAddress(address, latitude, longitude) {
        var mapList = "";
        mapList += "<tr>"
        mapList += "	<td>" + address + "</td>"
        mapList += "	<td>" + latitude + "</td>"
        mapList += "	<td>" + longitude + "</td>"
        mapList += "</tr>"
    
        //$('#mapList').append(mapList);	
        console.log(mapList);
        var map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(longitude, latitude),
            zoom: 14
        });
        var marker = new naver.maps.Marker({
            map: map,
            position: new naver.maps.LatLng(longitude, latitude),
        });
        
    }
    function searchHospitals(area) {
        var geocoder = naver.maps.Service.geocode(area, function(status, response){
            console.log(response.v2);
            items = response.v2.addresses[0];
            insertAddress(items.roadAddress, items.x, items.y)
            
          
        });
  
      }
    function searchHospitalsByArea(area) {
      var geocoder = naver.maps.Service.geocode({query : area}, function(status, response){
        
        var items = response.v2.addresses[0];

        if (status === naver.maps.Service.Status.ERROR) {
            console.log('주소 변환 실패');
            return;
          }
    
          if (response.v2.meta.totalCount === 0) {
            console.log('검색 결과 없음');
            return;
          }
    
          var center = new naver.maps.LatLng(items.y, items.x);
          map.setCenter(center);
    
          var marker = new naver.maps.Marker({
            position: center,
            map: map
          });
    
          var request = {
            query: area,
            location: marker.position,
            radius: 500, // 검색 반경 설정 (500m)
            type: "병원" // 병원 타입 설정
          };         
          searchHospitals(request)
      });

    }
  
    document.getElementById('search-form').addEventListener('click', function(event) {
      event.preventDefault(); // 폼 제출 기본 동작 막기
  
      var query = document.getElementById('search-input').value;
  
      searchHospitalsByArea(query);
    });
  }
  


  var infoWindow = new naver.maps.InfoWindow({
    anchorSkew: true
});


function searchCoordinateToAddress(latlng) {

    infoWindow.close();

    naver.maps.Service.reverseGeocode({
        coords: latlng,
        orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR
        ].join(',')
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }

        var items = response.v2.results,
            address = '',
            htmlAddresses = [];

        for (var i=0, ii=items.length, item, addrType; i<ii; i++) {
            item = items[i];
            address = makeAddress(item) || '';
            addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

            htmlAddresses.push((i+1) +'. '+ addrType +' '+ address);
        }

        infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));

        infoWindow.open(map, latlng);
    });
}

function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode({
        query: address
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }

        if (response.v2.meta.totalCount === 0) {
            return alert('totalCount' + response.v2.meta.totalCount);
        }

        var htmlAddresses = [],
            item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y);

        if (item.roadAddress) {
            htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
        }

        if (item.jibunAddress) {
            htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
        }

        if (item.englishAddress) {
            htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
        }

        infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 주소 : '+ address +'</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));

        map.setCenter(point);
        infoWindow.open(map, point);
    });
}

function initGeocoder() {
    map.addListener('click', function(e) {
        searchCoordinateToAddress(e.coord);
    });

    $('#address').on('keydown', function(e) {
        var keyCode = e.which;

        if (keyCode === 13) { // Enter Key
            searchAddressToCoordinate($('#address').val());
        }
    });

    $('#submit').on('click', function(e) {
        e.preventDefault();

        searchAddressToCoordinate($('#address').val());
    });

    searchAddressToCoordinate('정자동 178-1');
}

function makeAddress(item) {
    if (!item) {
        return;
    }

    var name = item.name,
        region = item.region,
        land = item.land,
        isRoadAddress = name === 'roadaddr';

    var sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

    if (hasArea(region.area1)) {
        sido = region.area1.name;
    }

    if (hasArea(region.area2)) {
        sigugun = region.area2.name;
    }

    if (hasArea(region.area3)) {
        dongmyun = region.area3.name;
    }

    if (hasArea(region.area4)) {
        ri = region.area4.name;
    }

    if (land) {
        if (hasData(land.number1)) {
            if (hasData(land.type) && land.type === '2') {
                rest += '산';
            }

            rest += land.number1;

            if (hasData(land.number2)) {
                rest += ('-' + land.number2);
            }
        }

        if (isRoadAddress === true) {
            if (checkLastString(dongmyun, '면')) {
                ri = land.name;
            } else {
                dongmyun = land.name;
                ri = '';
            }

            if (hasAddition(land.addition0)) {
                rest += ' ' + land.addition0.value;
            }
        }
    }

    return [sido, sigugun, dongmyun, ri, rest].join(' ');
}

function hasArea(area) {
    return !!(area && area.name && area.name !== '');
}

function hasData(data) {
    return !!(data && data !== '');
}

function checkLastString (word, lastString) {
    return new RegExp(lastString + '$').test(word);
}

function hasAddition (addition) {
    return !!(addition && addition.value);
}

naver.maps.onJSContentLoaded = initGeocoder;


function toggleDetails(element) {
    var details = element.nextElementSibling;
    details.classList.toggle("show");
  }


  