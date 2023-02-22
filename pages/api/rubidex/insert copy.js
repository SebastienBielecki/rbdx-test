export default async (req, res) => {
    console.log("body or request received by Rubidex");
    console.log(req.body);
    const received = req.body
    res.json({
        acknowledged: true,
        receivedObject: received
    })
}