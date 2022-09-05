import React, { Component } from 'react';
import API from "../API";
import SearchCard from "./Card/SearchCard";

import socketIOClient from "socket.io-client";

let socket;

class Search extends Component {
  state = {
    result: [],
    searchInput: "",
    savedTitle: "",
  };

  componentDidMount() {
    this.initSocket();
  };

  initSocket = () => {
    // const endpoint = `localhost:${process.env.PORT || 3001}`;
    // const socket = socketIOClient(endpoint);
    socket = socketIOClient();
    socket.on('message', (msg) => {
      document.querySelector(".socket-msg p").innerHTML = msg;
      document.querySelector(".socket-msg").classList.remove("hide");
      setTimeout(() => {
        document.querySelector(".socket-msg").classList.add("hide");
      }, 3500);
    });
  }

  handleSaveSubmit = (e) => {
    e.preventDefault();
    const id = e.target.name;
    let buttonValue = e.target;

    API.searchOneBook(id)
      .then(res => {
        const bookData = res.data;

        API.findSavedBook(res.data.id)
          .then(savedBook => {
            if (savedBook.data.length === 0) {

              API.saveBook({
                bookId: bookData.id,
                title: bookData.volumeInfo.title,
                authors: bookData.volumeInfo.authors,
                published: bookData.volumeInfo.publishedDate,
                description: bookData.volumeInfo.description,
                image: bookData.volumeInfo.imageLinks.thumbnail,
                link: bookData.volumeInfo.previewLink
              })
                .then(res => {
                  console.log("let's save");
                  buttonValue.innerHTML = "Saved";

                  this.setState({
                    savedTitle: bookData.volumeInfo.title
                  })

                  socket.emit('message', this.state.savedTitle);
                });

            } else {
              console.log("already saved");
              buttonValue.innerHTML = "Already saved";
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };


  searchBook = (input) => {
    API.searchBooks(input)
      .then(res => {
        document.querySelector("#search-input").value = "";
        this.setState({
          result: res.data.items
        });
      })
      .catch(err => console.log(err));
  }

  handleInputChange = e => {
    const value = e.target.value;
    this.setState({
      searchInput: value
    });
  };

  handleEnterPress = e => {
    if (e.key === "Enter") {
      this.handleFormSubmit();
    }
  }

  handleFormSubmit = e => {
    if (document.querySelector("#search-input").value !== "") {
      this.searchBook(this.state.searchInput);
    }
  };


  render() {
    return (
      <main>

        <div className="title-container">
          <div className="title">
            <h1 id="message">You know you've read a good book when you turn the last page and feel a little as if you have lost a friend.</h1>
            <h2>- Paul Sweeney</h2>
            <div id="search-box">
              <label></label>
              <input onChange={this.handleInputChange} onKeyDown={this.handleEnterPress} type="text" id="search-input" placeholder="Search any book..." autoComplete="off" />
              <button onClick={this.handleFormSubmit} id="search-button"><i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        {this.state.result.map(book =>
          <SearchCard
            key={book.id}
            id={book.id}
            image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""}
            href={book.volumeInfo.previewLink}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            published={book.volumeInfo.publishedDate}
            description={book.volumeInfo.description}
            handleSaveSubmit={this.handleSaveSubmit}
          />
        )}
      </main>
    )
  };
};

export default Search;