export function getDateForJob(){
    let date=[];
    const d=new Date();

    const year=d.getFullYear();
    const month=d.getMonth()+1;
    const day=d.getDate();
    const hour=d.getHours();

    date.push(
        {
            year,
            month,
            day,
            hour
        }
    );

    return date[0];
}

export function getCurrentTime(job){
    const currentTime=new Date();

    const postedTime=new Date(
        job.time.year,
        job.time.month-1,
        job.time.day,
        job.time.hour
    );

    console.log((currentTime.getTime()-postedTime.getTime())/1000*60);
    console.log(postedTime);

    let timeDiff=currentTime.getTime()-postedTime.getTime();

    let minElapsed=Math.floor(timeDiff/(1000*60));
    let hoursElapsed=Math.floor(minElapsed/60);
    let daysElapsed=Math.floor(hoursElapsed/24);
    let monthElasped=Math.floor(daysElapsed/30);

    let timeElapsedString;
    if (minElapsed < 60) {
        timeElapsedString = minElapsed + " minutes";
    } else if (hoursElapsed < 24) {
        timeElapsedString = hoursElapsed + " hr ";
    } else if(daysElapsed<30) {
        timeElapsedString = daysElapsed + " days ";
    } else {
        timeElapsedString = monthElasped + " month"
    }

   return timeElapsedString;
}






