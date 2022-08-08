import Bookshelf from './modules/books.js';
import { DateTime } from "./modules/date.js";

const myBookshelf = new Bookshelf();

myBookshelf.LoadBooksFromLocal();

const render = () => {
  document.querySelector('.awesomeList').innerHTML = '';
  if (myBookshelf.Books) {
    myBookshelf.Books.forEach((books) => {
      const List = document.querySelector('.awesomeList');
      const element = document.createElement('div');
      element.classList.add('eachBook');
      element.innerText = `${books.title} by ${books.author}`;
      List.appendChild(element);

      function deleteBook(event) {
        const deleteButton = event.target;
        const idToDelete = deleteButton.id;
        myBookshelf.DeleteBook(idToDelete);
        myBookshelf.SaveBookshelfLocal();
        render();
      }

      // Remove Button
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Remove';
      deleteButton.classList.add('delButton');
      deleteButton.onclick = deleteBook;
      deleteButton.id = books.id;
      element.appendChild(deleteButton);
    });
  }
};


const now= DateTime.local().toLocaleString(DateTime.DATETIME_FULL);


const DaTi = document.querySelector('.currentTime');

DaTi.innerHTML =  `${now} `;


// Controller
const button = document.querySelector('.button');
button.addEventListener('click', () => {
  const titletextbox = document.getElementById('title');
  const authortextbox = document.getElementById('author');
  const title = titletextbox.value;
  const author = authortextbox.value;
  myBookshelf.AddBook(title, author);
  myBookshelf.SaveBookshelfLocal();
  render();
});

const book = document.getElementById('book');
const list = document.getElementById('list');
const contact = document.getElementById('contact');

book.addEventListener('click', () => {
  document.querySelector('.awesomeList').style.display = 'none';
  document.querySelector('.newBook').style.display = 'flex';
  document.querySelector('.contact').style.display = 'none';
  document.querySelector('h1').textContent = 'Add a New Book';
});

list.addEventListener('click', () => {
  document.querySelector('.awesomeList').style.display = 'flex';
  document.querySelector('.newBook').style.display = 'none';
  document.querySelector('.contact').style.display = 'none';
  document.querySelector('h1').textContent = 'All awesome Books';
});

contact.addEventListener('click', () => {
  document.querySelector('.awesomeList').style.display = 'none';
  document.querySelector('.newBook').style.display = 'none';
  document.querySelector('.contact').style.display = 'flex';
  document.querySelector('h1').textContent = 'Contact Information';
});

render();
