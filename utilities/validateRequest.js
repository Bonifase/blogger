const validateData = (data) => {
    Object.values(data).map(value => {
        if(!value){
            return null  
        }
    })
    return data  
}
module.exports = validateData;