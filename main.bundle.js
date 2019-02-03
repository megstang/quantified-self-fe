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
	}

	function myDiary() {}

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
	}

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
			alert("Both fields should be filled In");
		}

/***/ })
/******/ ]);
