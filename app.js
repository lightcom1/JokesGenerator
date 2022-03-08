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
	'Ебутся как-то два клоуна, а через час один другому говорит: <br> - Уже что-то не смешно.',
	'Приходит как-то мужик к урологу и говорит: <br> - У меня хуй чешется. <br> - Мой чаще. <br> - Нет мой.',
	'Шёл как-то ёжик, забыл как дышать и умер, а потом вспомнил и воскрес.',
	'Пришёл украинец в ресторан во Франции, достаёт кусок сала и говорит официанту: <br> - пориж. <br> Так и назвали столицу Франции.',
	'Заходит нeгр с попугаем на плече в бар. <br> Бармен: Где вы его купили? <br> Попугай: в Африке.',
	'Лысого мужика не могли выгнать из церкви потому что гонять лысого грех.',
	'Решил как-то мужик поплавать в речке, сделал каменное лицо и утонул.',
	'Шёл медведь по лесу, видит машина горит, сел в неё и сгорел.',
	'Заходит улитка в бар, а бармена нет.',
	'Приходит мужик в зоомагазин и покупает говорящюю сороконожку.<br>Приходит домой, накормил ее и говорит:<br>— Гулять идем?<br>— Та молчит.<br>— Гулять идем или нет? — снова молчит.<br>Мужик в бешенстве:<br>— Наебали! Какая же ты говорящая сороконожка?!<br>— Тихо, блядь. Я обуваюсь...',
	'Бабка переходила дорогу не на тот свет, а попала на тот.',
	'В семье скелетов родился сын. Назвали Костян.',
	'Едут батя с сыном на шестёрке. <br> Перевернулись. <br> Едут на девятке.',
	'Что подарили ребёнку у которого нет рук?<br>Никто не знает, он так и не открыл подарок.',
	'Заходит слепой дед в бар и говорит: <br> - Всем привет кого не видел!',
	'Приехала бабка в Америку. Заходит в магазин, там продавец черный, подходит к нему и говорит: <br> - Дай манки',
	'Приехал мужик в санаторий, а ему говорят, мужчина, это вам не санаторий',
        'Нажимаю кнопку "Мой компьютер" <br> А он не моет',
	'Покупает мужик унитаз: <br> -Вам напольный или подвесной? <br> -Мне посрать',
	'Идут как-то два моряка по берегу, и вдруг один из них поворачивается к другому и говорит: <br> – А я не моряк.',
	'Надевает мужик шляпу, а она ему как раз, надевает вторую, а она ему как два',
	'Мужик попадает в ад. Ему говорят <br> -Ты не сильно нагрешил поэтому мы разрешаем выбрать себе пытку самостоятельно. <br> Проходит в первую комнату, а там жарят людей на сковороде. <br> Ему не подходит и он уходит. <br> Во второй комнате иголки под кожу вставляют. <br> -Это тоже больно, -говорит он и уходит. <br> В третьей комнате мужики стоят по колена в говне и курят. <br> -Это не приятно но лучше чем в тех, и выбирает эту комнату. <br> Заходит, берёт сигарету и закуривает. <br> Через 2 минуты возвращается начальник и говорит: <br> -Ну всё, перекур окончен, давайте доедать.',
	'Шли 100 чёрных по пустыне и нашли лампу с джином. <br> У каждого по 1 желанию. 99 пожелали стать белыми, а 100-ый – чтобы все снова стали чёрными',
	'Заходит скелет в бар и говорит: <br> Мне виски и швабру.',
];

const timer = setInterval(() => {
	voices = speechSynthesis.getVoices();
	if (voices.length !== 0) {
		clearInterval(timer);
	}
}, 200);

let jokeIndex = 0;

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
		jokeContainer.innerHTML = `${jokes[jokeIndex]}`;
		jokeIndex++;
		if(jokeIndex > jokes.length) jokeIndex = 0;
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
