import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, message } from 'antd';


import './Login.less';
import url from './img/bgc.jpg';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { reqLogin } from '../../api/';
class Login extends Component {

    componentDidMount = () => {
        let { login } = this.refs;
        if (!login) {
            return;
        }
        setTimeout(() => {
            login.className = 'active'
        },1000)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, { userName, password }) => {
            // 校验通过时进入
            if (!err) {
                // 经过axios 响应拦截器过滤出真正想要的数据
                let result = await reqLogin(userName, password);
                if (result.status === 200) {
                    storageUtils.saveUser(result.data);
                    memoryUtils.user = result.data;
                    this.props.history.replace('/');
                    message.success(`欢迎光临！！，${result.data.userName}`);
                } else {
                    message.error(result.message);
                }
            }
        })

    }
    // 自定义验证
    validatPwd = (rule, value, callback) => {
        value = value.trim();
        if (!value) {
            callback('密码不能为空');
        } else if (value.length < 6) {
            callback('位数不能小于6位');
        } else if (!/^[0-9A-Za-z]+$/.test(value)) {
            callback('密码只能是数字或大小写字母组成');
        } else {
            callback();
        }
    }
    render() {
        let user = memoryUtils.user;
        if (user._id) {
            return <Redirect to="/" />
        }
        let { getFieldDecorator } = this.props.form;
        return (
            <div id="login-wrap" ref="login">
                <div className="login-header">
                    <h1>React项目：一个用react编制的后台管理系统</h1>
                </div>
                <div id="login-content">
                    <img src={url} alt="bg" />
                    <div className="form-box">
                        <h1>进入新世界</h1>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {
                                    getFieldDecorator('userName', {
                                        // 给一个初始值
                                        initialValue: '',
                                        rules: [
                                            // 用组件自带的属性进行验证
                                            { required: true, whitespace: true, message: '用户名不能为空' },
                                            { min: 2, message: '用户名不能少于3位' },
                                            { max: 12, message: '用户名不能大于12位' },
                                            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/, message: '用户名必须是中文或英文或数字或下划线' }
                                        ],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Username"
                                        />)
                                }
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('password', {
                                        initialValue: '',
                                        rules: [
                                            // 自定义验证
                                            { required: true, validator: this.validatPwd }
                                        ]
                                    })(<Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />)
                                }

                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">进入
                                    </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
let WrappedLoginForm = Form.create()(Login);
export default WrappedLoginForm;