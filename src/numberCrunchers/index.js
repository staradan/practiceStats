// import Firebase from '../firebase';
// const firebase = new Firebase();

export const datesAreInRange = (first, second, dateParam) => {
    if (dateParam === 'day') {
        return (
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate()
        );
    } else if (dateParam === 'week') {
        //gotta fix this one man
        return true;
    } else if (dateParam === 'month') {
        return (
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth()
        );
    } else if (dateParam === 'year') {
        return (
            first.getFullYear() === second.getFullYear()
        )
    } else {
        return true;
    }
}

export const dateToString = (inputDate) => {
    return '' + inputDate.getFullYear() + inputDate.getMonth() + inputDate.getDate();
}


export const getDateFromFirebase = (seconds) => {
    return new Date(seconds * 1000);
}