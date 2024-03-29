const { verifyToken } = require('../middleware/auth');
const db = require('../config/db')

const express = require('express')

//get all author
const getAllAuthors = async (req,res) => {
    try{

        const data = await db.query(`SELECT * FROM author`)
        if(!data){
            res.send(404).send({
                message: 'no records found!'
            })
        }
        res.status(200).send({
            message: 'data fetched!',
            data: data[0]
        })
    }catch(error){
        console.log(error)
        res.send({
            message: "error in get all author api!"
        })
    }
}

//add author
const addAuthor = async (req,res)=>{
    try{
        const {author_name,biography,genre} = req.body

        if(!author_name || !biography || !genre){
            res.status(409).send({
                message:"all fields required"
            })
        }

        const data = await db.query(`INSERT INTO author (author_name,biography,genre) VALUES (?,?,?)`,[author_name,biography,genre])

        if (!data) {
            return res.status(404).send({
                message: 'Error in INSERT query!'
            })
        }

        res.status(201).send({
            message: 'Record created!'
        })

    }catch(error){
        console.log(error)
        res.send({
            message: 'error in add author api!'
        })
    }
}

module.exports = {getAllAuthors,addAuthor}

