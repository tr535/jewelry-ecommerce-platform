const Bascet = require("../models/Bascet")

const addToBascet = ("/", async (req, res) => {
    const username = req.user._id
    const { quentity, productid } = req.body
    console.log(req.body);
    const oneprudact = await Bascet.findOne({ username: username, prudact: productid }).exec()
    if (oneprudact) {
        oneprudact.quentity += 1
        const a = await oneprudact.save()
        return res.status(200).json(a)
    }
    await Bascet.create({ username: username, quentity: quentity, prudact: productid })
    res.json({ Message: "addad to bascet" })
})

const deletefrombascet = (async (req, res) => {
    const { id } = req.params
    const findId = await Bascet.findById(id).exec()
    if (!findId)
        return res.status(400).json({ Message: "product is not fount" })
    const a = await findId.deleteOne()
    if (!a)
        return res.status(400).json({ Message: "product is not deleted" })
    res.json({ Message: "product is deleted" })
})

const updateQuentity = async (req, res) => {
    const username = req.user._id
    const { prudact, quentity} = req.body
    const quentityP = await Bascet.findOne({ username: username, prudact: prudact })
    if (!quentityP)
        return res.status(400).json({ Message: "product is not found" })
    quentityP.quentity+= quentity
    if( Number(quentityP.quentity) === 0){
        await quentityP.deleteOne()
        return res.json({ Message: "prodtact is deleted from bascet"})

    }

    await quentityP.save()
    res.json({ Message: "quentity is updated" })
}
const getallBascet = async (req, res) => {
    console.log(req.user._id);
    const username = req.user._id
    const findall = await Bascet.find({ username: username }).populate("prudact").lean()
    if (!findall)
        return res.status(400).json({ Message: "err not find product" })
    res.json(findall)
}


module.exports = { addToBascet, deletefrombascet, updateQuentity, getallBascet }