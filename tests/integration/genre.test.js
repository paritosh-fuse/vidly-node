const server = require("../../index"); // Link to your server file
const supertest = require("supertest");
const request = supertest(server);
const {Genre} = require('../../models/genre')
const {User} = require('../../models/user')
const mongoose = require('mongoose');

let token = new User().generateAuthToken()

describe('Genre', () => {
    afterEach(async () => { 
        server.close()
        await Genre.deleteMany({})
     })
    describe('GET', () => {
        it('should return all the genres available in the db', async () => {
            await Genre.collection.insertMany([ {name : 'genre1'}, {name : 'genre2'}, {name : 'genre3'}, ])

            const result = await request
                                .get("/api/genres")
                                .set({"x-auth-token":token})
            let resultParsed = JSON.parse(result.text)
            expect(result.status).toBe(200)
        })       
    })

    describe('GET /:id', () => {
        it('should return the genre whose id is passed as query param', async () => {
            const genre = new Genre({name : 'genre1'})
            await genre.save()

            const result = await request
                                .get("/api/genres/" + genre._id)
                                .set({"x-auth-token":token})
            let resultParsed = JSON.parse(result.text)
            expect(result.status).toBe(200)
            expect(resultParsed).toHaveProperty('name', genre.name)
        })
        it('should return 400 for invalid id', async () => {
            const result = await request
                                .get("/api/genres/1")
                                .set({"x-auth-token":token})
            expect(result.status).toBe(400)
        }) 
        it('should return 404 if genre with given id does not exist', async () => {
            const id = mongoose.Types.ObjectId()
            const result = await request
                                .get("/api/genres/" + id)
                                .set({"x-auth-token":token})
            expect(result.status).toBe(404)
        })       
    })
    
    describe('POST', () => {
        let name;
        let token
        const exec = async () => {
            return await request
                            .post("/api/genres")                                
                            .set({"x-auth-token":token})         
                            .send({name})
        }
        beforeEach(() => {
            name = 'genre1';
            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU4YTNjZGU0YTk3NzM0MGMyOTk4ODQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTcwMTA3NzV9.TX5tXNT6yTyZDgljMbsa5fe_z2PT3U_iouCar32Fd3M";
        })
        it('should return 401 if no token is provided', async () => {
            token = ''
            const result = await exec()
            expect(result.status).toBe(401)
        })
        
        it('should return 400 for invalid genre', async () => {
            name = 'gen'            
            const result = await exec()
            expect(result.status).toBe(400)
        })  

        it('should return newly added genre object', async () => {
            const result = await exec()
            let resultParsed = JSON.parse(result.text)
            expect(resultParsed).toHaveProperty('_id')
        })
        it('should find the newly added genre in the DB', async () => {
            const result = await exec()
            const genre = await Genre.find({ name })
            expect(genre).not.toBeNull()
        })  
    })

    // describe('DELETE', () => {
    //     it('should delete the genre whose id is passed as query param', async () => {
    //         const genre = new Genre({name : 'genre1'})
    //         await genre.save()

    //         const result = await request
    //                             .delete("/api/genres/" + genre._id)
    //                             .set({"x-auth-token":token})
    //         let resultParsed = JSON.parse(result.text)
    //         expect(result.status).toBe(200)
    //         expect(resultParsed).toHaveProperty('name', genre.name)
    //     })  
    //     it('should return 404 for invalid id', async () => {
    //         const result = await request
    //                             .delete("/api/genres/1")
    //                             .set({"x-auth-token":token})
    //         expect(result.status).toBe(404)
    //     })        
    // })

})

