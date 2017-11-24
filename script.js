var arrTodo = JSON.parse(localStorage.getItem('todo')),
		elem = document,
		inp = elem.getElementById('input_text'),
		add = elem.getElementById('add'),
		edit = elem.getElementById('edit'),
		rev = elem.getElementById('rev'),
		delSelected = elem.getElementById('del'),
		delAll = elem.getElementById('delAll'),
		clear = elem.getElementById('clear'),
		task = elem.getElementById('task'),
		row = elem.getElementById('row');

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
		date: dateConversion(),
		check: false,
		decor: ''
	};

	arrTodo.push(todo);

	localStorage.setItem('todo', JSON.stringify(arrTodo));
	window.location.reload();
};

edit.onclick = function () {
	var sum = 0;
	for(var i = 0; i< arrTodo.length; i++) {
		sum += arrTodo[i].check;
	}
	if(sum > 1) {
		alert('Выберите только одно задание!');
	} else if(sum === 0) {
		alert('Выберите задание для редактирования!');
	}	else {
		arrTodo.forEach(function (el) {
			if(el.check === true)	inp.value = el.text;
		});
	}
};

rev.onclick = function() {
	arrTodo.reverse();
	localStorage.setItem('todo', JSON.stringify(arrTodo));
	window.location.reload();
};

delSelected.onclick = function () {
	arrTodo.forEach(function (el, i) {
		if(el.check !== true) return;

		arrTodo.splice(arrTodo.indexOf(el), 1);
		localStorage.setItem('todo', JSON.stringify(arrTodo));
	});
	window.location.reload();
};

delAll.onclick = function() {
	if(!task.firstChild) {
		alert('The list is empty!');
	} else {
		localStorage.removeItem("todo");
	}
	window.location.reload();
};

clear.onclick = function() {
	inp.value = '';
};

function showTask() {
	arrTodo.forEach(function(el, i) {
		var div = elem.createElement('div');
		div.setAttribute('id', i);
		div.setAttribute('class', 'rows');
		div.setAttribute('draggable', 'true');

		var spanTime = elem.createElement('span');
		var textTime = elem.createTextNode(el.date);
		spanTime.setAttribute('class', 'time');
		spanTime.appendChild(textTime);
		div.appendChild(spanTime);

		var span = elem.createElement('span');
		span.setAttribute('class', 'inp-val');
		span.textContent = el.text;
		div.appendChild(span);
		span.style.textDecorationLine = el.decor;

		var inputCh = elem.createElement('input');
		inputCh.setAttribute('type', 'checkbox');
		div.appendChild(inputCh);
		inputCh.checked = el.check;

		var buttonDel = elem.createElement('button');
		buttonDel.setAttribute('class', 'delete');
		buttonDel.textContent = 'Del';

		addDnD(div);

		div.append(buttonDel);
		task.append(div);

		inputCh.onchange = function (e) {
			if(e.target.checked)	{
				e.target.setAttribute('checked','checked');
				arrTodo[e.target.parentNode.id].check = true;
				span.style.textDecorationLine = 'line-through';
				arrTodo[e.target.parentNode.id].decor = 'line-through';
			} else {
				e.target.removeAttribute('checked');
				arrTodo[e.target.parentNode.id].check = false;
				span.style.textDecorationLine = '';
				arrTodo[e.target.parentNode.id].decor = '';
			}
			localStorage.setItem('todo', JSON.stringify(arrTodo));
		};

		buttonDel.onclick = function (e) {
			e.target.parentNode.remove();
			arrTodo.splice(arrTodo.indexOf(e.target.parentNode.id), 1);
			localStorage.setItem('todo', JSON.stringify(arrTodo));
		};
	});
}

function drag(e) {
	element = this;
	e.dataTransfer.effectAllowed = "move";
	e.currentTarget.classList.add('divMove');
	e.dataTransfer.setData('text/html', this.innerHTML);
}

function drop(e) {
	var tasks = elem.querySelectorAll('.rows');
			arrTodo = [];

	element.innerHTML = this.innerHTML;
	this.innerHTML = e.dataTransfer.getData('text/html');

	tasks.forEach(function (element) {
		var todo = {
			date: element.children[0].textContent,
			text: element.children[1].textContent,
			check: element.children[2].checked,
			decor: element.children[3].style.textDecorationLine
		};
		if(element.children[2].checked === true) {
			element.children[3].style.textDecorationLine = 'line-through';
			todo.check = true;
			todo.decor = 'line-through';
		} else {
			element.children[3].style.textDecorationLine = '';
			todo.check = false;
			todo.decor = '';
		}
		arrTodo.push(todo);
	});
	localStorage.setItem('todo', JSON.stringify(arrTodo));
}

function addDnD(element) {
	element.addEventListener('dragstart', drag, false);
	element.addEventListener('dragenter', function (e) {
		e.currentTarget.classList.remove('divMove');
	}, false);
	element.addEventListener('dragover', function (e) {
		e.preventDefault()
	}, false);
	element.addEventListener('drop', drop, false);
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