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
            token = new User().generateAuthToken()
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
            expect(result.body).toHaveProperty('_id')
        })
        it('should find the newly added genre in the DB', async () => {
            const result = await exec()
            const genre = await Genre.find({ name })
            expect(genre).not.toBeNull()
        })  
        
    })

    describe('PUT', () => {
        let id;
        let token
        let name
        const exec = async () => {
            return await request
                            .put("/api/genres/" + id)                                
                            .set({"x-auth-token":token})         
                            .send({name})
        }

        beforeEach(async () => {
            const genre = new Genre({name : 'genre1'})
            const res = await genre.save()
            id = res._id
            name = 'genre1';
            token = new User().generateAuthToken()
        })
        it('should return 401 if no token is provided', async () => {
            token = ''
            const result = await exec()
            expect(result.status).toBe(401)
        })
        it('should return 400 for invalid id', async () => {
            id = '1'            
            const result = await exec()
            expect(result.status).toBe(400)
        }) 
        it('should return 400 for invalid genre name', async () => {
            name = 'gen'
            const result = await exec()
            expect(result.status).toBe(400)
        }) 
        it('should return 404 if genre id not in DB', async () => {
            id = mongoose.Types.ObjectId()
            const result = await exec()
            expect(result.status).toBe(404)
        })
        it('should return 200 if everything goes well', async () => {            
            const result = await exec()
            expect(result.status).toBe(200)
        })  
    })
    describe('DELETE', () => {
        let id;
        let token

        // Happy path
        const exec = async () => {
            return await request
                            .delete("/api/genres/" + id)                                
                            .set({"x-auth-token":token})         
        }

        beforeEach(async () => {
            const genre = new Genre({name : 'genre1'})
            const res = await genre.save()
            id = res._id
            token = new User({_id: mongoose.Types.ObjectId(), isAdmin:true}).generateAuthToken()
        })
        it('should return 401 if no token is provided', async () => {
            token = ''
            const result = await exec()
            expect(result.status).toBe(401)
        })
        it('should return 403 if user is not an admin', async () => {
            token = new User().generateAuthToken()
            const result = await exec()
            expect(result.status).toBe(403)
        })
        it('should return 400 for invalid id', async () => {
            id = '1'            
            const result = await exec()
            expect(result.status).toBe(400)
        }) 
        it('should return 404 if genre id not in DB', async () => {
            id = mongoose.Types.ObjectId()
            const result = await exec()
            expect(result.status).toBe(404)
        })
        it('should return 200 if everything goes well.', async () => {
            const result = await exec()
            expect(result.status).toBe(200)
        })           
    })

})

