import { applicantData, saveApplicantData } from "./data/applicantData.js";
import { jobs, saveToStorage } from "./data/jobs.js";
import { savedJobStorage, savedJobs ,removeJob} from "./data/savedjobs.js";

const overlay=document.querySelector('.sj-overlay')

function generateSavedJobs(){

    let savedJobHTML=''

    savedJobs.forEach((job) => {
        
        savedJobHTML +=`
        <div class="sj-job-container sj-job-container-${job.jobId}">
            <div class="job-title js-sj-job-title">${job.jobTitle}</div>
            <div class="company-name js-sj-company-name">
            <i class="fa-solid fa-building"></i> ${job.companyName}</div>
            <div class="location js-sj-location">
            <i class="fa-solid fa-location-dot"></i>
            ${job.location}</div>
            <div class="applicants-quantity js-sj-applicants-quantity-${job.jobId}">
                ${job.applicantsQuantity} applicants
            </div>
            <div class="job-button js-sj-job-button js-sj-job-button-${job.jobId}">
                <button class="view-job js-sj-remove-job" data-job-id="${job.jobId}">Remove</button>
                <button class="apply-job js-sj-apply-job-now js-sj-apply-now-${job.jobId}" data-job-id="${job.jobId}">Apply</button>
            </div>
            <div class="is-accepting js-accepting-application js-accepting-application-${job.jobId}">
                No longer Accepting Application.
            </div>
          <!--  <div class="save-job js-sj-save-job">
                <button class="save-job-button js-sj-save-job-button" data-job-id="${job.jobId}">
                    <i class="fa-regular fa-bookmark  icon"></i>
                </button>
            </div> -->

        </div>
        `
    });

    document.querySelector(".sj-container").innerHTML=savedJobHTML;

    savedJobs.forEach((job)=>{
        if(!job.acceptingApplication){
            document.querySelector(`.js-sj-job-button-${job.jobId}`).setAttribute('class','remove-button-container');
            document.querySelector(`.js-accepting-application-${job.jobId}`).setAttribute('class','accepting-application');
        }
    })
}

generateSavedJobs();


document.querySelectorAll('.js-sj-remove-job').forEach((removeSavedJob)=>{
    removeSavedJob.addEventListener("click",()=>{
        const {jobId}=removeSavedJob.dataset;
        console.log(jobId)
        removeJob(jobId);
        document.querySelector(`.sj-job-container-${jobId}`).remove();
        console.log(savedJobs);
    })
});

let applyingJob;

function applyJob(jobId){
    jobs.forEach((job)=>{
        if(job.jobId===jobId)
            applyingJob=job;
    });
    console.log(jobId);
    console.log(applyingJob);

    if(document.querySelector(`.js-sj-apply-now-${jobId}`).innerHTML==="Apply"){
        overlay.style.display="block";
        document.querySelector(".jb-popup-application").style.display="block";
    }
    else{
        alert("You already Applied for that Job. Please apply other jobs ")
    }
}

document.querySelectorAll('.js-sj-apply-job-now').forEach((applySavedJob)=>{
    applySavedJob.addEventListener("click",()=>{
        const {jobId}=applySavedJob.dataset;
        applyJob(jobId);
    })
});

document.querySelector('.js-sj-submit-job').addEventListener("click",()=>{
    event.preventDefault();
    let appliedJob=applyingJob;
    appliedJob.applicantsQuantity++;

    let firstName=document.querySelector('.firstname').value;
    let lastName=document.querySelector('.lastname').value;
    let mobileNumber=document.querySelector(".mobile-number").value;
    let email=document.querySelector(".email").value;
    let skills=document.querySelector(".skills").value;
    let shortDisc=document.querySelector(".short-disc").value

    if(!firstName|| !lastName ||!mobileNumber || !email ){
        alert("Fill the Required fields then submit");
    }

    else{
        
        applicantData.push({
            firstName,
            lastName,
            mobileNumber,
            email,
            jobId : appliedJob.jobId,
            skills,
            shortDisc
        });

        document.querySelector(`.js-sj-apply-now-${appliedJob.jobId}`).innerHTML="Applied";

        document.querySelector(`.js-sj-applicants-quantity-${appliedJob.jobId}`)
        .innerHTML=`${appliedJob.applicantsQuantity} applicants`;
    
        document.querySelector(`.js-sj-applicants-quantity-${appliedJob.jobId}`).style.color="green";
    
        saveToStorage();                                               // saving the data to thier respective local storage
        savedJobStorage();
        saveApplicantData();

        console.log(applicantData);
     //   console.log('hello');

        document.querySelector('.firstname').value='';                 // setting form values blank
        document.querySelector('.lastname').value='';
        document.querySelector(".mobile-number").value='';
        document.querySelector(".email").value='';
        document.querySelector(".skills").value='';
        document.querySelector(".short-disc").value='';
        
        overlay.style.display="none";
        document.querySelector(".jb-popup-application").style.display="none";
    }
});

document.querySelector('.js-jb-cancel-application').addEventListener("click",()=>{
    overlay.style.display="none";
    document.querySelector('.jb-popup-application').style.display="none";
})