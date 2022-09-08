const { Router } = require('express');
const router = Router(); 
const Menus = require('./menu') 

// Get all menuss
router.get('/', async(req, res) => {
    try {
        const arrayMenus = await Menus.find()
        res.send(arrayMenus);
        console.log(arrayMenus);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Create a new menus
router.post('/', async(req, res) => {
    try {
        let menus = new Menus(req.body)
        menus = await menus.save()
        res.send(menus),
        console.log(menus);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get menus By ID
router.get('/:id', async(req, res) => {
    try {
        const menus = await Menus.findById(req.params.id)
        res.send(menus)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update menus By ID
router.put('/:id', async(req, res) => {
    try {
        const menus = await Menus.findByIdAndUpdate(req.params.id, {
            key:value
        },{new: true})
        res.send(menus)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete menus By ID
router.delete('/:id', async(req, res) => {
    try {
        const menus = await Menus.findByIdAndDelete(req.params.id)
        res.send(menus)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router