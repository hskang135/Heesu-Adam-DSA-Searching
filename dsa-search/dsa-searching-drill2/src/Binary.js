import React, { Component } from 'react'

export default class Binary extends Component {
    state = {
        result: '',
        numberOfSearches: null
    }

    componentDidMount() {
        let result = this.binarySearch(this.props.data, this.props.input)
        if (result.result < 0) {
            this.setState({
                result: 'not in the dataset',
                numberOfSearches: result.count
            })
        }
        else {
            this.setState({
                result: 'in the dataset',
                numberOfSearches: result.count
            })
        }
    }

    binarySearch(array, value, count = 0, start, end) {
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
            return {result: -1, count}
        }
        else if (item < value) {
            return binarySearch(array, value, count = count + 1, index + 1, end);
        }
        else if (item > value) {
            return binarySearch(array, value, count = count + 1, start, index - 1);
        }
    }

    render() {
        return (
            <div>
                Your item was {this.state.result}. It took {this.state.numberOfSearches} searches.
            </div>
        )
    }
}