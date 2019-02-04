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

	var show = function show(elem) {
		elem.classList.add('is-visible');
	};

	var hide = function hide(elem) {
		elem.classList.remove('is-visible');
	};

	var toggle = function toggle(elem) {
		elem.classList.toggle('is-visible');
	};

	function myFoods() {
		show(document.getElementById('food-index-page'));
		hide(document.getElementById('landing-page'));
		getFoodIndex();
	}

	function myDiary() {
		show(document.getElementById('diary-index-page'));
		hide(document.getElementById('landing-page'));
		getDiaryIndex();
	}

	function searchFoods() {
		var input, filter, table, tr, td, i, txtValue;
		input = document.getElementById("searchFoods");
		filter = input.value.toUpperCase();
		table = document.getElementById("food-grid");
		tr = table.getElementsByTagName("tr");
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[0];
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			}
		}
	};

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

	function foodIndex() {
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
			});
		} else {
			alert("Both foods need to be filled In");
		}
	}

	function deleteFood(foodId) {
		fetch('http://localhost:3000/api/v1/foods/' + foodId, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});
	};

	function getFoodIndex() {
		fetch('http://localhost:3000/api/v1/foods').then(function (response) {
			return response.json();
		}).then(function (response) {
			displayFoods(response);
		});
	};

	function displayFoods(foodItemsArray) {
		var count = 0;
		foodItemsArray.forEach(function (element) {
			var id = element.id;
			var name = element.name;
			var calories = element.calories;
			$('#food-grid').append('\n\t\t\t<tr id ="food-item" >\n\t\t\t\t<td id="{{\'food-name-\' + ' + name + '}}">' + name.toUpperCase() + '</td>\n\t\t\t\t<td id="{{\'calories-\' + ' + calories + ' }}">' + calories + '</td>\n\t\t\t</tr>\n      ');
		});
	}

	function displayDiaryIndex(mealsArray) {
		var breakfastTable = document.getElementById("breakfast");
		var lunchTable = document.getElementById("lunch");
		var dinnerTable = document.getElementById("dinner");
		var snackTable = document.getElementById("snack");
		buildTable(breakfastTable, mealsArray.rows[0]);
		buildTable(dinnerTable, mealsArray.rows[1]);
		buildTable(snackTable, mealsArray.rows[2]);
		buildTable(lunchTable, mealsArray.rows[3]);
	}

	function buildTable(tableElement, mealArray) {
		mealArray.foods.forEach(function (food) {
			var id = food.id;
			var name = food.name;
			var calories = food.calories;
			var row = tableElement.insertRow(1);
			var foodName = row.insertCell(0);
			var foodCalories = row.insertCell(1);
			foodName.innerHTTML = name;
			foodCalories.innerHTTML = calories;
		});
	}

	function getDiaryIndex() {
		fetch('http://localhost:3000/api/v1/meals').then(function (response) {
			return handleResponse(response);
		}).then(function (response) {
			return displayDiaryIndex(response);
		});
	}

/***/ })
/******/ ]);