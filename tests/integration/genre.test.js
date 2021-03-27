const server = require("../../index"); // Link to your server file
const supertest = require("supertest");
const request = supertest(server);
const {Genre} = require('../../models/genre')

describe('Genre', () => {
    afterEach(async () => { 
        server.close()
        await Genre.deleteMany({})
     })
    describe('GET', () => {
        it('should return all the genres available in the db', async () => {
            await Genre.collection.insertMany([
                {name : 'genre1'},
                {name : 'genre2'},
                {name : 'genre3'},
            ])

            const result = await request
                                .get("/api/genres")
                                .set({"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU4YTNjZGU0YTk3NzM0MGMyOTk4ODQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTY4NTQ2MDR9.fUas3Ugzqq1jf-9-BAzGjZ8gQvKYW8-BNEiC0smxZDU"})
            let resultParsed = JSON.parse(result.text)
            expect(result.status).toBe(200)
            expect(resultParsed.length).toBe(3)
        })       
    })

    describe('GET /:id', () => {
        it('should return the genre whose id is passed as query param', async () => {
            const genre = new Genre({name : 'genre1'})
            await genre.save()

            const result = await request
                                .get("/api/genres/" + genre._id)
                                .set({"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU4YTNjZGU0YTk3NzM0MGMyOTk4ODQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTY4NTQ2MDR9.fUas3Ugzqq1jf-9-BAzGjZ8gQvKYW8-BNEiC0smxZDU"})
            let resultParsed = JSON.parse(result.text)
            expect(result.status).toBe(200)
            expect(resultParsed).toHaveProperty('name', genre.name)
        })
        it('should return 404 for invalid id', async () => {
            const result = await request
                                .get("/api/genres/1")
                                .set({"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU4YTNjZGU0YTk3NzM0MGMyOTk4ODQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTY4NTQ2MDR9.fUas3Ugzqq1jf-9-BAzGjZ8gQvKYW8-BNEiC0smxZDU"})
            expect(result.status).toBe(404)
        })       
    })
    
    describe('POST', () => {
        it('should return 401 if no token is provided', async () => {
            const genre = new Genre({name : 'genre1'})

            const result = await request
                                .post("/api/genres")                                
                                .send(genre)
            expect(result.status).toBe(401)
        })
        it('should return newly added genre object', async () => {
            const genre = new Genre({name : 'genre1'})

            const result = await request
                                .post("/api/genres")                                
                                .set({"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU4YTNjZGU0YTk3NzM0MGMyOTk4ODQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTY4NTQ2MDR9.fUas3Ugzqq1jf-9-BAzGjZ8gQvKYW8-BNEiC0smxZDU"})         
                                .send({name: genre.name})
            let resultParsed = JSON.parse(result.text)
            expect(result.status).toBe(200)
            expect(resultParsed).toHaveProperty('name', genre.name)
        })  
        
        it('should return 400 for invalid genre', async () => {
            const genre = new Genre({name : 'genre1'})

            const result = await request
                                .post("/api/genres")                                
                                .set({"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU4YTNjZGU0YTk3NzM0MGMyOTk4ODQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTY4NTQ2MDR9.fUas3Ugzqq1jf-9-BAzGjZ8gQvKYW8-BNEiC0smxZDU"})         
                                .send({name: 'gen'})
            expect(result.status).toBe(400)
        })  
    })

    // describe('DELETE', () => {
    //     it('should delete the genre whose id is passed as query param', async () => {
    //         const genre = new Genre({name : 'genre1'})
    //         await genre.save()

    //         const result = await request
    //                             .delete("/api/genres/" + genre._id)
    //                             .set({"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU4YTNjZGU0YTk3NzM0MGMyOTk4ODQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTY4NTQ2MDR9.fUas3Ugzqq1jf-9-BAzGjZ8gQvKYW8-BNEiC0smxZDU"})
    //         let resultParsed = JSON.parse(result.text)
    //         expect(result.status).toBe(200)
    //         expect(resultParsed).toHaveProperty('name', genre.name)
    //     })  
    //     it('should return 404 for invalid id', async () => {
    //         const result = await request
    //                             .delete("/api/genres/1")
    //                             .set({"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU4YTNjZGU0YTk3NzM0MGMyOTk4ODQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTY4NTQ2MDR9.fUas3Ugzqq1jf-9-BAzGjZ8gQvKYW8-BNEiC0smxZDU"})
    //         expect(result.status).toBe(404)
    //     })        
    // })

})

