
var show = function (elem) {
	elem.classList.add('is-visible');
};

var hide = function (elem) {
	elem.classList.remove('is-visible');
};

var toggle = function (elem) {
	elem.classList.toggle('is-visible');
};

function myFoods(){
  show(document.getElementById('food-index-page'));
  hide(document.getElementById('landing-page'));
	getFoodIndex();
}

function myDiary(){

}


function handleResponse(response) {
  return response.json()
    .then((json) => {
      if (!response.ok) {
        const error = {
          status: response.status,
          statusText: response.statusText,
          json
        }
        return Promise.reject(error)
      }
      return json
    })
};

function foodIndex() {
	var nameInput = document.getElementById('new-name-input').value;
	var caloriesInput = document.getElementById('new-calories-input').value;
	fetch('http://localhost:3000/api/v1/foods', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameInput,
      calories: caloriesInput,
		})
	})
	.then((response) => { handleResponse(response) })
};

function getFoodIndex() {
	fetch('http://localhost:3000/api/v1/foods')
	.then(function(response) {
		return response.json();
	})
	.then((response) => {
		displayFoods(response)
	})
};

function searchFoods() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchFoods");
  filter = input.value.toUpperCase();
  table = document.getElementById("food-grid");
  div = table.getElementsByTagName("div");
  for (i = 0; i < div.length; i++) {
    td = div[i].getElementsByTagName("name")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
      }
    }
  }
};

function displayFoods(foodItemsArray) {
  var count = 0;
  foodItemsArray.forEach(function(element) {
    var id = element.id;
    var name = element.name;
    var calories = element.calories;
    $('#food-grid').append(`
			<div id ="food-item" >
				<name id="{{'food-name-' + ${name}}}">${name.toUpperCase()}</name>
				<td id="{{'calories-' + ${calories} }}">${calories}</td>
			<select id="{{'food-meal-' + ${id} }}">
				<option>Choose Meal</option>
				<option>Breakfast</option>
				<option>Lunch</option>
				<option>Dinner</option>
				<option>Snack</option>
			</select>
			</div>
      `)
  });
}
