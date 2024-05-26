export let jobs=JSON.parse(localStorage.getItem('jobs'));

if(!jobs){
  jobs = [
    {
      jobId: '1ABCWERQYX',
      jobTitle: "Software Engineer Intern",
      companyName: "ABC Software Solutions",
      location: "Chennai, Tamil Nadu",
      salary: "12k - 15k month",
      time: {
        year: "2024",
        month: "05",
        day: "01",
        hour: "10"
      },
      jobRequirements: "Basic Knowledge about JavaScript,Must Know about OS and DBMS",
      jobType: "Internship",
      jobMode: "Remote",
      jobCategory: "Software Development",
      applicantsQuantity: 0,
      acceptingApplication:false
    },
    {
      jobId: '2FORQWXYZB',
      jobTitle: "Java Developer",
      companyName: "Forgo Tech",
      location: "Bengaluru, Karnataka",
      salary: "4 - 7 LPA",
      time: {
        year: "2024",
        month: "04",
        day: "01",
        hour: "10"
      },
      jobRequirements: "Basic Knowledge about Java and MySQL,Must Know about OS and DBMS",
      jobType: "Full Time",
      jobMode: "Work from Office",
      jobCategory: "Software Development",
      applicantsQuantity: 0,
      acceptingApplication:true
    },
    {
      jobId: '3WELMOUGDH',
      jobTitle: "DevOps Engineer",
      companyName: "Wells Forgo Tech",
      location: "Gurugram, Delhi",
      salary: "3 - 6 LPA",
      time: {
        year: "2024",
        month: "05",
        day: "06",
        hour: "10"
      },
      jobRequirements: "Basic Knowledge about Linux Server,Must Know about OS and Cloud",
      jobMode: "Full Time",
      jobType: "On-site",
      jobCategory: "Cloud Engineer",
      applicantsQuantity: 0,
      acceptingApplication:true
    },
    {
      jobId: '4XYZABCFGH',
      jobTitle: "Data Scientist",
      companyName: "Data Insights Ltd",
      location: "Mumbai, Maharashtra",
      salary: "8 - 12 LPA",
      time: {
        year: "2024",
        month: "05",
        day: "21",
        hour: "10"
      },
      jobRequirements: "Proficiency in Python and Machine Learning algorithms,Experience with data visualization tools",
      jobType: "Full Time",
      jobMode: "Remote",
      jobCategory: "Data Science",
      applicantsQuantity: 0,
      acceptingApplication:true
    },
    {
      jobId: '5DEFWXZYUI',
      jobTitle: "Frontend Developer",
      companyName: "Tech Innovators",
      location: "Hyderabad, Telangana",
      salary: "6 - 10 LPA",
      time: {
        year: "2024",
        month: "05",
        day: "07",
        hour: "10"
      },
      jobRequirements: "Strong proficiency in HTML, CSS, and JavaScript,Experience with modern JavaScript frameworks like React or Angular",
      jobType: "Full Time",
      jobMode: "Work from Office",
      jobCategory: "Software Development",
      applicantsQuantity: 0,
      acceptingApplication:true
    },
    {
      jobId: '6LMNOPQRST',
      jobTitle: "UI/UX Designer",
      companyName: "Design Solutions Inc",
      location: "Pune, Maharashtra",
      salary: "5 - 8 LPA",
      time: {
        year: "2024",
        month: "05",
        day: "10",
        hour: "10"
      },
      jobRequirements: "Proficiency in design software like Adobe XD or Sketch,Experience with user research and usability testing",
      jobType: "Full Time",
      jobMode: "Remote",
      jobCategory: "Design",
      applicantsQuantity: 0,
      acceptingApplication:true
    },
    {
      jobId: '7JKLABCMNO',
      jobTitle: "Cybersecurity Analyst",
      companyName: "Security Experts LLC",
      location: "Delhi, Delhi",
      salary: "8 - 12 LPA",
      time: {
        year: "2024",
        month: "04",
        day: "15",
        hour: "10"
      },
      jobRequirements: "Experience in threat detection and incident response,Knowledge of network security protocols and systems",
      jobType: "Full Time",
      jobMode: "On-site",
      jobCategory: "Security",
      applicantsQuantity: 0,
      acceptingApplication:true
    },
    {
      jobId: '8PQRSXYZAB',
      jobTitle: "Marketing Manager",
      companyName: "Digital Marketing Agency",
      location: "Mumbai, Maharashtra",
      salary: "10 - 15 LPA",
      time: {
        year: "2024",
        month: "04",
        day: "21",
        hour: "10"
      },
      jobRequirements: "Experience in digital marketing strategies and campaign management,Strong analytical skills",
      jobType: "Full Time",
      jobMode: "Remote",
      jobCategory: "Marketing",
      applicantsQuantity: 0,
      acceptingApplication:true
    },
    {
      jobId: '9MNOPQWERT',
      jobTitle: "Business Analyst",
      companyName: "Business Solutions Ltd",
      location: "Bengaluru, Karnataka",
      salary: "7 - 10 LPA",
      time: {
        year: "2024",
        month: "05",
        day: "05",
        hour: "10"
      },
      jobRequirements: "Strong analytical and problem-solving skills,Experience in business process analysis and improvement",
      jobType: "Full Time",
      jobMode: "Work from Office",
      jobCategory: "Business",
      applicantsQuantity: 0,
      acceptingApplication:true
    },
    {
      jobId: '10ABCDEXYZ',
      jobTitle: "Product Manager",
      companyName: "Tech Innovations Inc",
      location: "Chennai, Tamil Nadu",
      salary: "12 - 18 LPA",
      time: {
        year: "2024",
        month: "05",
        day: "19",
        hour: "10"
      },
      jobRequirements: "Experience in product lifecycle management,Strong leadership and communication skills",
      jobType: "Full Time",
      jobMode: "Remote",
      jobCategory: "Management",
      applicantsQuantity: 0,
      acceptingApplication:true
    }
  ];
  
  console.log(jobs);
  
   
}
 
export function saveToStorage() {
    localStorage.setItem('jobs',JSON.stringify(jobs));
  }

export function deleteJob(jobId){
  let newJobs=[];
  console.log(jobId);

  jobs.forEach((job)=>{
    if(job.jobId != jobId){
      newJobs.push(job);
    }
  })
  jobs=newJobs;        
  saveToStorage();
  console.log(jobs);

}
