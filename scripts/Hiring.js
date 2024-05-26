import { getDateForJob } from "./date.js";
import { callingJob } from "./Applicants.js";
import { jobs,saveToStorage ,deleteJob} from "./data/jobs.js";

const overlay=document.querySelector(".overlay");
const popup=document.querySelector(".popup");

function generateJob(){
  let jobsHTML='';

  jobs.forEach((job)=>{
      
    if(job.applicantsQuantity===undefined){
      job.applicantsQuantity=0;
    }

  jobsHTML +=`
    <div class="job-container js-container-${job.jobId}">
      <div class="job-title js-job-title-popup">${job.jobTitle}</div>
      <div class="company-name js-company-name-popup">
      <i class="fa-solid fa-building"></i> ${job.companyName}</div>
      <div class="location js-location-popup">
      <i class="fa-solid fa-location-dot"></i>
      ${job.location}
      </div>
     <!-- <div class="time">${job.time}</div> -->
     <div class="applicants-quantity js-applicants-quantity-${job.jobId}">
            <a href="Applicants.html" class="applicants-quantity js-applicants-quantity">
            <button class="applicant-quantity-btn js-applicant-quantity" data-job-id="${job.jobId}">
            ${job.applicantsQuantity} applicant
            </button></a>
      </div>
     <div class=button-job-container>
      <button class="edit-button js-edit-button" data-job-id="${job.jobId}">Edit</button>
      <button class="delete-button js-delete-button" data-job-id="${job.jobId}">Delete</button>
      </div>
    </div>
  `
})

  document.querySelector(".js-container").innerHTML=jobsHTML;

}

generateJob();

document.querySelector(".add-job").addEventListener('click',()=>{
  
  const jobId=document.querySelector(".js-job-id").value;
  const jobTitle=document.querySelector(".js-job-title").value;
  const companyName=document.querySelector(".js-company-name").value;
  const location=document.querySelector(".js-location").value; 
  const salary=document.querySelector(".js-salary").value;
  const jobRequirements=document.querySelector(".js-requirements").value;
  const jobMode=document.querySelector('.js-job-mode').value;
  const jobType=document.querySelector('.js-job-type').value;

  let applicantsQuantity=0;
  let time=getDateForJob();
  let acceptingApplication=true;

  let isAlreadyExist=false;

  for(let job of jobs){
    if(job.jobId===jobId){
      isAlreadyExist=true;
    }
  }

  if(!isAlreadyExist){
    jobs.push(
      {
        jobId,
        jobTitle,
        companyName,
        location,
        salary,
        jobRequirements,
        jobMode,
        jobType,
        time,
        applicantsQuantity,
        acceptingApplication
      }
    );

    saveToStorage();
    generateJob();
    overlay.style.display="none"
    popup.style.display="none"
  }
  else{
    alert("Already a Job exist with that Job Id");
  }
    
});

document.querySelector(".add-new-job-btn").addEventListener("click",()=>{ 
    overlay.style.display="block";
    popup.style.display="block";

  document.querySelector(".js-job-title").value='';
  document.querySelector(".js-job-id").value='';
  document.querySelector(".js-company-name").value='';
  document.querySelector(".js-location").value='';
  document.querySelector(".js-salary").value='';
  document.querySelector(".js-requirements").value='';
  document.querySelector('.js-job-mode').value='';
  document.querySelector('.js-job-type').value='';
  document.querySelector(".save-job").style.display="none";
  document.querySelector(".add-job").style.display="inline-block";
});

document.querySelector(".cancel-job").addEventListener("click",()=>{
    event.preventDefault();
    popup.style.display="none";
    overlay.style.display="none"
});

function editJob(jobId){

  let matchingJob;
  
  overlay.style.display="block";
  popup.style.display="block";
  document.querySelector('.js-stop-application').style.display="inline";
  addDomStopApplication(jobId);

  jobs.forEach((job)=>{
    if(job.jobId===jobId){
      matchingJob=job;
    }
  })

  document.querySelector(".js-job-title").value=matchingJob.jobTitle;
  document.querySelector(".js-job-id").value=matchingJob.jobId;
  document.querySelector(".js-company-name").value=matchingJob.companyName;
  document.querySelector(".js-location").value=matchingJob.location;
  document.querySelector(".js-salary").value=matchingJob.salary;
  document.querySelector(".js-requirements").value=matchingJob.jobRequirements;
  document.querySelector('.js-job-mode').value=matchingJob.jobMode;
  document.querySelector('.js-job-type').value=matchingJob.jobType;
  document.querySelector(".add-job").style.display="none";
  document.querySelector(".save-job").style.display="inline-block"
  
}

document.querySelector(".save-job").addEventListener("click",()=>{
 
  const jobId=document.querySelector(".js-job-id").value;
  const jobTitle=document.querySelector(".js-job-title").value;
  const companyName=document.querySelector(".js-company-name").value;
  const location=document.querySelector(".js-location").value; 
  const salary=document.querySelector(".js-salary").value;
  const jobRequirements=document.querySelector(".js-requirements").value;
  const jobMode=document.querySelector('.js-job-mode').value;
  const jobType=document.querySelector('.js-job-type').value;

  jobs.forEach((job)=>{
    if(jobId===job.jobId){
      job.jobId=jobId;
      job.jobTitle=jobTitle;
      job.companyName=companyName;
      job.locaiton=location;
      job.salary=salary;
      job.jobRequirements=jobRequirements;
      job.jobMode=jobMode;
      job.jobType=jobType;
    }
     
  })

  generateJob();
  saveToStorage();
  overlay.style.display="none";
  popup.style.display="none";
})

document.querySelectorAll(".js-delete-button").forEach((deleteButton)=>{
      deleteButton.addEventListener("click",()=>{
        const {jobId}=deleteButton.dataset;
        deleteJob(jobId);
        const container=document.querySelector(`.js-container-${jobId}`);
        container.remove();
      })
})

document.querySelectorAll(".js-edit-button").forEach((editButton) => {
      editButton.addEventListener("click",()=>{
        const {jobId}=editButton.dataset;
        editJob(jobId);       
      })    
});

document.querySelectorAll('.js-applicant-quantity').forEach((applicantLink)=>{
  applicantLink.addEventListener("click",()=>{
    const {jobId}=applicantLink.dataset;
    callingJob(jobId);
  })
});


function addDomStopApplication(jobId){
  document.querySelector('.js-stop-application').addEventListener('click',()=>{
      event.preventDefault();
      let matchingJob;

      for(let job of jobs){
        if(job.jobId==jobId){
          matchingJob=job;
        }
      }

      matchingJob.acceptingApplication=false;
      saveToStorage();
      overlay.style.display="none";
      popup.style.display="none";
  })
}

//Search-bar Section

let searchCategory;

function generateJobByCategory(searchCategory){
  let generateJobByCategoryHTML='';

  jobs.forEach((job)=>{

    if(job.jobCategory===searchCategory){
        generateJobByCategoryHTML+=`
          <div class="job-container js-container-${job.jobId}">
          <div class="job-title js-job-title-popup">${job.jobTitle}</div>
          <div class="company-name js-company-name-popup">
          <i class="fa-solid fa-building"></i> ${job.companyName}</div>
          <div class="location js-location-popup">
          <i class="fa-solid fa-location-dot"></i>
          ${job.location}
          </div>
        <!-- <div class="time">${job.time}</div> -->
        <div class="applicants-quantity js-applicants-quantity-${job.jobId}">
          <a href="Applicants.html" class="applicants-quantity js-applicants-quantity">
            <button class="applicant-quantity-btn js-applicant-quantity" data-job-id="${job.jobId}">
                ${job.applicantsQuantity} applicant
            </button>
          </a>
        </div>
        <div class=button-job-container>
          <button class="edit-button js-edit-button" data-job-id="${job.jobId}">Edit</button>
          <button class="delete-button js-delete-button" data-job-id="${job.jobId}">Delete</button>
          </div>
        </div>
      `
    }
  });
  document.querySelector('.js-container').innerHTML=generateJobByCategoryHTML;  
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

 