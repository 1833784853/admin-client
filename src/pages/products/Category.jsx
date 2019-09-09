import React, { Component } from 'react'
import { Card, Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
export default class Category extends Component {
    render() {
        return (
            <QueueAnim animConfig={[
                { translateX: [0, -150],opacity: [1, 0] }
            ]}>
                <Card bordered={false} extra={<Button type="primary"><Icon type="plus"></Icon></Button>} key="card">
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </QueueAnim>
        )
    }
}