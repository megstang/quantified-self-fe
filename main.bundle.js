/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var apiId = yummly.apiId;
	var apiKey = yummly.apiKey;

	var show = function show(elem) {
		elem.classList.add('is-visible');
	};

	var hide = function hide(elem) {
		elem.classList.remove('is-visible');
	};

	var toggle = function toggle(elem) {
		elem.classList.toggle('is-visible');
	};

	document.getElementById("nav-home").classList.add('active');

	function home() {
		document.getElementById("nav-home").classList.add('active');
		document.getElementById("nav-food").classList.remove('active');
		document.getElementById("nav-diary").classList.remove('active');
		document.getElementById("nav-recipes").classList.remove('active');
		show(document.getElementById('landing-page'));
		hide(document.getElementById('food-index-page'));
		hide(document.getElementById('diary-index-page'));
		hide(document.getElementById('recipe-index-page'));
		hide(document.getElementById('saved-recipe-index-page'));
	}

	function myFoods() {
		document.getElementById("nav-home").classList.remove('active');
		document.getElementById("nav-food").classList.add('active');
		document.getElementById("nav-diary").classList.remove('active');
		document.getElementById("nav-recipes").classList.remove('active');
		show(document.getElementById('food-index-page'));
		hide(document.getElementById('landing-page'));
		hide(document.getElementById('diary-index-page'));
		hide(document.getElementById('recipe-index-page'));
		hide(document.getElementById('saved-recipe-index-page'));
		getFoodIndex();
	}

	function myDiary() {
		document.getElementById("nav-home").classList.remove('active');
		document.getElementById("nav-food").classList.remove('active');
		document.getElementById("nav-diary").classList.add('active');
		document.getElementById("nav-recipes").classList.remove('active');
		show(document.getElementById('diary-index-page'));
		hide(document.getElementById('landing-page'));
		hide(document.getElementById('food-index-page'));
		hide(document.getElementById('recipe-index-page'));
		hide(document.getElementById('saved-recipe-index-page'));
		clearDiary();
		// getDiaryIndex();
		clearElements("food-grid", getDiaryIndex);
	}

	function generatedRecipes() {
		document.getElementById("nav-home").classList.remove('active');
		document.getElementById("nav-food").classList.remove('active');
		document.getElementById("nav-diary").classList.remove('active');
		document.getElementById("nav-recipes").classList.remove('active');
		hide(document.getElementById('landing-page'));
		hide(document.getElementById('food-index-page'));
		hide(document.getElementById('diary-index-page'));
		show(document.getElementById('recipe-index-page'));
		hide(document.getElementById('saved-recipe-index-page'));
	}

	function savedRecipes() {
		document.getElementById("nav-home").classList.remove('active');
		document.getElementById("nav-food").classList.remove('active');
		document.getElementById("nav-diary").classList.remove('active');
		document.getElementById("nav-recipes").classList.add('active');
		hide(document.getElementById('landing-page'));
		hide(document.getElementById('food-index-page'));
		hide(document.getElementById('diary-index-page'));
		hide(document.getElementById('recipe-index-page'));
		show(document.getElementById('saved-recipe-index-page'));
	}

	function clearDiary() {
		document.getElementById("breakfast").innerHTML = '';
		document.getElementById("lunch").innerHTML = '';
		document.getElementById("dinner").innerHTML = '';
		document.getElementById("snack").innerHTML = '';
	}

	function handleResponse(response) {
		return response.json().then(function (json) {
			if (!response.ok) {
				var error = {
					status: response.status,
					statusText: response.statusText,
					json: json
				};
				return Promise.reject(error);
			}
			return json;
		});
	};

	function addFood() {
		var nameInput = document.getElementById('new-name-input').value;
		var caloriesInput = document.getElementById('new-calories-input').value;
		if (nameInput && caloriesInput) {
			fetch('http://localhost:3000/api/v1/foods', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: nameInput,
					calories: caloriesInput
				})
			}).then(function (response) {
				handleResponse(response);
				clearElements('food-grid', myFoods);
			}).catch(function (response) {
				clearElements('food-grid', myFoods);
			});
		} else {
			alert("Both foods need to be filled In");
		}
	}

	function deleteFood(foodId) {
		fetch('http://localhost:3000/api/v1/foods/' + foodId, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		}).then(function () {
			clearElements('food-grid', myFoods);
		});
	};

	function deleteMealFood(foodId, mealId) {
		fetch('http://localhost:3000/api/v1/meals/' + mealId + '/foods/' + foodId, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		}).then(function () {
			clearElements('meal-food-item', myDiary);
		});
	};

	function getFoodIndex() {
		var foodItem = document.getElementById('food-item');
		if (foodItem == null) {
			fetch('http://localhost:3000/api/v1/foods').then(function (response) {
				return response.json();
			}).then(function (response) {
				displayFoods(response);
			});
		}
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
		$('#food-grid').append('\n\t\t<div class = "add-food">\n\t\t\t<h3 align = "center" id = "add-food-title">Add a Food</h3><br>\n\t\t\t<form>\n\t\t\t\t<input placeholder="Food Name" type=\'text\' name=\'Name\' id=\'new-name-input\'> </input>\n\t\t\t\t<br><br>\n\t\t\t\t<input placeholder="Calories" type=\'text\' name=\'Calories\' id=\'new-calories-input\'> </input>\n\t\t\t\t<br><br>\n\t\t\t\t<input type=\'submit\' value=\'Add\' onclick=\'addFood()\'> </input>\n\t\t\t</form>\n\t\t</div>');
		foodItemsArray.forEach(function (element) {
			var id = element.id;
			var name = element.name;
			var calories = element.calories;
			$('#food-grid').append('\n\t\t\t<div id ="food-item" >\n\t\t\t\t<h2 align ="center"><name id="{{\'food-name-\' + ' + name + '}}">' + name.toUpperCase() + '</name></h2><br>\n\t\t\t\t<h3 align ="center"><td align ="center" id="{{\'calories-\' + ' + calories + ' }}">' + calories + ' calories</td></h3><br>\n\t\t\t<select align="center" id="{{\'food-meal-\' + ' + id + ' }}" onchange="addToMeal(' + id + ')">\n\t\t\t\t<option>Add Food To...</option>\n\t\t\t\t<option>Breakfast</option>\n\t\t\t\t<option>Lunch</option>\n\t\t\t\t<option>Dinner</option>\n\t\t\t\t<option>Snack</option>\n\t\t\t</select><br>\n\t\t\t<button class = "btn" onclick=deleteFood(' + id + ')>Remove Food Item</button><br>\n\t\t\t<input type="checkbox" name=' + formatName(name, true) + ' id="checkbox-' + id + '" class="checkbox-inactive" onclick="toggleCheckbox(' + id + ')">Include in Recipe Search</input>\n\t\t\t</div>\n      ');
		});
	}

	function displayDiaryIndex(mealsArray) {
		var breakfastTable = document.getElementById("breakfast");
		var lunchTable = document.getElementById("lunch");
		var dinnerTable = document.getElementById("dinner");
		var snackTable = document.getElementById("snack");
		var breakCal = buildTable(breakfastTable, mealsArray.rows[0]);
		var dinnerCal = buildTable(dinnerTable, mealsArray.rows[2]);
		var snackCal = buildTable(snackTable, mealsArray.rows[3]);
		var lunchCal = buildTable(lunchTable, mealsArray.rows[1]);
		allMealCalories = breakCal + dinnerCal + snackCal + lunchCal;
		addCalorieTotalTable(allMealCalories);
	}

	function buildTable(tableElement, mealArray) {
		$(tableElement).append('\n\t\t<h2 align = "center">' + tableElement.id.toUpperCase() + '</h2>\n\t\t<tr>\n      <th>Name</th>\n      <th>Calories</th>\n    </tr>');
		var totalCalories = 0;
		mealArray.foods.forEach(function (food) {
			var id = food.food;
			var name = food.name;
			var calories = food.calories;
			var mealId = convertMealToId(mealArray.name);
			$(tableElement).append('\n\t\t\t<tr id ="meal-food-item" >\n\t\t\t\t<td>' + name.toUpperCase() + '</td>\n\t\t\t\t<td>' + calories + '</td>\n\t\t\t\t<td id ="minus" onclick=\'deleteMealFood(' + id + ', ' + mealId + ')\'> - </td>\n\t\t\t</tr>\n    ');
			totalCalories += calories;
		});
		addCalorieTotal(tableElement, totalCalories);
		return totalCalories;
	}

	function addCalorieTotalTable(mealCalorieTotal) {
		var totalsTable = $("#meal-calorie-totals");
		$(totalsTable).append('\n\t\t<tr>\n\t\t\t<td>Calories Consumed</td>\n\t\t\t<td>' + mealCalorieTotal + '</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>Remaining Calories</td>\n\t\t\t<td>' + (2000 - mealCalorieTotal) + '</td>\n\t\t</tr>\n\t');
	}

	function addCalorieTotal(tableElement, calories) {
		$(tableElement).append('\n\t\t<tr id ="calorie-total" >\n\t\t\t<td>Total Calories</td>\n\t\t\t<td id="total-calories">' + calories + '</td>\n\t\t</tr>\n\t');
	}

	function getDiaryIndex() {
		fetch('http://localhost:3000/api/v1/meals').then(function (response) {
			return handleResponse(response);
		}).then(function (response) {
			return displayDiaryIndex(response);
		});
	}

	function addToMeal(foodId) {
		var selection = document.getElementById('{{\'food-meal-\' + ' + foodId + ' }}').value;
		if (selection == "Add Food To...") {
			alert("Please select a meal using the dropdown menu");
		} else {
			var mealId = convertMealToId(selection);
			addMealFood(mealId, foodId, selection);
		}
	}

	function addMealFood(mealId, foodId, selection) {
		fetch('http://localhost:3000/api/v1/meals/' + ('' + mealId) + '/foods/' + ('' + foodId), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		}).then(function (response) {
			handleResponse(response);
			alert('Successfully added to ' + selection + ' diary');
		});
	}

	function convertMealToId(selection) {
		if (selection == "Breakfast") {
			return 1;
		} else if (selection == "Lunch") {
			return 2;
		} else if (selection == "Dinner") {
			return 3;
		} else {
			return 4;
		}
	}

	function clearElements(div_id, callback) {
		document.getElementById(div_id).innerHTML = '';
		callback();
	}

	function toggleCheckbox(id) {
		var element = document.getElementById('checkbox-' + id);
		if (element.classList == 'checkbox-inactive') {
			element.classList.remove('checkbox-inactive');
			element.classList.add('checkbox-active');
		} else {
			element.classList.remove('checkbox-active');
			element.classList.add('checkbox-inactive');
		}
	}

	function allActiveCheckboxes() {
		var activeCheckboxes = document.getElementsByClassName("checkbox-active");
		var chosenFoods = [];
		for (i = 0; i < activeCheckboxes.length; i++) {
			var name = formatName(activeCheckboxes[i].name);
			chosenFoods.push(name);
		}
		var foodsString = chosenFoods.join(" ");
		getRecipesApi(foodsString);
		generatedRecipes();
	}

	function formatName(name, fill) {
		if (fill) {
			return name.replace(/ /g, '-');
		} else {
			return name.replace(/-/g, ' ');
		}
	}

	function getRecipesApi(search) {
		fetch('http://api.yummly.com/v1/api/recipes?_app_id=' + apiId + '&_app_key=' + apiKey + '&q=' + search).then(function (response) {
			return response.json();
		}).then(function (response) {
			getRecipeInfo(response);
		});
	}

	function getRecipeInfo(response) {
		response.matches.forEach(function (yummly) {
			var imageUrl = yummly.imageUrlsBySize[90];
			var recipeTitle = yummly.recipeName;
			var recipeId = yummly.id;
			displayRecipe(imageUrl, recipeTitle, recipeId);
		});
	}

	function displayRecipe(image, title, id) {
		var recipeUrl = 'https://www.yummly.com/recipe/' + id;
		// var imagetitleid= `${image} ${title} ${id}`;
		$('.recipe-grid').append('\n\t\t<div id=' + id + '>\n\t\t\t<h2 align = "center">' + title + '</h2>\n\t\t\t<a onclick="location.href=\'https://www.yummly.com/recipe/' + id + '\'"><img align="center" width = 100px  src=' + image + '></a>\n\t\t\t<button onclick= "saveRecipe(\'' + image + '\',\'' + title + '\',\'' + id + '\')">Save Recipe</button>\n\t\t</div>\n\t\t');
	}

	function saveRecipe(image, title, id) {
		alert('This recipe has been saved to your Recipes tab');
		var recipeUrl = 'https://www.yummly.com/recipe/' + id;
		$('.saved-recipe-grid').append('\n\t\t<div id=' + id + '>\n\t\t\t<h2 align = "center">' + title + '</h2>\n\t\t\t<a onclick="location.href=\'https://www.yummly.com/recipe/' + id + '\'"><img align="center" width = 100px  src=' + image + '></a>\n\t\t</div>\n\t\t');
	}

/***/ })
/******/ ]);