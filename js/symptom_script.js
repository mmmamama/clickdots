function search() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var results = document.getElementById('results').getElementsByTagName('p');
  
    for (var i = 0; i < results.length; i++) {
      results[i].style.display = 'none';
    }
  
    for (var j = 0; j < checkboxes.length; j++) {
      if (checkboxes[j].checked) {
        var category = checkboxes[j].id.replace('checkbox-', '');
        var categoryResults = document.querySelectorAll('[data-category="' + category + '"]');
        for (var k = 0; k < categoryResults.length; k++) {
          categoryResults[k].style.display = 'block';
        }
      }
    }
  }
  