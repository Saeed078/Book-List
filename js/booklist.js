let addBtn = document.querySelector(".add-btn");
let bookList = document.getElementById("book-list");
let titleOfBook = document.getElementById("title"); 
let authorOfBook = document.getElementById("author"); 
let yearOfBook = document.getElementById("year"); 
let booksContainer = document.querySelector(".table");
let rimoveBtn = document.querySelector("button");
let BooksElement = document.getElementById("book-list");

let booksArray = [];

addBtn.addEventListener("click", function(event) {
    event.preventDefault()
    let titleInputVlaue = titleOfBook.value;
    let authorInputVlaue = authorOfBook.value;
    let yearInputVlaue = yearOfBook.value;
    

    if(titleInputVlaue === "" || authorInputVlaue === "" || yearInputVlaue === "" ) {
        alert("Please fill in all the required fields")
    } else {
        let newBooksObj = {
        id: booksArray.length + 1,
        title: titleInputVlaue,
        author: authorInputVlaue,
        year: yearInputVlaue 
        }

        booksArray.push(newBooksObj);
        console.log(booksArray)

        setLocalStorage(booksArray)
        booksGenerator(booksArray)
    }
});

function setLocalStorage(allBooksArray) {
    localStorage.setItem("books",JSON.stringify(allBooksArray))
};

function booksGenerator(books) {
      
    bookList.innerHTML = " "
    //create element
    let newTr, newTh1, newTh2, newTh3, newTh4, newRimoveBtn;
    books.forEach(function(book) {
        newTr = document.createElement("tr");
        newTh1 = document.createElement("th");
        newTh2 = document.createElement("th");
        newTh3 = document.createElement("th");
        newTh4 = document.createElement("th");
        newRimoveBtn = document.createElement("button");
        //innerHtml
        newTh1.innerHTML = book.title;
        newTh2.innerHTML = book.author;
        newTh3.innerHTML = book.year;
        newRimoveBtn.innerHTML = "Rimove"
        newRimoveBtn.setAttribute("class", "btn btn-warning rounded")
        newRimoveBtn.setAttribute("id", "rimove-btn");

        //append
        newTh4.append(newRimoveBtn)
        newTr.append(newTh1, newTh2, newTh3, newTh4);
        bookList.append(newTr);
        newRimoveBtn.addEventListener("click", function(event) {
            event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
            localStorage.removeItem("(" + books.id + ")")
        })
    })

}

function getLocalStorage() {
    let uploadIteme = JSON.parse(localStorage.getItem("books"))
    if(uploadIteme) {
        booksArray = uploadIteme
        booksGenerator(booksArray)
    }
}

window.addEventListener("load", getLocalStorage)


