const p = new Promise((resolve, reject) => {
    console.log('Waiting')
    setTimeout(() => {
        resolve(1)
        reject(new Error('Rejected'))
    },2000)
})

p.then(result => console.log(result))
 .catch(err => {console.log(err.message)})