// common collected ID
const inputField = document.getElementById("input-field");
const searchBookContainer = document.getElementById("search-book");
const searchButton = document.getElementById("search-button");
const error = document.getElementById("error-handle");
const resultContainer = document.getElementById("founded-result");
// search function
const searchBooks = () => {
  const searchText = inputField.value;
  searchBookContainer.innerHTML = "";
  //when input field empty
  if (searchText === "") {
    //error handle
    error.innerHTML = "please write something";
    // clear all result length counter
    resultContainer.innerHTML = "";
    // error style
    error.classList.add("error");
    // clear all  search data
    searchBookContainer.textContent = "";
  } else {
    // spinner loader
    error.innerHTML = `
    <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;
    // remove error message style
    error.classList.remove("error");
    // clear founded result
    resultContainer.innerHTML = "";
    // dynamic search URL
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayBooks(data))
      .catch((err) => {
        // error handle
        console.log(err);
      });
  }
};
// display function
const displayBooks = (books) => {
  //when books length === 0 the message will shown
  if (books.docs.length === 0) {
    error.innerHTML = `you have searched <span>${inputField.value}</span>, this result currently not found`;
    //error style
    error.classList.add("error");
    // clear input field
    inputField.value = "";
  } else {
    // clear input field
    inputField.value = "";
    // all result length counter
    resultContainer.innerHTML = `${books.docs.length}, result found of ${books.numFound}`;
    // style add
    resultContainer.classList.add("result");
    // loop through for all books
    const book = books.docs;
    book.forEach((elm) => {
      displayBookDetails(elm);
    });
  }
};
const displayBookDetails = (book) => {
  // clear error message
  error.textContent = "";
  // books photo dynamic url
  const largeImgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
  const MediumImgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
  // create an element
  const div = document.createElement("div");
  // div class added
  div.classList.add("col");
  // div innerHTML set this html will shown on html file
  div.innerHTML = `
  <div class="card h-100">
  <img src="${
    MediumImgUrl ? MediumImgUrl : largeImgUrl
  }" class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">${book.title}</h5>
    <h6 class="card-title">author : ${
      book.author_name ? book.author_name : "N/a"
    }</h6>
    <h6 class="card-title">first publish: ${
      book.publish_date ? book.publish_date[0] : book.publish_date
    }</h6>
    <h6>publisher: ${book.publisher ? book.publisher : "N/a"}</h6>
    <p>publisher place: ${book.publish_place ? book.publish_place : "N/a"}</p>
  </div>
</div>
  
  `;
  // append child
  searchBookContainer.appendChild(div);
};
