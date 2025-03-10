import { Router } from 'express'
import { createPayment, handleWebhook } from '~/controller/payment.controller'
import { wrapAsync } from '~/utils/handler'

const router = Router()

router.post('/create-payment', wrapAsync(createPayment))
router.post('/payos-webhook', wrapAsync(handleWebhook))

export default router
