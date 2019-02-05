
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
	show(document.getElementById('diary-index-page'));
  hide(document.getElementById('landing-page'));
	getDiaryIndex();
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
	if (nameInput && caloriesInput) {
		fetch('http://localhost:3000/api/v1/foods', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: nameInput,
				calories: caloriesInput,
			})
		})
		.then((response) => {
			handleResponse(response)
		});
  } else {
		alert("Both foods need to be filled In")
	}
}

function deleteFood(foodId) {
	fetch(`http://localhost:3000/api/v1/foods/${foodId}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	})
	.then(()=> {
		clearElements('food-grid',myFoods());
	})
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
  grid = document.getElementById("food-grid");
  div = grid.getElementsByTagName("div");
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
				<name align ="center" id="{{'food-name-' + ${name}}}">${name.toUpperCase()}</name><br>
				<td align ="center" id="{{'calories-' + ${calories} }}">${calories}</td><br>
			<select align="left" id="{{'food-meal-' + ${id} }}">
				<option>Choose Meal</option>
				<option>Breakfast</option>
				<option>Lunch</option>
				<option>Dinner</option>
				<option>Snack</option>
			</select>
			<button class = "btn" onclick=addToMeal(${id})>+</button>
			<button class = "btn" onclick=deleteFood(${id})>Remove Food Item</button>
			</div>
      `)
  });
}


function displayDiaryIndex (mealsArray) {
	var breakfastTable = document.getElementById("breakfast")
	var lunchTable     = document.getElementById("lunch")
	var dinnerTable    = document.getElementById("dinner")
	var snackTable     = document.getElementById("snack")
	buildTable(breakfastTable, mealsArray.rows[0]);
	buildTable(dinnerTable, mealsArray.rows[1]);
	buildTable(snackTable, mealsArray.rows[2]);
  buildTable(lunchTable, mealsArray.rows[3]);
	addCalorieTotalTable();
}

function buildTable(tableElement, mealArray) {
	var totalCalories = 0
  mealArray.foods.forEach(function(food) {
    var id = food.id;
    var name = food.name;
    var calories = food.calories;
		$(tableElement).append(`
			<tr id ="food-item" >
				<td id="{{'food-name-' + ${name}}}">${name.toUpperCase()}</td>
				<td id="{{'calories-' + ${calories} }}">${calories}</td>
			</tr>
    `)
		totalCalories += calories
  });
	addCalorieTotal(tableElement, totalCalories);
}

function addCalorieTotalTable () {
	var totalsTable = $("#calorie-totals");
	var breakfastCalories = $("table#breakfast tr#calorie-total td#total-calories").text();
	var lunchCalories     = $("table#lunch tr#calorie-total td#total-calories").text();
	var dinnerCalories    = $("table#dinner tr#calorie-total td#total-calories").text();
	var snackCalories     = $("table#snack tr#calorie-total td#total-calories").text();
	var mealCalorieTotal = parseInt(breakfastCalories) + parseInt(lunchCalories) + parseInt(dinnerCalories) + parseInt(lunchCalories);
	$(totalsTable).append(`
		<tr>
			<td>Calories Consumed</td>
			<td>${mealCalorieTotal}</td>
		</tr>
		<tr>
			<td>Remaining Calories</td>
			<td>${2000 - mealCalorieTotal}</td>
		</tr>
	`)
}

function addCalorieTotal (tableElement, calories) {
	$(tableElement).append(`
		<tr id ="calorie-total" >
			<td>Total Calories</td>
			<td id="total-calories">${calories}</td>
		</tr>
	`)
}

function  getDiaryIndex() {
	fetch('http://localhost:3000/api/v1/meals')
	.then(function(response) {
		return handleResponse(response);
	})
	.then((response) => {
		return displayDiaryIndex(response)
	})
}


function addToMeal(foodId){
	var selection = document.getElementById(`{{'food-meal-' + ${foodId} }}`).value
	if(selection == "Choose Meal"){
		alert("Please select a meal using the dropdown menu")
	}
	else{
		var mealId = convertMealToId(selection);
		addMealFood(mealId,foodId,selection);
	}
}

function addMealFood(mealId,foodId,selection){
	fetch('http://localhost:3000/api/v1/meals/'+`${mealId}`+'/foods/'+ `${foodId}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	})
	.then(function(response) {
		handleResponse(response)
		alert(`Successfully added to ${selection} diary`)
	})
}

function convertMealToId(selection){
	if(selection == "Breakfast"){
		return 1
	}
	else if(selection == "Lunch"){
		return 2
	}
	else if(selection == "Dinner"){
		return 3
	}
	else{
		return 4
	}
}


function clearElements(div_id, callback) {
  document.getElementById(div_id).innerHTML = '';
  callback();
}
