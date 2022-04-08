import { Router } from 'express';

const router = Router();

router.get('/transcribe', (req, res) => {
    res.send(`It's Working!`);
});

router.post('/', (req, res) => {
  const message = {
    text: req.body.audio
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

export default router;