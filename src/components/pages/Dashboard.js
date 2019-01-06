import React from 'react'
import HeaderFile from './Header'
import SidebarFile from './Sidebar'
import DashboardSwitcherFile from './DashboardSwitcher'

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <HeaderFile/>
                <div className="container-fluid">
                    <div className="row">
                        <SidebarFile/>
                        <DashboardSwitcherFile/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
