
const imageHandler = (req, res, db)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries);
        // console.log(entries)
    })
    .catch(err => res.status(400).json(err))
}

    module.exports ={
        imageHandler: imageHandler
    }