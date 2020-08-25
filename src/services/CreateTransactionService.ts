import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type == 'outcome'){
      const balance = this.transactionsRepository.getBalance();
      const total = balance['total'];

      if (total - value < 0){
        throw Error('Transaction not allowed');
      }

    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })
    return transaction;
  }
}

export default CreateTransactionService;
