import React, { Component } from 'react';
import store from './store'
import Binary from './Binary'
import Linear from './Linear'

class App extends Component {
  state = {
    value: null,
    data: store.data
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      value: e.value
    })
  }

  render() {
    return (
      <main className='App'>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type='text' name='search' id='search' placeholder='Search Dataset (number)' />
        </form>
        <div className='linear-results'>
          <label htmlFor='linear-results'>Linear search results</label>
          <Linear />
        </div>
        <div className='binary-results'>
          <label htmlFor='binary-results'>Binary search results</label>
          <Binary />
        </div>
      </main>
    );
  }
}

export default App;