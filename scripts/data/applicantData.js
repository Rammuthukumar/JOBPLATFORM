export let applicantData= JSON.parse(localStorage.getItem('applicantdata'));

if(!applicantData){
    applicantData=[{
        firstName : "Ram",
        lastName : "Muthukumar",
        mobileNumber : "1234567890",
        email : "rytu",
        jobId : "2FORQWXYZB",
        skills : "Java, JavaScript, MySQL and HTML",
        shortDisc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sint, optio vel soluta commodi velit porro alias vitae culpa ab accusamus impedit odit, consequuntur sapiente eveniet dolorem accusantium voluptates veniam."
    }];
}

export function saveApplicantData(){
    localStorage.setItem('applicantdata',JSON.stringify(applicantData));
};


export function isMobileNumberUnique(mobileNumber, appliedJob) {
    /*
    forEach Method does not respect the return statement to break out of the loop.
    The return false inside forEach will not stop the iteration or return from function as intended.
    */
    
    for (let applicant of applicantData) {
        if (appliedJob.jobId === applicant.jobId && mobileNumber === applicant.mobileNumber) {
            console.log(appliedJob.jobId + " " + applicant.jobId);
            console.log(mobileNumber + " " + applicant.mobileNumber);
            return false;
        }
    }
    return true;
}




