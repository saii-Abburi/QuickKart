const notFound = (req,res)=>{
    return res.status(404).send({msg:"Url is Not Found"});
}
module.exports = notFound