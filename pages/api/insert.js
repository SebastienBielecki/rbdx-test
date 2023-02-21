import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    console.log(req.method);

    switch (req.method) {
        case "POST":
            try {
                const client = await clientPromise;
                const db = client.db("rubidex");
                const result = await db.collection("products").insertOne(req.body)
                 console.log({result});
                res.json(result)
                return result
            } catch (error) {
                console.log(error);
            }
            break;
    
        default:
            console.log("METHOD is not handled");
            break;
    }

    


};