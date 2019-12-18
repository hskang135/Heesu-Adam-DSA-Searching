import React, { Component } from 'react';
import store from './store'
import Binary from './Binary'
import Linear from './Linear'

class App extends Component {
  state = {
    value: null,
    data: store.data
  }

  indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  }

  binarySearch(array, value, start, end) {
    var start = start === undefined ? 0 : start
    var end = end === undefined ? array.length : end
    let count = 0
    if (start > end) {
      return -1
    }
    const index = Math.floor((start + end) / 2)
    const item = array[index]
    console.log(start, end)
    if (item == value) {
      return index
      console.log(count)
    }
    else if (item < value) {
      return binarySearch(array, value, index + 1, end)
    }
    else if (item > value) {
      return binarySearch(array, value, start, index - 1)
    }
    count++
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