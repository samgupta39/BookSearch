# React Book Search App 📚

Search, browse, save and reveiw a book of your interest

## Demo

![gif](client/public/newDemo.gif) 

## Functionality

- Once a user fills in the search box and submit it, the app will connect Google Books API and render the search result.

- A user can save a book by clicking the save button. At the back-end, the app will save it to the MongoDB database using mongoose schema. 

- The saved page will get all saved books from the database and render them on the page. The delete button allows a user to delete a book from the database.   

- The app utilizes React lifecycle method to query and display book data on the page. 

- This is a SPA (Single Page Application) where react-router-dom navigates React components without changing the routes in Express.

## Express Routes

``/api/books (post)`` - create data set of a new book (documents) and save in the books collection inside the database.  
``/api/books (get)`` - returns all saved books as JSON from the database.  
``/api/books/:id (get)`` - return a book from the database by id.  
``/api/books/:id (delete)`` - deletes a book from the database by id.  
``* (get)`` - loads the single HTML page in client/build/index.html.  

## Technologies & Resources

- Node, Express, MongoDB, and Mongoose for back-end
- React for front-end
- MVC design pattern
- Material-UI
- socket.io

