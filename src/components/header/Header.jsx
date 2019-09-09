import React, { Component } from 'react'
import { Button, Modal, Typography, Input, message, Spin, Row, Col,Icon } from 'antd';
import { withRouter } from 'react-router-dom';

import './Header.less';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import { formateDate } from '../../utils/dateUtils';
import { menuData } from '../config/configMenu';
import { reqWeather } from '../../api/';
const { Text } = Typography;
const { confirm } = Modal;
const { Search } = Input;
class Header extends Component {
    state = {
        iconLoading: false,
        time: formateDate(Date.now()),
        weather: {
            city: '钦州',
            pictureUrl: '',
            weather: '',
            temperature: ''
        },
        weatherLoading: true
    };
    enterIconLoading = () => {
        this.setState({ iconLoading: true });
        confirm({
            title: '提示',
            content: '您确定要退出吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                storageUtils.removeUser();
                memoryUtils.user = {};
                this.props.history.replace('/login');
            },
            onCancel: () => {
                this.setState({ iconLoading: false });
            },
        });
    };

    getMenuTitle = (menuData) => {
        let title = ''
        let path = this.props.location.pathname
        menuData.forEach(item => {
            if (item.key === path) {
                title = item.title;
                return;
            } else if (item.children) {
                let result = item.children.find(cItem => cItem.key === path)
                if (result) title = result.title
            }
        });
        return title;
    }
    onClickSwitchCity = async (value) => {
        value = value.trim();
        let newState = this.state
        newState.weatherLoading = true;
        this.setState(newState);
        let result = await reqWeather(value);
        if (result.error) {
            message.error('您输入的城市，无法获取到天气信息');
            newState.weatherLoading = false;
            this.setState(newState);
            return;
        }
        newState.city = value;
        let { city } = result
        let { dayPictureUrl, nightPictureUrl, weather, temperature } = result.data
        let pictureUrl = ''
        let hour = Number(this.state.time.hour)
        if (hour > 17 || hour < 5) {
            pictureUrl = nightPictureUrl
        } else {
            pictureUrl = dayPictureUrl
        }
        newState.weather = {
            city,
            pictureUrl,
            weather,
            temperature
        }
        newState.weatherLoading = false;
        this.setState(newState);
        message.success(`获取成功！当前城市：${value}`);
    }
    componentDidMount = () => {
        this.onClickSwitchCity(this.state.weather.city)
        this.dateId = setInterval(() => {
            let data = this.state;
            data.time = formateDate(Date.now());
            this.setState(data);
            data = null;
        }, 1000)
        this.weatherId = setInterval(() => {
            this.onClickSwitchCity(this.state.weather.city)
        }, 1000 * 60 * 30)
    }
    componentWillUnmount = ()=>{
        clearInterval(this.dateId)
        clearInterval(this.weatherId)
    }
    
    render() {
        const Title = this.getMenuTitle(menuData)
        let { pictureUrl, weather, temperature, city } = this.state.weather
        return (
            <header id="header-wrap">
                <div className="header-top">
                    <Button
                        type="primary"
                        icon="logout"
                        loading={this.state.iconLoading}
                        onClick={this.enterIconLoading}
                    >
                        退出
                    </Button>
                </div>
                <Row className="header-bottom">
                    <Col className="header-bottom-left" xs={6}>
                        <Text code strong className="title">{Title}</Text>
                    </Col>
                    <Col className="header-bottom-right" xs={18}>
                        <Col xs={0} sm={0} md={6} lg={4}>
                            <span className="search" ref='search'
                                onBlur={() => { this.refs.search.style.width = '' }}
                                onClick={() => { this.refs.search.style.width = '100%' }}
                            >
                                <Search
                                    placeholder="输入城市"
                                    size="small"
                                    prefix={<Icon type="ant-cloud" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    onSearch={this.onClickSwitchCity}
                                />
                            </span>
                        </Col>
                        <Col xs={0} sm={0} md={20} lg={10} xl={8}>
                            <div className="weather">
                                <Spin spinning={this.state.weatherLoading}>
                                    <Text>城市：{city}</Text>
                                    <img src={pictureUrl} alt="weather" />
                                    <Text code className="weather-text">{weather}{temperature}</Text>
                                </Spin>
                            </div>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={10} xl={12}>
                            <Text code className="time">{this.state.time.formateDate}</Text>
                        </Col>
                    </Col>
                </Row>
            </header>
        )
    }
}

export default withRouter(Header);