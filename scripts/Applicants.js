import { applicantData } from "./data/applicantData.js";
import { callingViewedApplicant } from "./data/viewedapplicant.js";

const overlay=document.querySelector('.overlay');
const popup=document.querySelector('.popup');

let applicantList=[];
let jobIdApplicant =JSON.parse(localStorage.getItem('jobId'));

function generateApplicants(){
    let applicantHTML='';

    applicantData.forEach((applicant)=>{
        if(applicant.jobId===jobIdApplicant){
            applicantList.push(applicant);
           // console.log(applicantList);
          //  console.log(applicantData);
        }
    })

    applicantList.forEach((applicantDetails)=>{
        applicantHTML +=`
        <div class="applicant-container js-applicant-container">
            <div class="applicant-name">
                ${applicantDetails.firstName} ${applicantDetails.lastName}
            </div>
            <div class="applicant-skills">
                ${applicantDetails.mobileNumber} 
            </div>
            <div class="contact-info">
                <a href="mailto:${applicantDetails.email}" class="mail-link">${applicantDetails.email}</a>
            </div>
            <div class="view-application-container">
                <button class="view-application js-view-application" data-applicant-id=${applicantDetails.mobileNumber}>
                    View Application
                </button>
            </div>
        </div>
        `
    });
    document.querySelector(".container").innerHTML=applicantHTML;
}

generateApplicants();

function saveJobId(jobIdApplicant){
    localStorage.setItem('jobId',JSON.stringify(jobIdApplicant));
}

export function callingJob(jobId){
    let jobIdApplicant=jobId;
    saveJobId(jobIdApplicant);  
};

function getApplicant(applicantId){
    let matchedApplicant;

   // console.log(applicantList)

    applicantList.forEach((applicant)=>{
        if(applicant.mobileNumber===applicantId){
        //    console.log(applicant.mobileNumber+" "+applicantId);     
            matchedApplicant=applicant;
            console.log(matchedApplicant);
        }
    });

    return matchedApplicant;
}

function viewApplicationForm(applicantId){
    let matchingApplicant=getApplicant(applicantId);
    overlay.style.display="block";
    popup.style.display="block";

    popup.innerHTML=`
        <div>
            <div class="popup-applicant-name">${matchingApplicant.firstName} ${matchingApplicant.lastName}</div>
            <div class="popup-applicant-mobile-number">
                <i class="fa-solid fa-phone"></i>
                ${matchingApplicant.mobileNumber}</div>
            <div class="popup-applicant-email">
                <i class="fa-solid fa-envelope"></i>
                ${matchingApplicant.email}</div>
            <div class="popup-applicant-skills">${matchingApplicant.skills}</div>
            <div class="popup-applicant-short-disc">${matchingApplicant.shortDisc}</div>
        </div>
        <div class="cancel-application">
            <button class="cancel-application-btn">&#x2715</button>
        </div>
    `
}

function addDomCancelApplication(){
    document.querySelector('.cancel-application-btn').addEventListener("click",()=>{
        overlay.style.display="none";
        popup.style.display="none";
    })
}

document.querySelectorAll('.js-view-application').forEach((viewApplication)=>{
    viewApplication.addEventListener("click",()=>{
        const {applicantId}=viewApplication.dataset;
        console.log(applicantId);
        viewApplicationForm(applicantId);
        addDomCancelApplication();
      
        let matchedApplicant=getApplicant(applicantId);
        callingViewedApplicant(matchedApplicant);

        
    })
});


