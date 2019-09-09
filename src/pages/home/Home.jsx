import React, { Component } from 'react'
import { Result, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';

import { formateDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
export default class Home extends Component {
    state = {
        text:''
    }
    getText = ({ hour })=>{
        let text = ''
        if(Number(hour)>17 || Number(hour)<6) {
            text = '晚上好'
        } else if(Number(hour)>11 || Number(hour)<3){
            text = '中午好'
        } else {
            text = '早上好'
        }
        return text
    }
    UNSAFE_componentWillMount = ()=>{
        let text = this.getText(formateDate(Date.now()))
        this.setState({text})
    }
    componentDidMount = ()=>{
        setInterval(()=>{
            let text = this.getText(formateDate(Date.now()))
            this.setState({text})
        },1000*60*60)
    }
    render() {
        return (
            <QueueAnim animConfig={[
                { opacity: [1, 0], translateY: [0, 50] }
            ]}>
                <Result
                    icon={<Icon type="smile" theme="twoTone" />}
                    title={`${memoryUtils.user.userName}，${this.state.text}`}
                    key="home"
                    style={{height:'100%',width:'100%'}}
                />
            </QueueAnim>
        )
    }
}