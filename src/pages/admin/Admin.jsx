import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import memoryUtils from '../../utils/memoryUtils';
export default class Admin extends Component {
    
    UNSAFE_componentWillMount = async () => {
        
    }

    render() {
        let user = memoryUtils.user;
        if (!user._id) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                Admin
                </div>
        )


    }
}
