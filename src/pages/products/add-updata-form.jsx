import React, { Component } from 'react'
import {
    Form,
    Input
} from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item
class addUpdataForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        categoryName: PropTypes.string
    }
    handleForm = (rule, value, callback) => {
        value = value.trim()
        if (value.length < 2) {
            callback('请输入2位以上的名称')
        } else if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(value)) {
            callback('请输入中文或字母或数字')
        } else {
            callback()
        }
    }
    UNSAFE_componentWillMount = () => {
        this.props.setForm(this.props.form)
    }
    render() {
        console.log('render')
        let { getFieldDecorator } = this.props.form
        let { categoryName } = this.props
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                        initialValue: categoryName || '',
                        rules: [
                            { validator: this.handleForm, required: true }
                        ]
                    })(<Input type="text" placeholder="请输入分类名称" />)
                }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(addUpdataForm)