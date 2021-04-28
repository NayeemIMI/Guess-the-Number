'use strict';

/* console.log(document.querySelector(`.message`).textContent);

document.querySelector(`.message`).textContent = `Correct Number 🎆`;
console.log(document.querySelector(`.message`).textContent);

document.querySelector(`.number`).textContent = 13;
document.querySelector(`.score`).textContent = 10;

document.querySelector(`.guess`).value = 23;
console.log(document.querySelector(`.guess`).value); */

const secretNumberGenerator = function () {
	return Math.trunc(Math.random() * 50) + 1;
};
const setStyle = function (element, property, value) {
	document.querySelector(`${element}`).style[`${property}`] = value;
};
const displayMessage = function (element, property, message) {
	document.querySelector(`${element}`)[`${property}`] = message;
};

let secretNumber = secretNumberGenerator();
let score = 20,
	highscore = 0;

document.querySelector(`.again`).addEventListener(`click`, function () {
	score = 20;
	displayMessage(`.score`, `textContent`, score);
	secretNumber = secretNumberGenerator();
	displayMessage(`.message`, `textContent`, `Start Guessing!`);
	setStyle(`body`, `backgroundColor`, `black`);
	displayMessage(`.guess`, `value`, ``);
	displayMessage(`.number`, `textContent`, `?`);
	setStyle(`.number`, `width`, `15rem`);
});

document.querySelector(`.guess`).addEventListener(`keyup`, function (event) {
	if (event.key === `Enter`) {
		document.querySelector(`.check`).click();
		event.preventDefaut();
	}
});

document.querySelector(`.check`).addEventListener(`click`, function () {
	let guess = document.querySelector(`.guess`).value;
	if (guess === ``) guess = `empty`;
	else guess = Number(guess);

	//When invalid input
	if (isNaN(guess)) {
		if (score > 1) {
			displayMessage(
				`.message`,
				`textContent`,
				`Please insert a valid number!`
			);
			score--;
			displayMessage(`.score`, `textContent`, score);
		} else {
			displayMessage(`.message`, `textContent`, `You Loose!`);
			displayMessage(`.score`, `textContent`, 0);
		}

		//When player wins
	} else if (guess === secretNumber) {
		displayMessage(`.message`, `textContent`, `Correct Number!`);
		setStyle(`body`, `backgroundColor`, `#4a2d1b`);
		setStyle(`.number`, `width`, `30rem`);
		displayMessage(`.number`, `textContent`, secretNumber);
		if (score > highscore) {
			highscore = score;
			displayMessage(`.highscore`, `textContent`, highscore);
		}

		//When guess is wrong
	} else if (guess !== secretNumber) {
		if (score > 1) {
			displayMessage(
				`.message`,
				`textContent`,
				guess > secretNumber ? `Guess is higher!` : `Guess is lower!`
			);
			score--;
			displayMessage(`.score`, `textContent`, score);
		} else {
			displayMessage(`.message`, `textContent`, `You Loose!`);
			displayMessage(`.score`, `textContent`, 0);
		}
	}
});
