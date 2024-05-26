import {  jobs } from "./jobs.js";

let viewedApplicant=JSON.parse(localStorage.getItem('viewedApplicant'));

if(!viewedApplicant){
    viewedApplicant=[
        {
            firstName : "Ram",
            lastName : "Muthukumar",
            mobileNumber : "1234567890",
            email : "sonthoshram03@gmail.com",
            jobId : "2FORQWXYZB",
            skills : "Java, JavaScript, MySQL and HTML",
            shortDisc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sint, optio vel soluta commodi velit porro alias vitae culpa ab accusamus impedit odit, consequuntur sapiente eveniet dolorem accusantium voluptates veniam."
        }
    ]
}

function storeViewedApplicant(viewedApplicant){
    localStorage.setItem('viewedApplicant',JSON.stringify(viewedApplicant))
}

export function callingViewedApplicant(matchedApplicant){
    if(viewedApplicant.length>5){
         viewedApplicant.pop();
         console.log(viewedApplicant);
    }
    
    let newViewedApplicant=[];

    viewedApplicant.forEach((applicant)=>{
        if(applicant.mobileNumber !== matchedApplicant.mobileNumber){
           newViewedApplicant.unshift(applicant);
        } else if(applicant.mobileNumber===matchedApplicant.mobileNumber && applicant.jobId !==matchedApplicant.jobId){
            newViewedApplicant.unshift(applicant);
        }

    });

    viewedApplicant=newViewedApplicant;
    viewedApplicant.unshift(matchedApplicant);
    storeViewedApplicant(viewedApplicant);
}

function getJobViewed(applicant){
    let matchingJob;
    jobs.forEach((job)=>{
      if(job.jobId===applicant.jobId){
        console.log(job.jobTitle+" "+job.jobId); 
        matchingJob=job;
      }
    });

    return matchingJob;
    
}
export function getApplicationStatus(){
    let noficationHTML='';
    
    viewedApplicant.forEach((applicant) => {
        let viewedJob=getJobViewed(applicant);
       
         noficationHTML +=`
        <div class="notification-preview">
           ${applicant.firstName+" "+applicant.lastName}, Your Application for the Role  <span class="notificaiton-job-title" >${viewedJob.jobTitle}</span> has viewed.
        </div>
    `;
    });

    return noficationHTML;
}

