export const formateDate = (time) => {
    if (!time) return ''
    let date = new Date(time)
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    let day = '';
    switch (date.getUTCDay()) {
        case 1: day = '星期一'; break;
        case 2: day = '星期二'; break;
        case 3: day = '星期三'; break;
        case 4: day = '星期四'; break;
        case 5: day = '星期五'; break;
        case 6: day = '星期六'; break;
        default: day = '星期日';
    }
    return {
        formateDate: date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日  '
            + hour + ':' + min + ':' + s + '   '+ day,
        hour: hour,
    }
}