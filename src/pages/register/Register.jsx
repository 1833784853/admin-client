import React, { Component } from 'react'

export default class Register extends Component {
    render() {
        return (
            <div>
                <form action="/user/register" method="post">
                    <input type="text" name="userName" />
                    <input type="password" name="password" />
                    <button>提交</button>
                </form>
            </div>
        )
    }
}
