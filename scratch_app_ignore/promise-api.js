// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('P1')
//         resolve(1)
//         // reject(new Error('Failed'))
//     },2000)
// })

// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('P2')
//         resolve(2)
//     },2000)
// })

// Promise.race([p1,p2])
//     .then(result => console.log(result))
//     .catch(err => console.log(err))

// getCustomer(1)
//     .then((customer) => getMovies(customer))
//     .then((movies) => sendEmail(movies))
//     .then((msg) => console.log(msg))
//     .catch(err => console.log(err))

sendUserMovies()
async function sendUserMovies() {
    const customer = await getCustomer(1)
    if (customer.isGold){
        const movies = await getMovies(customer)
        const msg = await sendEmail(movies)
        console.log(msg)
    }
}    
function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: id,
                name:"Paritosh",
                isGold: true
            },4000)
        })
    })
}

function getMovies(customer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2'])
        }, 2000)
    })
}

function sendEmail(movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Email Sent')
        }, 2000)
    })
}