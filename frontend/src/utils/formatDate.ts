export function formateDate(dateString: string) {
    const regex = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/;

    const match = dateString.match(regex);

    if (match) {
        const extractedDate : string = match[1];
        const extractedTime : string= match[2];
        const full_date : string = extractedDate + "/" + extractedTime
        return full_date;
    } else {
        return "Error date extracting"
    }
    
}