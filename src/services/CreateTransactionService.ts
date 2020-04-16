import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, value, title }: RequestDTO): Transaction {
    const isOutComeTransaction = type === 'outcome';

    if (isOutComeTransaction) {
      const balanceAfterTransaction = this.transactionsRepository.verifyBalance(
        { value },
      );

      if (balanceAfterTransaction < 0) {
        throw new Error("You don't have balance for this transaction, sorry.");
      }
    }

    const transaction = this.transactionsRepository.create({
      type,
      value,
      title,
    });

    return transaction;
  }
}

export default CreateTransactionService;
