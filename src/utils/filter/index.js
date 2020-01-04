export function getyyyymmdd (value) {
    let date = new Date(value * 1000)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate()
    let dateone = Y + M + D
    return dateone
}
  
export function gethms (value) {
    let date = new Date(value * 1000)
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s = (date.getSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getSeconds())
    let datetwo = h + m + s
    return datetwo
}
  
export function getyyyymmddxiegang (value) {
    let date = new Date(value * 1000)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate()
    let dateone = Y + M + D
    return dateone
}