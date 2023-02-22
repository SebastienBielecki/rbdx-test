import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    const tableName = req.body.tableName
    const fields = req.body.fields[tableName]
    let validator = null
    if (fields) {
        const fieldsArray = fields.map(field => field.fieldName)
        validator = {
            validator: {
                $jsonSchema : {
                    bsonType: "object",
                    required: fieldsArray
                }
            }
        }
    } 
    
    try {
        const client = await clientPromise;
        const db = client.db("rubidex");
        const result = await db.createCollection(tableName, validator)
        res.json(result)
        return result
    } catch (error) {
        console.log(error);
        res.json(error)
        return(error)
    }
    
    
           
}

