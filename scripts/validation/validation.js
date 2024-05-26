import { isMobileNumberUnique } from "../data/applicantData.js";

export function validateInputs(firstNameInput,lastNameInput,mobileNumberInput,emailInput,skillsInput,appliedJob){
    let success=true;
    console.log('in validation')

    if(firstNameInput.value.trim()===''){
        success=false
        setError(firstNameInput,'First name is required');
    }
    else{
        setSuccess(firstNameInput);
    }

    if(lastNameInput.value.trim()===''){
        success=false
        setError(lastNameInput,'Last name is required');
    }
    else{
        setSuccess(lastNameInput);
    }

    if(mobileNumberInput.value.trim()===''){
        success=false
        setError(mobileNumberInput,'Mobile Number is required')
    }
    else if(!isMobileNumberUnique(mobileNumberInput.value,appliedJob)){
        success=false
        setError(mobileNumberInput,'You already Applied for this Job with your Mobile Numbeer')
    }
    else{
        setSuccess(mobileNumberInput);
    }

    if(emailInput.value.trim()===''){
        success=false
        setError(emailInput,'Email is Required')
    }
    else if(!validateEmail(emailInput.value.trim())){
        success=false
        setError(emailInput,'Please Enter a valid Email');
    }
    else{
        setSuccess(emailInput);
    }

    if(skillsInput.value.trim()===''){
        success=false
        setError(skillsInput,'Skill is Required')
    }
    else{
        setSuccess(skillsInput);
    }

    return success
}

function setError(element,message){
   let inputGroup=element.parentElement;
   let errorElement=inputGroup.querySelector('.error');
   errorElement.innerText=message;

   inputGroup.classList.add('error');
   inputGroup.classList.remove('success');
}

function setSuccess(element){
    let inputGroup=element.parentElement;
    let errorElement=inputGroup.querySelector('.error');

    errorElement.innerText='';
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
 

