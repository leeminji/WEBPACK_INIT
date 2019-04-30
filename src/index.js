import './assets/style.scss';
import numbers from './module';

function component() {
	const element = document.createElement('div');
	// Lodash, currently included via a script, is required for this line to work
	element.innerHTML = "<span>"+numbers.join("/")+"</span>";
	element.classList.add('hello'); 

	return element;
}

document.body.appendChild(component());