let myLibrary = [];

class Book {
    constructor(title,author,pages,read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read
    }
    changeReadStatus () {
        this.read = !this.read;
    }
}

// function Book(title, author, pages, read){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

// Book.prototype.changeReadStatus = function(){
//     this.read = !this.read;
// }

const libraryTable = document.querySelector("#libraryTBody");
const createBookButton = document.querySelector("#newBook");

// // Only for testing and generating a strting table
const book1 = new Book("dzqdzq", "ddede", "343434", false);
const book2 = new Book("ghhh", "abcd", "23", true);
const book3 = new Book("dzqdzq", "ddede", "555", true);
myLibrary.push(book1, book2, book3);

function deleteBook(index){
    myLibrary.splice(index,1);
    displayBooks(myLibrary);
}

const addEventListenerToButtons = function(changeStatusButtons, deleteButtons) {
    for(i=0; i < changeStatusButtons.length; i++){
        let currentButton = changeStatusButtons[i];
        currentButton.addEventListener("click", function(event){
            myLibrary[event.currentTarget.getAttribute('data-idbook')].changeReadStatus();
            displayBooks(myLibrary);
        })
    }

    for(i=0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener("click", function(event){
            deleteBook(event.currentTarget.getAttribute('data-idbook'));
        })
    }
}

function displayBooks(library){
    // We clean the table first to avoid multiple copies of one book
    clearTable();
    createLibraryDisplay(library);
}

createBookButton.addEventListener("click", function(){
    const newBook = new Book;
    newBook.title = window.prompt("What is the name of the book?");
    newBook.author = window.prompt("Who is the author of the book?");
    newBook.pages = window.prompt("How many pages does the book have?");
    let read = window.prompt("Did you read it? Please answer by yes or no");
    read === "yes" ? newBook.read = true : newBook.read = false;

    // if the user confirms, the book is added
    if(window.confirm("Are you sure you want to add this book to the library ?")){
        myLibrary.push(newBook);
        displayBooks(myLibrary);
    } 
});


function createLibraryDisplay(library) {
    for(var i = 0; i < library.length ; i++){
        let currentBook = library[i];
        // For each book we will create a new table row
        const newTr = document.createElement('tr');
        newTr.classList.add('bookTr');
        newTr.setAttribute("data-idBook", i);
        // for each table row, we add a td for each book property, and a read / delete button
        for (const property in currentBook){
            if(currentBook.hasOwnProperty(property)){
                const newTd = document.createElement('td');
                newTd.classList.add('center');
                if(property === 'read'){
                    currentBook[property] === true ? newTd.textContent = "Yes" : newTd.textContent = "No"
                }else {
                    newTd.textContent = currentBook[property];
                }
                newTr.appendChild(newTd);
            }
        }

        // We create the button that will allow us to change the read status
        const tdChangeReadStatus = document.createElement('td');
        tdChangeReadStatus.classList.add('center');
        const changeReadStatus = document.createElement('button');
        changeReadStatus.classList.add('changeStatusButton', 'btn', 'btn-outline-info');
        changeReadStatus.setAttribute("data-idBook", i);
        if (currentBook.read){
            changeReadStatus.textContent = 'I did not read it';
        }else {
            changeReadStatus.textContent = 'I read it ';
        }
        

        //We create the button that will allow us to delete a book
        const tdDelete = document.createElement('td');
        tdDelete.classList.add('center');
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'deleteButton');
        deleteButton.setAttribute("data-idBook", i);
        deleteButton.textContent = 'Delete this book';
        

        tdChangeReadStatus.appendChild(changeReadStatus);
        tdDelete.appendChild(deleteButton);
        newTr.appendChild(tdChangeReadStatus);
        newTr.appendChild(tdDelete);
        libraryTable.appendChild(newTr);

    }

    const changeStatusButtons = Array.from(document.querySelectorAll('.changeStatusButton'));
    const deleteButtons = Array.from(document.querySelectorAll('.deleteButton'));
    
    addEventListenerToButtons(changeStatusButtons, deleteButtons);
};

function clearTable(){
    const library = document.querySelectorAll('.bookTr');
    Array.prototype.forEach.call( library, function( node ) {
        node.parentNode.removeChild( node );
    });
}


displayBooks(myLibrary);
