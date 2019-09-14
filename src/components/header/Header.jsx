import React, { Component } from 'react'
import { Button, Modal, Typography, Input, message, Spin, Row, Col, Icon } from 'antd';
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
        iconLoading: false, // 控制退出按钮的loading
        time: formateDate(Date.now()), // 储存时间
        weather: {
            city: '', // 存储输入的城市
            pictureUrl: '', // 存储获取回来的天气图片
            weather: '', // 存储获取回来的天气信息
            temperature: '' // 存储获取回来的天气温度
        },
        weatherLoading: true // 控制获取天气的loading
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
    /**
     * 切换并获取输入城市的天气
     */
    onClickSwitchCity = async (value) => {
        this.setState({ weatherLoading: true });
        let result = await reqWeather(value.trim());
        // 判断是否有错误
        if(!result.error) {
            this.setState({ weatherLoading: false });
        }
        if (result&&result.error) {
            message.error('您输入的城市，无法获取到天气信息');
            this.setState({ weatherLoading: false });
            return;
        }
        // 判断是否输入了相同的城市
        message.success((this.state.weather.city !== value ? `获取成功！当前城市：${value}` : `更新天气，成功！！`))
        // 获取请求回来的数据
        let { city } = result
        let { dayPictureUrl, nightPictureUrl, weather, temperature } = result.data
        let hour = Number(this.state.time.hour)
        // 储存白天的天气图片或者是储存晚上的天气图片，判断当前是白天还是晚上
        let pictureUrl = (hour > 17 || hour < 5) ? nightPictureUrl : dayPictureUrl
        this.setState({
            weather: {
                city,
                pictureUrl,
                weather,
                temperature,
            },
            weatherLoading: false
        });

    }
    componentDidMount = () => {
        //组件生成时获取一次
        this.onClickSwitchCity('钦州')
        // 开启更新时间的定时器
        this.dateId = setInterval(() => {
            this.setState({
                time: formateDate(Date.now())
            });
        }, 1000)
        // 每10分钟获取一次天气信息
        this.weatherId = setInterval(() => {
            this.onClickSwitchCity(this.state.weather.city)
        }, 1000 * 60 * 10)
    }
    componentWillUnmount = () => {
        clearInterval(this.dateId)
        clearInterval(this.weatherId)
    }

    render() {
        this.title = this.getMenuTitle(menuData)
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
                        <Text code strong className="title">{this.title}</Text>
                    </Col>
                    <Col className="header-bottom-right" xs={18}>
                        <Col xs={0} sm={0} md={6} lg={3}>
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
                        <Col xs={0} sm={0} md={20} lg={12} xl={8}>
                            <div className="weather">
                                <Spin spinning={this.state.weatherLoading}>
                                    <Text>城市：{city}</Text>
                                    <img src={pictureUrl} alt="weather" />
                                    <Text code className="weather-text">{weather}{temperature}</Text>
                                </Spin>
                            </div>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={9} xl={12}>
                            <Text code className="time">{this.state.time.formateDate}</Text>
                        </Col>
                    </Col>
                </Row>
            </header>
        )
    }
}

export default withRouter(Header);