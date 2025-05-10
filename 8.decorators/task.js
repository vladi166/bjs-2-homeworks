//Задача № 1
function cachingDecoratorNew(func) {
    let cache = [];

	function wrapper(...args) {
		const hash = md5(args); // получаем хеш аргументов
		const objectInCache = cache.find(item => item.hash === hash);

		if (objectInCache) {
			console.log("Из кеша: " + objectInCache.value);
			return "Из кеша: " + objectInCache.value;
		}

		const result = func(...args); // вычисляем значение
		cache.push({
			hash: hash,
			value: result
		}); // добавляем в кеш

		if (cache.length > 5) {
			cache.shift(); // удаляем первый (самый старый) элемент
		}

		console.log("Вычисляем: " + result);
		return "Вычисляем: " + result;
	}

	return wrapper;
}

const addAndMultiply = (a, b, c) => (a + b) * c;
const upgraded = cachingDecoratorNew(addAndMultiply);

console.log(upgraded(1, 2, 3)); // Вычисляем: 9
console.log(upgraded(1, 2, 3)); // Из кеша: 9
console.log(upgraded(2, 2, 3)); // Вычисляем: 12
console.log(upgraded(3, 2, 3)); // Вычисляем: 15
console.log(upgraded(4, 2, 3)); // Вычисляем: 18
console.log(upgraded(5, 2, 3)); // Вычисляем: 21
console.log(upgraded(6, 2, 3)); // Вычисляем: 24
console.log(upgraded(1, 2, 3)); // Вычисляем: 9 (так как старый кеш удалился)


//Задача № 2
function debounceDecoratorNew(func, delay) {
    let timeoutId = null;
	let isFirstCall = true;

	function wrapper(...args) {
		wrapper.allCount++;

		if (isFirstCall) {
			isFirstCall = false;
			wrapper.count++;
			func(...args);
			return;
		}

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			wrapper.count++;
			func(...args);
		}, delay);
	}

	wrapper.count = 0; // Кол-во реальных вызовов функции
	wrapper.allCount = 0; // Кол-во всех вызовов декоратора

	return wrapper;
}
