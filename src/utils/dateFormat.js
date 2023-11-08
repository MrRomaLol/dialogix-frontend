export default function formatDate(date) {
    date = new Date(date);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `Today at ${hours}:${minutes}`;
    } else if (diffInDays === 1) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `Yesterday at ${hours}:${minutes}`;
    } else {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    }

    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // const year = date.getFullYear();
    // let hours = date.getHours();
    // let minutes = date.getMinutes();
    //
    // day = day < 10 ? '0' + day : day;
    // month = month < 10 ? '0' + month : month;
    // hours = hours < 10 ? '0' + hours : hours;
    // minutes = minutes < 10 ? '0' + minutes : minutes;
    //
    // return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
}