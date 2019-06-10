export default function FormatDate(datestring){

    const datearray = datestring.split("T")[0].split("-");
    const date = {year: datearray[0],
        month: parseInt(datearray[1]),
        day: datearray[2]};
    const monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];

    const datetext = monthlist[date.month - 1] + ' '+ date.day + ', '+date.year;
    return datetext;
}
