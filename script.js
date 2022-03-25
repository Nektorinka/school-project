"use strict"

function getRandom(min, max, d = 10) {
	return Math.floor(Math.random() * (max - min)*d)/d + min;
}

var responses = [];
var examples = []; 
var q_examples = 0;
var i_examples = 0;

function generateExamples(operator, q = 5, dig1 = 20, dig2 = 20){
	for (var i = 1; i <= q; ++i){
		console.log(i_examples, q);
		var d1 = getRandom(1, dig1);
		var d2 = getRandom(1, dig2);
		if (operator == '+'){
			var d3 = (d1 + d2).toFixed(1);
		} else if(operator == "-"){
			console.log("minus");
			d3 = Math.min(d1, d2);
			d1 = Math.max(d1, d2);
			d2 = d3;
			var d3 = (d1 - d2).toFixed(1);
		}else if(operator == "*"){
			d2 = Math.floor(d2);
			var d3 = (d1*d2).toFixed(1);
		}else if(operator == "/"){
			var d3 = d1;
			var d2 = Math.floor(d2);
			var d1 = (d3 * d2).toFixed(1);
		}
		responses.push(d3);
		examples.push(`${d1} ${operator} ${d2} = `);
		let example = document.getElementById("example" + String(i_examples + i));
		example.textContent = `${d1} ${operator} ${d2} = `;
	}
	i_examples += (--i);
	q_examples += q;
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

	while (document.getElementById("example" + i) != null){
		let val = user_responses.item(0).value.trim().replace(',','.');
		if (val !== ""){
			val = Number(val).toFixed(1);
		}
		if (val == Number(responses[i-1])){
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
		td2.innerHTML = responses[i-1];
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