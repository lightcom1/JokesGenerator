const jokeContainer = document.getElementById('joke');
const btn = document.getElementById('btn');
const url = 'https://v2.jokeapi.dev/joke/Any?type=single';
const buttons = document.querySelectorAll('input[name="lang"]');
const microphone = document.querySelector('.fa-microphone');
const message = new SpeechSynthesisUtterance();

let getEnJoke = async () => {
	jokeContainer.classList.remove('fade');
	const data = await fetch(url);
	const item = await data.json();
	jokeContainer.innerHTML = `${item.joke}`;
	jokeContainer.classList.add('fade');
};

let getRuJoke = () => {
	jokeContainer.classList.remove('fade');
	setTimeout(() => {
		let randomNumber = Math.floor(Math.random() * jokes.length);
		jokeContainer.innerHTML = `${jokes[randomNumber]}`;
		jokeContainer.classList.add('fade');
	}, 100);
};

let check = () => {
	if (buttons[0].checked) {
		btn.removeEventListener('click', getRuJoke);
		btn.addEventListener('click', getEnJoke);
		btn.textContent = 'Get the joke';
		getEnJoke();
	} else {
		btn.removeEventListener('click', getEnJoke);
		btn.addEventListener('click', getRuJoke);
		btn.textContent = 'Загрузить разрывную';
		getRuJoke();
	}
};

check();

buttons.forEach(button => {
	button.addEventListener('click', check);
});

const timer = setInterval(() => {
	voices = speechSynthesis.getVoices();
	if (voices.length !== 0) {
		clearInterval(timer);
	}
}, 200);

microphone.addEventListener('click', () => {
	if (buttons[0].checked) {
		message.lang = 'en-US';
		message.voice = voices[2];
		message.text = jokeContainer.textContent;
		window.speechSynthesis.speak(message);
	} else {
		message.lang = 'ru-RU';
		message.voice = voices[3];
		message.text = jokeContainer.textContent;
		window.speechSynthesis.speak(message);
	}
});
