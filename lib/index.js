
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
  show(document.getElementById('food-index-page'))
  hide(document.getElementById('landing-page'))
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
}

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
}
