import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'semantic-ui-css/semantic.min.css'

import itemApp from './reducer'
import MyComponent from './app'

// @Store
const store = createStore(
    itemApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

ReactDOM.render(
    <Provider store={store}>
        <MyComponent/>
    </Provider>,
    document.getElementById('root')
)

