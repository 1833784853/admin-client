export const formateDate = (time) => {
    if(!time) return ''
    let date = new Date(time)
    let hour = date.getHours() < 10?'0'+ date.getHours():date.getHours();
    let min = date.getMinutes() < 10?'0'+ date.getMinutes():date.getMinutes();
    let s = date.getSeconds() < 10?'0'+ date.getSeconds():date.getSeconds();
    return {
        formateDate :date.getFullYear() + '年' +(date.getMonth()+1) + '月' + date.getDate()+ '日  '
    +hour+':'+min+':'+s,
        hour: hour
    }
}