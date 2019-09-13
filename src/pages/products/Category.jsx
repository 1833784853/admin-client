import React, { Component } from 'react'
import { Card, Button, Icon, Table, message, Modal } from 'antd';
import QueueAnim from 'rc-queue-anim';


import { reqGetCategoryList, sendAddCategory, sendUpdataCategory } from '../../api/';
import AddUpdataForm from './add-updata-form';
export default class Category extends Component {
    state = {
        pageSize: 6,
        data: [],
        count: null,
        tableLoading: true,
        visible: false,
        modalIsAdd: null // 用来指定Modal的标题 0 是 添加分类 1 是修改分类
    }

    UNSAFE_componentWillMount = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                render: (category) => <Button type="primary" ghost size='small' onClick={() => {
                    this.setState({
                        visible: true,
                        modalIsAdd: 1
                    })
                    this.category = category
                }}>修改</Button>,
                width: 200
            },
        ];
        this.getCategory();
    }

    showAddForm = () => {
        this.category = ''
        this.setState({ visible: true, modalIsAdd: 0 })
    }
    handleOk = () => {
        this.form.validateFields(async (err, values) => {
            if (this.state.modalIsAdd === 0) {
                if (!err) {
                    let { categoryName } = values
                    let resultAdd = await sendAddCategory(categoryName)
                    if (resultAdd.status === 200) {
                        message.success(resultAdd.message)
                        this.handleCancel()
                        this.getCategory()
                    } else {
                        message.error(resultAdd.message)
                        this.handleCancel()
                    }
                }
            } else {
                if (!err) {
                    let { _id } = this.category
                    let { categoryName } = values
                    let resultUpdata = await sendUpdataCategory(_id, categoryName)
                    if (resultUpdata.status === 200) {
                        message.success(resultUpdata.message)
                        this.handleCancel()
                        this.getCategory()
                    } else {
                        message.error(resultUpdata.message)
                        this.handleCancel()
                    }
                }
            }
        })
    }
    handleCancel = (e) => {
        this.setState({ visible: false, modalTitle: 1 })
    }
    getCategory = async (page, pageSize) => {
        this.setState({ tableLoading: true })
        let { status, data, count, message } = await reqGetCategoryList(page, pageSize);
        if (status && status === 200) {
            this.setState({
                data,
                count,
                tableLoading: false
            })
        } else {
            message.error(message);
        }
    }
    render() {
        const { data, tableLoading, pageSize, count, modalIsAdd, visible } = this.state
        const category = this.category || {}
        return (
            <QueueAnim animConfig={[
                { translateX: [0, 50], opacity: [1, 0] }
            ]}>
                <Card bordered={false} extra={<Button type="primary" onClick={this.showAddForm}><Icon type="plus"></Icon></Button>} key="card">
                    <Table
                        columns={this.columns}
                        dataSource={data}
                        size="middle"
                        bordered
                        loading={tableLoading}
                        rowKey="_id"
                        pagination={
                            {
                                defaultPageSize: pageSize,
                                showQuickJumper: true,
                                total: count,
                                defaultCurrent: 1,
                                onChange: this.getCategory
                            }
                        }
                    />

                    <Modal
                        title={modalIsAdd ? '修改分类' : '添加新分类'}
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText={modalIsAdd ? "修改" : "添加"}
                        cancelText="取消"
                        afterClose={() => {
                            this.form.resetFields()
                        }}
                    >
                        <AddUpdataForm setForm={form => this.form = form} categoryName={category.name} />
                    </Modal>
                </Card>
            </QueueAnim>
        )
    }
}