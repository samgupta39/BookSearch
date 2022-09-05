import axios from "axios";

export default {
  //get all book data with search input
  searchBooks: function (input) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + input);
  },
  //get the book data with id#
  searchOneBook: function (id) {
    return axios.get("https://www.googleapis.com/books/v1/volumes/" + id);
  },
  //save the book data
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
  //check if the book is already saved
  findSavedBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  //get all saved books from db
  getSavedBooks: function () {
    return axios.get("/api/books/");
  },
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id)
  }
};