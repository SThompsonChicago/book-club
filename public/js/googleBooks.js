// let bookTitle = searchInput.value.trim();
// let searchText = (searchImput.value.trim());
// let searches = [];

//user inputs their book title search, and the search returns fetch data
function googleBooksApi(bookToSearch) {
  // bookTitle;
  // let [row] = (data);
  fetch(`/api/google/${bookToSearch}`)
  // fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookToSearch}&key=AIzaSyA-hqQjqpuIodg2ouHkE0ZWaQehBv4DCF8`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    // let {title, authors, categories: genre} = data.items[1].volumeInfo;
    // let isbn = data.items[1].volumeInfo.industryIdentifiers;
    // let title = data.items.volumeInfo.title;
    // let author = data.items.volumeInfo.authors;
    // let isbn = data.items.volumeInfo.industryIdentifiers[1];
    // let genre = data.items.volumeInfo.categories;
    //let image = items.volumeInfo.imageLinks.thumbnail;
    //let preview = items.volumeInfo.previewLink;
    console.log(data);
    console.log(title, authors, isbn, genre)
  });
  //seedBookTable();
}
googleBooksApi('The Hunt for Red October');

//PROCESSES

//make pressing enter submit the search
// searchInput.addEventListener("keyup", (event) => {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//   };
// });

// //make clicking the search button submit the search
// searchButton.addEventListener("click", (event) => {
// event.preventDefault();
//   let searchText = searchInput.value.trim();
//   if (searchText === "") {
//     alert("Please enter a book title");
//     return;
//   };
//   searches.push(searchText);
// })


//can we seed this into the database?