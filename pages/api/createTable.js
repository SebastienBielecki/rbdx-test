import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    console.log(req.method);

    
    try {
        const client = await clientPromise;
        const db = client.db("rubidex");
        const result = await db.createCollection("products 3")
        console.log({result});
        res.json(result)
        return result
    } catch (error) {
        console.log(error);
    }
           
}

