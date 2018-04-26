import React, { Component } from 'react';
import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import 'react-virtualized/styles.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      recommendations: []
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_ROOT}/api/books/list`)
      .then(res => res.json())
      .then(data => this.setState({ books: data.books }));
  }

  handleChange = (selectedBook) => {
    fetch(`${process.env.REACT_APP_API_ROOT}/api/books/${selectedBook.value}/recommendations`)
      .then(res => res.json())
      .then(data => this.setState({ recommendations: data.titles }));
  }

  render() {
    let { books, recommendations } = this.state;
    return (
      <div className='content'>
        <Select
          name='book-select'
          placeholder='pick a book you liked'
          onChange={this.handleChange}
          options={
            books.map(book => {
              return {
                label: book.title,
                value: book.id
              }
            })
          }
        />
        {
          !!recommendations.length &&
          <div className='recommendations'>
          <h4>Based on the book you selected, you'd likely enjoy:</h4>
          {
            recommendations.map(recommendation => {
            return (
              <a
                href= { `https://www.amazon.com/s/?field-keywords=${ recommendation }` }
                key={ recommendation }
                className='recommendation-title'>
                { recommendation }
              </a>
            )
            })
          }
          </div>
        }
      </div>
    );
  }
}

export default App;
