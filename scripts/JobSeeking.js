import { getCurrentTime } from "./date.js";
import { applicantData,  saveApplicantData } from "./data/applicantData.js";
import { jobs,saveToStorage } from "./data/jobs.js";
import { savedJobStorage, savedJobs } from "./data/savedjobs.js";
import { getApplicationStatus} from "./data/viewedapplicant.js";
import { validateInputs } from "./validation/validation.js";
import { toastNotification } from "./validation/notifications.js";


const overlay=document.querySelector(".jb-overlay");
const popup=document.querySelector(".jb-popup");
const notificationContainer=document.querySelector('.js-notification-popup-container');


function generateJobList(){

    let jobsHTML=''

    jobs.forEach((job) => { 
        console.log(job)
        jobsHTML +=`
        <div class="jb-job-container">
            <div class="job-title js-jb-job-title">${job.jobTitle}</div>
            <div class="company-name js-jb-company-name">
            <i class="fa-solid fa-building"></i> ${job.companyName}</div>
            <div class="location js-jb-location">
            <i class="fa-solid fa-location-dot"></i>
            ${job.location}</div>
            <div class="job-state-details">
            <div class="time-posted js-time-posted">
                 ${getCurrentTime(job)} ago
            </div> 
            <div class="bullet-sym">
             &#x2022;
            </div>
            <div class="applicants-quantity js-jb-applicants-quantity-${job.jobId}">
            ${job.applicantsQuantity} applicant
            </div>
            </div>
            <div class="job-button js-jb-job-button js-jb-job-button-container-${job.jobId}">
                <button class="view-job js-jb-view-job" data-job-id="${job.jobId}">View</button>
                <button class="apply-job js-jb-apply-job-now js-jb-apply-now-${job.jobId}" data-job-id="${job.jobId}">Apply</button>
            </div>
            <div class="is-accepting js-accepting-application js-accepting-application-${job.jobId}">
                No longer Accepting Application.
            </div>
            <div class="save-job js-jb-save-job">
                <button class="save-job-button js-jb-save-job-button save-icon-${job.jobId}" data-job-id="${job.jobId}">
                </button>
            </div>

        </div>
        `
    });

    document.querySelector(".js-jb-container").innerHTML=jobsHTML;

     jobs.forEach((job)=>{
        if(!job.acceptingApplication){
            document.querySelector(`.js-jb-job-button-container-${job.jobId}`).setAttribute('class','remove-button-container');
            document.querySelector(`.js-accepting-application-${job.jobId}`).setAttribute('class','accepting-application');
        }
    }) 
}

generateJobList();

function viewJob(jobId){
    let matchingJob;

    let jobDetailHTML='';

    jobs.forEach((job)=>{
        if(job.jobId===jobId){
            matchingJob=job;
        }
    });

    overlay.style.display="block";
    popup.style.display="block";

     jobDetailHTML=`
        <div>
            <div class="jp-job-title">${matchingJob.jobTitle}</div>
            <div class="jp-job-id">JOB ID : ${matchingJob.jobId}</div>
            <div class="jp-company-name">
            <i class="fa-solid fa-building"></i> ${matchingJob.companyName}</div>
            <div class="jp-location">
                <i class="fa-solid fa-location-dot"></i> ${matchingJob.location}</div>
            <div class="jp-salary">
                <i class="fa-solid fa-indian-rupee-sign"></i>  ${matchingJob.salary}</div>
            <div class="jb-job-mode">
            <i class="fa-solid fa-building"></i> ${matchingJob.jobMode}</div>
            <div class="jb-job-type">
            <i class="fa-solid fa-briefcase"></i> ${matchingJob.jobType}</div>
            <div class="jp-job-requirements">Requirements :<br> ${matchingJob.jobRequirements}</div>
           <!-- <div class="jb-popup-button">
                <button class="popup-apply-job js-jb-apply-job" data-job-id="${matchingJob.jobId}">Apply</button>
            </div> -->
        </div>
        <div class="cancel-button-popup">
            <button class="cancel-job js-jb-cancel-job">&#x2715</button>
        </dic>
    ` 
    
    popup.innerHTML=jobDetailHTML;
    addDomEvent();
}

document.querySelectorAll(".js-jb-view-job")
    .forEach((viewButton)=>{
        viewButton.addEventListener("click",()=>{
            const {jobId} = viewButton.dataset;
            viewJob(jobId)
        })
});

function addDomEvent(){
document.querySelector(".cancel-job").addEventListener("click",()=>{
    overlay.style.display="none";
    popup.style.display="none";
});
}

let applyingJob;

function applyJob(jobId){
    jobs.forEach((job)=>{
        if(job.jobId===jobId)
            applyingJob=job;
    });
    console.log(jobId)

    if(document.querySelector(`.js-jb-apply-now-${jobId}`).innerHTML==="Apply"){
        overlay.style.display="block";
        document.querySelector(".jb-popup-application").style.display="block";
    }
    else{
        alert("You already Applied for that Job. Please apply other jobs ")
    }
}

document.querySelectorAll(".js-jb-apply-job-now").forEach((applyNow)=>{
        applyNow.addEventListener("click",()=>{
            const {jobId}=applyNow.dataset;
            applyJob(jobId);
            
        })
    });

document.querySelector(".js-jb-submit-job").addEventListener('click',(e)=>{
    let appliedJob=applyingJob;
    appliedJob.applicantsQuantity++;
    console.log('hlel')

    let firstNameInput=document.querySelector('.firstname');
    let lastNameInput=document.querySelector('.lastname');
    let mobileNumberInput=document.querySelector(".mobile-number");
    let emailInput=document.querySelector(".email");
    let skillsInput=document.querySelector(".skills");
    let shortDisc=document.querySelector(".short-disc").value;

    if(!validateInputs(firstNameInput,lastNameInput,mobileNumberInput,emailInput,skillsInput,appliedJob)){
        e.preventDefault();
    }
    
    else{
        console.log(appliedJob);

        let firstName=firstNameInput.value;
        let lastName=lastNameInput.value;
        let mobileNumber=mobileNumberInput.value;
        let email=emailInput.value;
        let skills=skillsInput.value;
        
        applicantData.push({
            firstName,
            lastName,
            mobileNumber,
            email,
            jobId : appliedJob.jobId,
            skills,
            shortDisc
        });

        document.querySelector(`.js-jb-apply-now-${appliedJob.jobId}`).innerHTML="Applied";

        document.querySelector(`.js-jb-applicants-quantity-${appliedJob.jobId}`)
        .innerHTML=`${appliedJob.applicantsQuantity} applicants`;
    
        document.querySelector(`.js-jb-applicants-quantity-${appliedJob.jobId}`).style.color="green";
    
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
        toastNotification('Successfully Applied');
    }
});

document.querySelectorAll(".js-jb-save-job-button").forEach((saveButton)=>{
        saveButton.addEventListener("click",(e)=>{
            const {jobId}=saveButton.dataset;
            let matchingJob;
            let clickedButton=document.querySelector(`.save-icon-${jobId}`);

            clickedButton.classList.add("checked-saved-job");

            jobs.forEach((job)=>{
                if(job.jobId===jobId)
                    matchingJob=job;
            });

            if(!savedJobs.some(job=>job.jobId===matchingJob.jobId)){
                savedJobs.push(matchingJob);
            } 
            savedJobStorage();
            saveToStorage();
            document.querySelector('.js-saved-job-count').innerHTML=savedJobs.length
            console.log(savedJobs);
            toastNotification('Job Saved')

    })
});

document.querySelector(".js-jb-cancel-application").addEventListener(("click"),()=>{
    overlay.style.display="none";
    document.querySelector(".jb-popup-application").style.display="none";

});

document.querySelector('.notification-icon').addEventListener(('mouseover'),()=>{
    notificationContainer.style.display="block";
    let notificationListHTML =getApplicationStatus();
    document.querySelector('.js-notification-container-list').innerHTML=notificationListHTML;
    document.querySelector('.notification-count').style.display="none";
    
});

document.querySelector('.notification-icon').addEventListener(("mouseout"),()=>{
    notificationContainer.style.display="none";
});

document.querySelector('.js-notification-popup-container').addEventListener(('mouseover'),()=>{
    document.querySelector('.js-notification-popup-container').style.display="block"
})

document.querySelector('.js-notification-popup-container').addEventListener(('mouseout'),()=>{
    document.querySelector('.js-notification-popup-container').style.display="none"
})

let searchCategory;

function generateJobByCategory(searchCategory){
  let generateJobByCategoryHTML='';

  jobs.forEach((job)=>{

    if(job.jobCategory===searchCategory){
        generateJobByCategoryHTML+=`
        <div class="jb-job-container">
        <div class="job-title js-jb-job-title">${job.jobTitle}</div>
        <div class="company-name js-jb-company-name">
        <i class="fa-solid fa-building"></i> ${job.companyName}</div>
        <div class="location js-jb-location">
        <i class="fa-solid fa-location-dot"></i>
        ${job.location}</div>
        <div class="job-state-details">
        <div class="time-posted js-time-posted">
             ${getCurrentTime(job)} ago
        </div> 
        <div class="bullet-sym">
         &#x2022;
        </div>
        <div class="applicants-quantity js-jb-applicants-quantity-${job.jobId}">
        ${job.applicantsQuantity} applicant
        </div>
        </div>
        <div class="job-button js-jb-job-button js-jb-job-button-container-${job.jobId}">
            <button class="view-job js-jb-view-job" data-job-id="${job.jobId}">View</button>
            <button class="apply-job js-jb-apply-job-now js-jb-apply-now-${job.jobId}" data-job-id="${job.jobId}">Apply</button>
        </div>
        <div class="is-accepting js-accepting-application js-accepting-application-${job.jobId}">
            No longer Accepting Application.
        </div>
        <div class="save-job js-jb-save-job">
            <button class="save-job-button js-jb-save-job-button save-icon-${job.jobId}" data-job-id="${job.jobId}">
            </button>
        </div>

    </div>
          
      `
    }
  });
  document.querySelector('.js-jb-container').innerHTML=generateJobByCategoryHTML; 
  
  jobs.forEach((job)=>{
    if(!job.acceptingApplication){
        document.querySelector(`.js-jb-job-button-container-${job.jobId}`).setAttribute('class','remove-button-container');
        document.querySelector(`.js-accepting-application-${job.jobId}`).setAttribute('class','accepting-application');
    }
}) 
}

function checkCategoryExist(searchCategory){
  for(let job of jobs){
    if(searchCategory===job.jobCategory)
      generateJobByCategory(searchCategory);
      return 1;
  }
  return false
}

document.querySelector('.js-search-button').addEventListener('click',()=>{
  searchCategory=document.querySelector('.js-search-bar').value;
  if(searchCategory===''){
    alert('Please Enter Some Value')
  }

  if(!checkCategoryExist(searchCategory)){
    alert('Cannot find any Job in this Category.')
  }
  
})


