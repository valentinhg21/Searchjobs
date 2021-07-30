document.querySelector(".button-container")
.addEventListener("click", () => {
    
    /* Capture the value for input */
    let text = document.getElementById("filter-jobs").value
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, text);
        showJobs(filteredJobs)
    })

})

/* Function get to jobs */
function getJobs(){
    /* Use fetch to call the API data.json */
    return fetch("data/data.json")
    /* Then I get to response.json*/
    .then(response => response.json())
    /* Then return data */
    .then(data => {
        
        return data
    })
} 

/* Filter jobs */
function filterJobs(jobs, searchText){
    if(searchText){
        let filteredJobs = jobs.filter( job => {
            if(job.roleName.toLowerCase().includes(searchText)
                || job.type.toLowerCase().includes(searchText)
                || job.company.toLowerCase().includes(searchText)
                || job.requirements.content.toLowerCase().includes(searchText)){
                    return true;
                } else {
                    return false;
                }
            
        })
        return filteredJobs;
    } else {
        return jobs;
    }
}

/* Function showJobs */
function showJobs(jobs){
    
    let jobsContainer = document.querySelector(".jobs-container");
    
    let jobsHTML = "";
    /* Iterate each job with forEach */
    jobs.forEach(job =>{
        /* Show with HTML */
        jobsHTML += `
            <div class="job-title">
                <div class="top">
                    <img src="${job.logo}" alt="icon-job">
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>
                        ${job.requirements.content}
                    </span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">
                        Apply Now
                    </div>
                    <div class="button">
                        Message
                    </div>
                </div>
            </div>
        `
        /* Put in jobs */
        jobsContainer.innerHTML = jobsHTML;
        
    })
}


getJobs().then(data => {
    showJobs(data);
})