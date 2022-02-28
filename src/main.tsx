import 'focus-visible/dist/focus-visible'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import * as timeago from 'timeago.js'
import fr from 'timeago.js/lib/lang/fr'

import { ChakraProvider } from '@chakra-ui/react'

import App from './App'
import { store } from './store/store'
import theme from './theme/theme'

timeago.register('fr', fr)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
