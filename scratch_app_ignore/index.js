// getUser(1)
//     .then(user => getRepos(user.username))
//     .then(repos => getCommits(repos))
//     .then(commits => console.log(commits))
//     .catch(err => console.log(err))

displayCommit()
async function displayCommit() {   
    try { 
        const user = await getUser(1)
        const repos = await getRepos(user)
        const commits = await getCommits(repos)
        console.log(commits)    
    } catch(err){
        console.log(err)
    }
}    

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { 
            resolve( {id : id, username: "Paritosh"})
        },2000)
    });
}


function getRepos(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['R1', 'R2', 'R3'])
        },2000)
    })
}


function getCommits(repos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['C1', 'C2'])
            // reject(new Error('msg'))
        },2000)
    })
}