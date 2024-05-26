export let savedJobs=JSON.parse(localStorage.getItem('savedjobs'));

if(!savedJobs){
    savedJobs=[
        {
          jobId:'1ABCWERQYX',
          jobTitle : "Software Engineer Intern",
          companyName : "ABC Software Solutions",
          location : "Chennai, Tamil Nadu",
          salary : "12k - 15k month",
          time : "Posted 2 days ago",
          jobType: "Internship",
          jobMode : "Remote",
          jobRequirements :"Basic Knowledge about JavaScript,Must Know about OS and DBMS",
          applicantsQuantity:0,
          acceptingApplicaiton:true
        }
    ]
}

export function savedJobStorage(){
    localStorage.setItem('savedjobs',JSON.stringify(savedJobs));
    console.log("stored");
}

export function removeJob(jobId){
    let newSavedJob=[];

    savedJobs.forEach((job)=>{
        if(job.jobId !=jobId)
            newSavedJob.push(job);
    });

    savedJobs=newSavedJob;
    savedJobStorage();
    
}