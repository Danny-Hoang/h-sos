import moment from "moment";

export const formatMonthDate = (dateObj) => {
    let month = dateObj.getMonth()
    let date = dateObj.getDate()
    return `${month + 1}/${date}`
}

export const formatDateToString = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split("T")[0].replace(/-/g, ".");
}

export const formatEventTime = () => {
    return moment().format('yyyy-MM-DDTHH:mm:ss') + 'Z';
}

export const formatSOSTime = (createDate) => {
    let date = new Date(createDate)
    let second = date.getTime() / (1000 * 60)
    let now = new Date()
    let secondNow = now.getTime() / (1000 * 60)
    let diff = parseInt(secondNow - second)
    return diff === 0 ? "Just now" : Math.floor(diff / (24 * 60)) > 0 ? (Math.floor(diff / (24 * 60)) + " day(s) ago") : ( Math.floor(diff / 60) > 0 ? ( Math.floor(diff / 60) + 'h ' + parseInt(diff % 60) + 'm ago') : diff + "m ago")
}