var arrTodo = JSON.parse(localStorage.getItem('todo')),
		elem = document,
		inp = elem.getElementById('input_text'),
		add = elem.getElementById('add'),
		edit = elem.getElementById('edit'),
		rev = elem.getElementById('rev'),
		del = elem.getElementById('del'),
		delAll = elem.getElementById('delAll'),
		clear = elem.getElementById('clear'),
		task = elem.getElementById('task'),
		row = elem.getElementById('row'),
		checkBox = elem.querySelectorAll('input[checked]');

if (arrTodo) {
	showTask();
}

add.onclick = function () {
	if (!inp.value) {
		alert('No data!');
		return;
	}
	if (!arrTodo) arrTodo = [];

	var todo = {
		text: inp.value,
		date: dateConversion()
	};
	arrTodo.push(todo);

	localStorage.setItem('todo', JSON.stringify(arrTodo));
	window.location.reload();
};

rev.onclick = function() {
	arrTodo.reverse();
	localStorage.setItem('todo', JSON.stringify(arrTodo));
	window.location.reload();
};

delAll.onclick = function() {
	if(!task.firstChild) {
		alert('The list is empty!');
	} else {
		localStorage.clear();
	}
	window.location.reload();
};

clear.onclick = function() {
	inp.value = '';
};

function showTask() {
	arrTodo.forEach(function (el, i){
		var div = document.createElement('div');
		div.setAttribute('id', i);
		div.setAttribute('class', 'rows');

		var spanTime = document.createElement('span');
		var textTime = document.createTextNode(el.date);
		spanTime.setAttribute('class', 'time');
		spanTime.appendChild(textTime);
		div.appendChild(spanTime);

		var span = document.createElement('h2');
		span.setAttribute('class', 'inp-val');
		span.innerText = el.text;
		div.appendChild(span);

		var inputCh = document.createElement('input');
		inputCh.setAttribute('type', 'checkbox');
		div.appendChild(inputCh);

		var buttonDel = document.createElement('button');
		buttonDel.setAttribute('class', 'delete');
		buttonDel.innerText = 'Del';

		div.append(buttonDel);
		task.append(div);

		buttonDel.onclick = function (e) {
			e.target.parentNode.remove();
			arrTodo.splice(arrTodo.indexOf(e.target.parentNode.id), 1);
			localStorage.setItem('todo', JSON.stringify(arrTodo));
		};
	});
}

function dateConversion() {
	var Data = new Date(),
		Year = Data.getFullYear(),
		Month = Data.getMonth(),
		Day = Data.getDate(),
		Hour = Data.getHours(),
		Minutes = Data.getMinutes(),
		Seconds = Data.getSeconds(),
		dateInput;

	switch (Month) {
		case 0: fMonth="января"; break;
		case 1: fMonth="февраля"; break;
		case 2: fMonth="марта"; break;
		case 3: fMonth="апреля"; break;
		case 4: fMonth="мае"; break;
		case 5: fMonth="июня"; break;
		case 6: fMonth="июля"; break;
		case 7: fMonth="августа"; break;
		case 8: fMonth="сентября"; break;
		case 9: fMonth="октября"; break;
		case 10: fMonth="ноября"; break;
		case 11: fMonth="декабря"; break;
	}

	if(Minutes < '10') Minutes = '0' + Data.getMinutes();
	if(Seconds < '10') Seconds = '0' + Data.getSeconds();

	dateInput = Hour + ':' + Minutes + ':' + Seconds + ' / ' + Day + ' ' + fMonth + ' ' + Year + ' г.';

	return dateInput;
}