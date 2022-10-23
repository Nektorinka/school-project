"use strict"

function getRandom(min, max, d = 10) {
	return Math.floor(Math.random() * (max - min)*d)/d + min;
}

var tempResponses = []; // нет нужды в var, лучше использовать const, когда нам не нужно переопределять переменную
var examples = [];
var q_examples = 0; // непонятная переменная. Лучше избегать сокращений в переменных, чтобы повысить читаемость кода.
var i_examples = 0;

function generateExamples(operator, q = 5, dig1 = 20, dig2 = 20){ // в ванильном js я бы лучше передавал аргументы функции в объекте, так на много легче читать код и поможет избежать лишних ошибок в будущем. Например тут можно было бы сделать так generateExamples({operator, q = 5, dig1 = 20, dig2 = 20}) и дать более внятные имена переменным q, dig1 и dig2
	for (var i = 1; i <= q; ++i){ // тут лучше использовать let вместо var. var видна вне блока for и поэтому в будущем возможны баги, если захочешь расширить функционал
		var d1 = getRandom(1, dig1);
		var d2 = getRandom(1, dig2);
		if (operator == '+'){ // лучше использовать строгое сравнение ===. При строгом сравнении меньше вероятность получения бага
			var d3 = d1 + d2;
		} else if(operator == "-"){
			d3 = Math.min(d1, d2);
			d1 = Math.max(d1, d2);
			d2 = d3;
			var d3 = d1 - d2;
		}else if(operator == "*"){
			d2 = Math.floor(d2);
			var d3 = d1*d2;
		}else if(operator == "/"){
			var d3 = d1;
			var d2 = Math.floor(d2);
			var d1 = (d3 * d2).toFixed(1);
		}
		tempResponses.push(btoa(d3.toFixed(1)));
		examples.push(`${d1} ${operator} ${d2} = `);
		let example = document.getElementById("example" + String(i_examples + i));
		example.textContent = `${d1} ${operator} ${d2} = `;
	}
	i_examples += (--i);
	q_examples += q;
}

function glob(){ // функции лучше всего называть с глагола, например getSomething(), чтобы было понятно что она делает сразу из ее названия
	return tempResponses;
}

function sendForm(e){
	let i = 1;
	let correct = 0;
	document.examples.complete.remove();
	var user_responses = document.getElementsByName("response");
	var right = document.getElementById("right");
	var all = document.getElementById("all");

	table.style.visibility = "visible";
	document.getElementById("reload").style.visibility = "visible";

	while (document.getElementById("example" + i) != null){ // тут лучше строгое сравнение использовать
		let val = user_responses.item(0).value.trim().replace(',','.');
		if (val !== ""){
			val = Number(val).toFixed(1);
		}
		if (val == Number(atob(responses[i-1]))){
	    		correct++;
		}
		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		td3.innerHTML = examples[i-1];
		tr.append(td3);
		td1.innerHTML = val;
		tr.append(td1);
		td2.innerHTML = atob(responses[i-1]);
		tr.append(td2);
		table.append(tr);

		user_responses.item(0).remove();
		document.getElementById("example" + String(i)).remove();

		i++;
	}

	right.textContent = correct;
	all.textContent = q_examples;

	e.preventDefault();
}



var completeButton = document.examples.complete;
completeButton.addEventListener("click", sendForm);
