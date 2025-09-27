import express from 'express';
import { Delete_Cart_Item, List_Cart_Items, Save_Cart_Item, Update_Cart_Item } from '../controller/cartController.js';
import { auth } from '../middleware/auth.js';
import { GeminiMain } from '../controller/aiController.js';

const router = express.Router();

router.get('/list-items', auth, List_Cart_Items);
router.post('/save-item', Save_Cart_Item);
router.put('/update-item', auth, Update_Cart_Item);
router.delete('/delete-item', Delete_Cart_Item);

router.post('/ask-gemini', GeminiMain);

export default router;