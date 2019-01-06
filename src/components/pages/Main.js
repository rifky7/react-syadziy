import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginFile from '../Login'
import DashboardFile from './Dashboard'


const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={LoginFile} />

                <DashboardFile/>
            </Switch>
        </main>
    )
}

export default Main
