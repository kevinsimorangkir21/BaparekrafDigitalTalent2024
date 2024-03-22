const bookshelfBelumBaca = document.getElementById('bookshelf-belum-baca');
const bookshelfSudahBaca = document.getElementById('bookshelf-sudah-baca');
const addBookForm = document.getElementById('add-book-form');
 
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
 
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const year = document.getElementById('book-year').value;
  const status = document.getElementById('book-status').value === 'sudah_baca'; // Convert to boolean directly
 
  const book = {
    id: +new Date(),
    title,
    author,
    year: Number(year),
    isComplete: status,  // Property name is now isComplete (boolean)
  };
 
  addBook(book);
  console.log(book);
});
 
function addBook(book) {
  const bookId = Math.random().toString(36).substring(2, 15);
  book.id = bookId;
 
  localStorage.setItem(`book-${bookId}`, JSON.stringify(book));
 
  const li = createBookElement(book);
 
  if (book.isComplete) {
    bookshelfSudahBaca.appendChild(li);
  } else {
    bookshelfBelumBaca.appendChild(li);
  }
}
 
function createBookElement(book) {
  const li = document.createElement('li');
  li.dataset.bookId = book.id;
  li.innerHTML = `
    <h2>${book.title}</h2>
    <p>Penulis: ${book.author}</p>
    <p>Tahun: ${book.year}</p>
    <p>Status: ${book.isComplete ? 'Sudah Baca' : 'Belum Baca'}</p>
    <button class="delete-button">Hapus</button>
    <button class="move-button">Pindahkan</button>
  `;
 
  const deleteButton = li.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    const bookId = li.dataset.bookId;
    removeBook(bookId); // Call function to remove book data and element
  });
 
  const moveButton = li.querySelector('.move-button');
  moveButton.addEventListener('click', () => {
    moveBook(book.id, book.isComplete);
  });
 
  return li;
}
 
function loadBooks() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('book-')) {
      const bookData = JSON.parse(localStorage.getItem(key));
      const book = createBookElement(bookData);
 
      if (bookData.isComplete) {
        bookshelfSudahBaca.appendChild(book);
      } else {
        bookshelfBelumBaca.appendChild(book);
      }
    }
  }
}
 
function moveBook(bookId, currentStatus) {
  const bookData = JSON.parse(localStorage.getItem(`book-${bookId}`));
  bookData.isComplete = !currentStatus; // Toggle boolean value
 
  localStorage.setItem(`book-${bookId}`, JSON.stringify(bookData));
 
  const bookElement = document.querySelector(`li[data-book-id="${bookId}"]`);
  bookElement.parentNode.removeChild(bookElement);
 
  const updatedBookElement = createBookElement(bookData);
  if (bookData.isComplete) {
    bookshelfSudahBaca.appendChild(updatedBookElement);
  } else {
    bookshelfBelumBaca.appendChild(updatedBookElement);
  }
}
 
window.onload = loadBooks;
 
function removeBook(bookId) {
  localStorage.removeItem(`book-${bookId}`);
 
  const bookElement = document.querySelector(`li[data-book-id="${bookId}"]`);
  bookElement.parentNode.removeChild(bookElement);
}