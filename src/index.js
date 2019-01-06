import React from 'react'
import ReactDOM from 'react-dom'
import AppFile from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
      <AppFile/>
    </BrowserRouter>,
    document.getElementById("root")
)
