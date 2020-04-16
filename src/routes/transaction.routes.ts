import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (req, res) => {
  try {
    const transactionsWithBalance = transactionsRepository.all();

    return res.json(transactionsWithBalance);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (req, res) => {
  try {
    const { title, type, value } = req.body;

    const transactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = transactionService.execute({ type, value, title });

    return res.json(transaction);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
