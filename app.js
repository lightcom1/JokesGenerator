const jokeContainer = document.getElementById('joke');
const btn = document.getElementById('btn');
const url = 'https://v2.jokeapi.dev/joke/Any?type=single';
const buttons = document.querySelectorAll('input[name="lang"]');
const microphone = document.querySelector('.fa-microphone');
const message = new SpeechSynthesisUtterance();
const enbtn = document.querySelector('#enbtn');
let voices = [];
let jokes = [
	'Что будет если скрестить персик и дыню? <br> Пердыня',
	'Ебутся как-то два клоуна, а через час один другому говорит:<br>- Уже что-то не смешно.',
	'Приходит как-то мужик к урологу и говорит:<br> - У меня хуй чешется.<br> - Мой чаще.<br> - Нет мой.',
	'Украинська бимба 🐷💣',
	'Шёл как-то ёжик, забыл как дышать и умер, а потом вспомнил и воскрес.',
	'Пришёл украинец в ресторан во Франции, достаёт кусок сала и говорит официанту: <br> - пориж. <br>Так и назвали столицу Франции.',
	'Заходит нeгр с попугаем на плече в бар.<br> Бармен: Где вы его купили?<br>Попугай: в Африке.',
	'Лысого мужика не могли выгнать из церкви потому что гонять лысого грех.',
	'Решил как-то мужик поплавать в речке, сделал каменное лицо и утонул.',
	'Шёл медведь по лесу, видит машина горит, сел в неё и сгорел.',
	'Отвёртка.',
	'Приходит мужик в зоомагазин и покупает говорящюю сороконожку.<br>Приходит домой, накормил ее и говорит:<br>— Гулять идем?<br>— Та молчит.<br>— Гулять идем или нет? — снова молчит.<br>Мужик в бешенстве:<br>— Наебали! Какая же ты говорящая сороконожка?!<br>— Тихо, блядь. Я обуваюсь...',
	'Бабка переходила дорогу не на тот свет, а попала на тот.',
	'В семье скелетов родился сын. Назвали Костян.',
	'Едут батя с сыном на шестёрке.<br> Перевернулись.<br> Едут на девятке.',
	'Что подарили ребёнку у которого нет рук?<br>Никто не знает, он так и не открыл подарок.',
	'Заходит слепой дед в бар и говорит:<br>- Всем привет кого не видел!',
	'Приехала бабка в Америку. Заходит в магазин, там продавец черный, подходит к нему и говорит:<br>- Дай манки',

];

const timer = setInterval(() => {
	voices = speechSynthesis.getVoices();
	if (voices.length !== 0) {
		clearInterval(timer);
	}
}, 200);

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
	if (enbtn.checked) {
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

microphone.addEventListener('click', () => {
	if (enbtn.checked) {
		message.lang = 'en-US';
		message.voice = voices[2];
		message.text = jokeContainer.textContent;
		window.speechSynthesis.cancel()
		window.speechSynthesis.speak(message);
	} else {
		message.lang = 'ru-RU';
		message.voice = voices[3];
		message.text = jokeContainer.textContent;
		window.speechSynthesis.cancel()
		window.speechSynthesis.speak(message);
	}
});
