// @flow
import React from 'react'
import { connect } from 'react-redux'
import {
    Button,
    Input,
    Checkbox,
    List,
    Container,
    Divider,
    Segment,
    Label,
    Header,
    Icon
} from 'semantic-ui-react'

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
        this.props.onAddHistory({
            ...item,
            type: 'delete'
        })
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
        return <div>
            <Container>
                <Segment>
                    <Header as='h4' color='purple'>ToDoApp</Header>
                    <Input
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.handleTextChange}
                    />
                    <Button
                        inverted color='purple'
                        onClick={this.handleItemAdd}
                    >
                        Add
                    </Button>
                    <List>
                        {
                            items.map(item => (
                                <List.Item key={item.id}>
                                    {item.text}
                                    <Icon
                                        link name='close'
                                        onClick={() => {
                                            this.handleItemDelete(item)
                                        }}
                                    />
                                </List.Item>
                            ))
                        }
                    </List>
                    {
                        history.length > 0 ?
                            <div>
                                <Divider horizontal>History Log</Divider>
                                <Button
                                    inverted color='purple'
                                    onClick={() => this.handleItemRestoreHistory(history[0])}
                                >
                                    Restore
                                </Button>
                                <List>
                                    {
                                        history.map(item => (
                                            <List.Item key={item.id}>
                                                {item.text}
                                            </List.Item>
                                        ))
                                    }
                                </List>
                            </div>
                            : ''
                    }
                </Segment>
            </Container>
        </div>
    }
}

const mapStateToProps = store => ({
    items: store.items,
    history: store.history
})

export default connect(mapStateToProps, actionCreators)(MyComponent)
