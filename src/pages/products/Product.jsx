import React, { Component } from 'react'
import { Card, message, Table, Button, Icon, Select, Row, Col, Input } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { Option } = Select
const { Search } = Input
export default class Product extends Component {

    render() {
        const left = (
            <Row>
                <Col xs={12} md={6} lg={3}>
                    <Select value="1">
                        <Option value="1">按名称搜索</Option>
                        <Option value="2">按分类搜索</Option>
                    </Select>
                </Col>
                <Col xs={12} md={6}>
                    <Search type="text" placeholder="请输入搜索内容" enterButton />
                </Col>
            </Row>
        )
        const right = (
            <Button type="primary">
                <Icon type="plus" />
                添加
            </Button>
        )
        return (
            <QueueAnim animConfig={[
                { translateY: [0, 50], opacity: [1, 0] }
            ]}>
                <Card title={left} extra={right} key="product">
                    <Table />
                </Card>
            </QueueAnim>
        )
    }
}