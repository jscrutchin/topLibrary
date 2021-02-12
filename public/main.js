// array to store books
let myLibrary = [];

// Selectors
const newBookBtn = document.querySelector('#newBook');
const addBookForm = document.querySelector('.addBookForm');
const books = document.querySelector('.books');

//hides addBookForm before it is clicked
addBookForm.style.display = 'none';

// Class to create books
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages + ' pages';
        this.read = read;
    }
}


// Function to add books to myLibrary array
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    setData();
}

//Function to delete books from myLibrary array
function deleteBook() {
    myLibrary.splice(this.id, 1);
    display(); 
    setData();
}

// Function to show the addBookForm
newBookBtn.addEventListener('click', () => {
    addBookForm.style.display = 'initial';
})

//Function to add new book
const addBookBtn = document.querySelector('#add-book');
addBookBtn.addEventListener('click', addNewBook);

//Function to take input values for book
function addNewBook(e) {
    e.preventDefault();
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages')
    const read = document.querySelector('#read');

    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    display();
    clearForm();
}


//Show books
function display() {
    books.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookBox = document.createElement('div');
        bookBox.classList.add('book');

        const bookTitle = document.createElement('p');
        bookTitle.textContent = book.title;
        bookBox.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = book.author;
        bookBox.appendChild(bookAuthor);

        const bookPages = document.createElement('p');
        bookPages.textContent = book.pages;
        bookBox.appendChild(bookPages);

        const readBtn = document.createElement('button');
        if(book.read===false) {
            readBtn.textContent = 'Not Read';
            readBtn.style.backgroundColor = '#e04f63';
        }else {
            readBtn.textContent = 'Read';
            readBtn.style.backgroundColor = '#63da63'
        }
        bookBox.appendChild(readBtn);

        const deleteBookBtn = document.createElement('button');
        deleteBookBtn.classList.add('delete-btn');
        deleteBookBtn.innerHTML = 'Remove';
        bookBox.appendChild(deleteBookBtn);

        books.appendChild(bookBox);

        deleteBookBtn.id = index.toString();
        deleteBookBtn.addEventListener('click', deleteBook);

        readBtn.addEventListener('click', () => { 
            book.read = !book.read; 
            setData(); 
            display();
        });
    });
}

//Close form 
const closeFormBtn = document.querySelector('#closeForm');
closeFormBtn.addEventListener('click', () => {
    addBookForm.style.display = 'none';
});


//Function to clear the form
function clearForm() {
    addBookForm.style.display = 'none';

    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}

function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function restore() {
    if(!localStorage.myLibrary) {
        display();
    }else {
        let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myLibrary = objects;
        display();
    }
}

restore();