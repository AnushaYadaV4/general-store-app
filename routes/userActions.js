const express = require('express');

const userActionsController = require('../controllers/userActions');

const router = express.Router();

router.post('/addStoreItems', userActionsController.postAddStoreItems);
router.get('/getStoreItems',userActionsController.getStoreItems);
//router.delete('/deleteUser/:id',userFormController.deleteUser);

module.exports = router;