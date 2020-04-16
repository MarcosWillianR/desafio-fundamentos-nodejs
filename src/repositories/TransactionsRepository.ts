import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface VerifyBalanceDTO {
  value: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ResponseAllDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ResponseAllDTO {
    const { transactions } = this;
    const balance = this.getBalance();

    return { transactions, balance };
  }

  public getBalance(): Balance {
    const reducer = (acc: Balance, transaction: Transaction): Balance => {
      acc[transaction.type] += transaction.value;

      return acc;
    };

    const balance = this.transactions.reduce(reducer, {
      income: 0,
      outcome: 0,
      total: 0,
    });

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public verifyBalance({ value }: VerifyBalanceDTO): number {
    const actualBalance = this.getBalance();

    const actualValueCalc = actualBalance.total - value;

    return actualValueCalc;
  }

  public create({ type, value, title }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ type, value, title });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
