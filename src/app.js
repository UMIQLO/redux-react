// @flow
import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './action'

class MyComponent extends React.Component {
    state: { inputValue: string }

    constructor(props) {
        super(props)
        this.state = { inputValue: '' }
    }

    handleTextChange = (event: KeyboardEvent) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({
                inputValue: event.target.value
            })
        }
    }

    handleItemAdd = () => {
        const { inputValue } = this.state
        if (inputValue !== '') {
            this.props.onItemAdd({
                id: +new Date(),
                text: inputValue
            })
            this.setState({
                inputValue: ''
            })
        }
    }

    handleItemDelete = (item: Object) => {
        this.props.onAddHistory({ ...item, type: 'delete' })
        this.props.onItemDel(item.id)
    }

    handleItemRestoreHistory = (historyItem: Object) => {
        if (typeof historyItem !== 'undefined') {
            const newItem = {
                id: +new Date() * Math.random(),
                text: historyItem.text
            }
            this.props.onItemAdd(newItem)
            this.props.onRemoveHistory(historyItem.id)
        }
    }

    render() {
        const { items, history } = this.props
        return (
            <div>
                <input
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleTextChange}
                />
                <button
                    color="primary"
                    onClick={this.handleItemAdd}
                >
                    Add
                </button>
                {
                    items.map(item => (
                        <li key={item.id}>
                            <input
                                type="checkbox"
                                id={item.id}
                                onClick={() => {
                                    this.handleItemDelete(item)
                                }}
                            />
                            {item.text}
                        </li>
                    ))
                }
                <hr/>
                <button
                    color='primary'
                    onClick={() => this.handleItemRestoreHistory(history[0])}
                >
                    Ctrl-Z
                </button>
                {
                    history.map(item => (
                        <li key={item.id}>
                            {item.text}
                        </li>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = store => ({ items: store.items, history: store.history })

export default connect(mapStateToProps, actionCreators)(MyComponent)
