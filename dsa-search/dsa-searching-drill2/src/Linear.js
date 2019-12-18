import React, { Component } from 'react'

export default class Linear extends Component {
    state = {
        result: '',
        numberOfSearches: null
    }

    componentDidMount() {
        let result = this.linearSearch(this.props.data, this.props.input)
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

    linearSearch(array, value) {
        let count = 0
        for (let i = 0; i < array.length; i++) {
            count++
            if (array[i] == value) {
                return { result: i, count }
            }
        }
        return { result: -1, count }
    }

    render() {
        return (
            <div>
                Your item was {this.state.result}. It took {this.state.numberOfSearches} searches.
            </div>
        )
    }
}