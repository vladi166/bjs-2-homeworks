class PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount;
		this._state = 100;
		this.type = null;
	}

	fix() {
		this.state = this._state * 1.5;
	}

	set state(newState) {
		if (newState < 0) {
			this._state = 0;
		} else if (newState > 100) {
			this._state = 100;
		} else {
			this._state = newState;
		}
	}

	get state() {
		return this._state;
	}
}

class Magazine extends PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.type = "magazine";
	}
}

class Book extends PrintEditionItem {
	constructor(author, name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.author = author;
		this.type = "book";
	}
}

class NovelBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "novel";
	}
}

class FantasticBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "fantastic";
	}
}

class DetectiveBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "detective";
	}
}

class Library {
	constructor(name) {
		this.name = name;
		this.books = [];
	}

	addBook(book) {
		if (book.state > 30) {
			this.books.push(book);
		}
	}

	findBookBy(type, value) {
		return this.books.find(book => book[type] === value) || null;
	}

	giveBookByName(bookName) {
		const bookIndex = this.books.findIndex(book => book.name === bookName);
		if (bookIndex !== -1) {
			return this.books.splice(bookIndex, 1)[0];
		}
		return null;
	}
}


// Создаём библиотеку
const library = new Library("Центральная библиотека");

// Добавляем издания
library.addBook(new DetectiveBook(
	"Артур Конан Дойл",
	"Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
	2019,
	1008
));
library.addBook(new FantasticBook(
	"Аркадий и Борис Стругацкие",
	"Пикник на обочине",
	1972,
	168
));
library.addBook(new NovelBook(
	"Герберт Уэллс",
	"Машина времени",
	1895,
	138
));
library.addBook(new Magazine("Мурзилка", 1924, 60));
library.addBook(new NovelBook("Неизвестный", "Старый роман", 1919, 200));

// Поиск книги по дате выпуска
const book1919 = library.findBookBy("releaseDate", 1919);
console.log(book1919?.name || "Книга не найдена"); // Старый роман

// Выдача книги
console.log("Книг до выдачи:", library.books.length); // 5
const issuedBook = library.giveBookByName("Машина времени");
console.log("Книг после выдачи:", library.books.length); // 4

// Повреждение книги
issuedBook.state = 25;
console.log("Состояние после повреждения:", issuedBook.state); // 25

// Восстановление книги
issuedBook.fix();
console.log("Состояние после восстановления:", issuedBook.state); // 37.5

// Попытка добавить обратно
library.addBook(issuedBook);
console.log("Книг после возврата:", library.books.length); // 5, т.к. состояние > 30

class Student {
    constructor(name) {
      this.name = name;
      this.marks = {};
    }
  
    addMark(mark, subject) {
      // Проверка валидности оценки
      if (mark < 2 || mark > 5) {
        return;
      }
  
      // Если предмета ещё нет, создаём пустой массив для него
      if (!this.marks.hasOwnProperty(subject)) {
        this.marks[subject] = [];
      }
  
      // Добавляем оценку
      this.marks[subject].push(mark);
    }
  
    getAverageBySubject(subject) {
      if (!this.marks.hasOwnProperty(subject) || this.marks[subject].length === 0) {
        return 0;
      }
  
      const sum = this.marks[subject].reduce((acc, curr) => acc + curr, 0);
      return sum / this.marks[subject].length;
    }
  
    getAverage() {
      const subjects = Object.keys(this.marks);
      if (subjects.length === 0) {
        return 0;
      }
  
      const total = subjects.reduce((acc, subject) => acc + this.getAverageBySubject(subject), 0);
      return total / subjects.length;
    }
  }
  
  const student = new Student("Олег Никифоров");
  
  student.addMark(5, "химия");
  student.addMark(5, "химия");
  student.addMark(5, "физика");
  student.addMark(4, "физика");
  student.addMark(6, "физика"); // Оценка не добавится
  
  console.log("Средний балл по физике:", student.getAverageBySubject("физика")); // 4.5
  console.log("Средний балл по биологии:", student.getAverageBySubject("биология")); // 0
  console.log("Средний балл по всем предметам:", student.getAverage()); // 4.75