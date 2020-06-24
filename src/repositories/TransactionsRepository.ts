import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance = {
    income: 0,
    outcome: 0,
    total: 0,
  };

  constructor() {
    this.transactions = [];
  }

  public isValidBalance(type: 'income' | 'outcome', value: number): boolean {
    this.getBalance();

    if (
      (this.balance.total === 0 && type === 'outcome') ||
      (type === 'outcome' && this.balance.total - value < 0)
    ) {
      return true;
    }
    return false;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    if (type === 'income') {
      this.balance.income += value;
      this.balance.total += value;
    } else {
      this.balance.outcome += value;
      this.balance.total -= value;
    }

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
