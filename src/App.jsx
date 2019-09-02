import React, { Component } from 'react';
import { Button, message } from 'antd';
import { HashRouter, BrowserRouter } from 'router-router-dom'
export default class App extends Component {
    clickHandle = () => {
        message.success('成功了');
    }
    render() {
        return (

            <HashRouter>
                <Button type="primary" onClick={this.clickHandle}>请点击</Button>
            </HashRouter>
        )
    }
};
