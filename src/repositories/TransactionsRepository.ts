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

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeFiltered = this.transactions.filter(transaction => {
      return transaction.type == 'income'
    });
    const incomeSum = incomeFiltered.reduce((sum, transaction) => {
      return sum += transaction.value;
    }, 0);

    const outcomeFiltered = this.transactions.filter(transaction => {
      return transaction.type == 'outcome'
    });
    const outcomeSum = outcomeFiltered.reduce((sum, transaction) => {
      return sum += transaction.value;
    }, 0);

    const total = incomeSum - outcomeSum;
    const balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total
    }
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type
    })
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
