/* eslint-disable no-redeclare */

import * as assert from 'assert';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// =============== Task 02.01. Basic Types

type PersonBook = Person & Book;
type BookOrUndefined = Book | undefined;

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: DamageLogger;
};

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular,
}

function getAllBooks(): ReadonlyArray<Book> {
    return <const>[
        {
            id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available:
                true, category: Category.JavaScript,
        },
        {
            id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available:
                false, category: Category.JavaScript,
        },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.TypeScript,
        },
    ];
}

function logFirstAvailable(books: ReadonlyArray<Book> = getAllBooks()): void {
    const firstAvailableBook = books.find(book => book.available);

    console.log(`Amount of books is ${books.length}`);
    console.log(`First available book is ${firstAvailableBook.title}`);
}

logFirstAvailable(getAllBooks());

function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
    const allBooks = getAllBooks();
    return allBooks.filter(item => item.category === category).map(book => book.title);
}

function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(title));
}

logBookTitles(getBookTitlesByCategory(Category.JavaScript));
logBookTitles(['1', '2', '3']);

function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const allBooks = getAllBooks();
    const { title, author } = allBooks[index];

    return [title, author];
}

console.log(getBookAuthorByIndex(1));

function calcTotalPages(strings: string[]): BigInt {
    const data = <const>[{ lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 }, {
        lib: 'libName2', books:
            5_000_000_000, avgPagesPerBook: 300,
    }, {
        lib: 'libName3', books: 3_000_000_000,
        avgPagesPerBook: 280,
    }];

    return data.reduce((acc: bigint, item) => {
        const amount = BigInt(item.avgPagesPerBook * item.books);
        return acc + amount;
    }, BigInt(0));
}

// ========== Task 03.01. Function Type

function createCustomerID(name: string, id: number): string {
    return `name: ${name}, id: ${id}`;
}

const myID = createCustomerID('Ann', 10);
console.log(myID);

let idGenerator: (name: string, id: number) => string;

idGenerator = (name: string, id: number) => `name: ${name}, id: ${id}`;
idGenerator = createCustomerID;
console.log(idGenerator('Max', 30));

// ========== 03.02. Optional, Default and Rest Parameters

function createCustomer(name: string, age?: number, city?: string) {
    console.log(`name: ${name}`);

    if (age) {
        console.log(`age: ${age}`);
    }

    if (city) {
        console.log(`city: ${city}`);
    }
}

createCustomer('Ann');
createCustomer('Ann', 20);
createCustomer('Ann', 20, 'New York');

console.log(getBookTitlesByCategory());
logFirstAvailable();

function getBookByID(bookId: number): BookOrUndefined {
    const allBooks = getAllBooks();

    return allBooks.find(book => book.id === bookId);
}

console.log(getBookByID(1));

function сheckoutBooks(customer: string, bookIDs: number[]): string[] {
    console.log(`Customer is ${customer}`);

    return bookIDs.map(id => getBookByID(id)).filter(book => book.available).map(book => book.title);
}

const myBooks = сheckoutBooks('Ann', [1, 2, 4]);
console.log(`myBooks are ${myBooks}`);

// ========== Task 03.03. Function Overloading

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id?: number, available?: boolean): string[];
function getTitles(...args: any): string[] {
    return [];
};

getTitles(1, true);

// ========== Task 03.04. Assertion Functions

function assertStringValue(val: any): asserts val is string {
    if (typeof val !== 'string') {
        throw new Error('value should have been a string');
    }
}

function bookTitleTransform(title: any): string {
    assertStringValue(title);

    return title.split('').reverse().join('');
}

console.log(bookTitleTransform('TypeScript'));

// console.log(bookTitleTransform(123));

function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

// ================ Task 04.01. Interfaces

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: (reason: string) => console.log(`Damaged: ${reason}`),
};

printBook(myBook);
myBook.markDamaged('missing back cover');


// ================ Task 04.02. Defining an Interface for Function Types
interface DamageLogger {
    (param: string): void;
}

const logDamage: DamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);
logDamage('Some reason');

// ================ Task 04.03. Extending Interface

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

const favoriteAuthor: Author = {
    name: 'Anna',
    email: 'anna@gmail.com',
    numBooksPublished: 2,
};

const favoriteLibrarian: Librarian = {
    name: 'Anna',
    email: 'anna@gmail.com',
    department: 'dev',
    assistCustomer: (customerName: string) => console.log(`Customer name is ${customerName}`),
};

// ================ Task 04.04. Optional Chaining

const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};

// a. offer.magazine
// b. offer.magazine.getTitle()
// c. offer.book.getTitle()
// d. offer.book.authors[0]

// console.log(offer?.magazine);
// console.log(offer?.magazine?.getTitle());
// console.log(offer.book.getTitle?.());
// console.log(offer.book.authors?.[0]);

// ================ Task 04.05. Keyof Operator

type BookProperties = keyof Book;

function getProperty(book: Book, prop: BookProperties): any {
    if (typeof prop !== 'function') {
        return book[prop];
    } else {
        return book[prop]['name'];
    }
}

console.log(getProperty(getAllBooks()[0], 'title'));
console.log(getProperty(getAllBooks()[0], 'markDamaged'));
// console.log(getProperty(getAllBooks()[0], 'isbn'));

// ================ Task 05.01. Creating and Using Classes

abstract class ReferenceItem {
    // title: string;
    // year: number;
    //
    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }
    private _publisher: string;

    readonly #id: number;

    static department: string = 'law';

    protected constructor(
        id: number,
        public title: string,
        public year: number,
    ) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department:  ${ReferenceItem.department}`);
    }

    get publisher() {
        // eslint-disable-next-line no-underscore-dangle
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        // eslint-disable-next-line no-underscore-dangle
        this._publisher = newPublisher;
    }

    getId() {
        // eslint-disable-next-line no-underscore-dangle
        return this.#id;
    }

    abstract printCitation(): void;

}
// const ref = new ReferenceItem(1,'New Title', 2021);
// ref.printItem();
// ref.publisher = 'alex';
// console.log(ref.publisher);
// console.log(ref);
// console.log(ref.getId());

// ================ Task  05.02. Extending Classes 05.03. Creating Abstract Classes

class Encyclopedia extends ReferenceItem {
    constructor(
        id: number,
        title: string,
        year: number,
        public edition: string
    ) {
        super(id, title, year);
    }

    printItem(): void {
        super.printItem();
        console.log(`«Edition: ${this.edition} (${this.year})»`);
    }

    printCitation() {
        console.log(`«${this.title} – ${this.year}»`)
    }
}

const refBook = new Encyclopedia(2, 'Science', 2020, '2nd');
refBook.printItem();

// ================ Task 05.04. Interfaces for Class Types

class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;
    assistCustomer(customerName: string): void {
        console.log(`Customer name is ${customerName}`);
    }
}

const newFavoriteLibrarian: Librarian = new UniversityLibrarian();
newFavoriteLibrarian.name = 'Anna';
newFavoriteLibrarian.assistCustomer('Ivan');
console.log(newFavoriteLibrarian);

// ================ Task 05.05. Intersection and Union Types

const myPersonBook: PersonBook = {
    id: 1,
    author: 'Dmytro',
    available: true,
    category: Category.Angular,
    email: 'test@gmail.com',
    name: 'Anna',
    title: 'Learn Angular'
};

console.log(myPersonBook);