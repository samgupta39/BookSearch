import React, { Component } from 'react';
import API from "../API";
import SavedCard from "./Card/SavedCard";

class Saved extends Component {
  state = {
    savedBooks: []
  };

  componentDidMount() {
    this.loadBooks();
  };

  loadBooks = () => {
    API.getSavedBooks()
      .then(res => {
        console.log(res.data);
        res.data.map(book => console.log(book));

        this.setState({
          savedBooks: res.data
        })
      })
      .catch(err => console.log(err));
  };



  render() {

    console.log(this.state.savedBooks);

    if (this.state.savedBooks.length === 0) {
      return (
        <main>
          <p className="not-saved">No books have been saved...</p>
        </main>
      );
    } else {
      return (
        <main>
          {this.state.savedBooks.map(book =>
            <SavedCard
              key={book.bookId}
              id={book.bookId}
              image={book.image}
              href={book.link}
              title={book.title}
              authors={book.authors}
              description={book.description.replace(/<.*?>/g, "")}
              loadBooks={this.loadBooks}
            />
          )}
        </main>
      )
    };
  }
}

export default Saved;