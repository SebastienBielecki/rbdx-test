import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    console.log(req.method);
    const urlRubidexInsert = "/rubidex/insert"

            try {
                const client = await clientPromise;
                const db = client.db("rubidex");
                const result = await db.collection("products").insertOne(req.body)
                console.log("--- RESULT RECEIVED FROM MONGO ----");
                console.log({result});
                res.json(result)
                return result
            } catch (error) {
                console.log(error);
            }
            
};