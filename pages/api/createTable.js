import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    console.log("create table to be sent to mongo");
    console.log(req.body);
    const tableName = req.body.tableName
    console.log("The table name is:", tableName);
    console.log("the fields are: ");
    console.log(req.body.fields[tableName]);
    const fields = req.body.fields[tableName]
    const fieldsArray = fields.map(field => field.fieldName)
    console.log(fieldsArray);
    const validator = {
        validator: {
            $jsonSchema : {
                bsonType: "object",
                required: fieldsArray
            }
        }
    }



    
    try {
        const client = await clientPromise;
        const db = client.db("rubidex");
        console.log("-------------------");
        console.log("trying to create table: " + tableName);
        const result = await db.createCollection(tableName, validator)
        console.log({result});
        res.json(result)
        return result
    } catch (error) {
        console.log(error);
        res.json(error)
    }
    
    
           
}

