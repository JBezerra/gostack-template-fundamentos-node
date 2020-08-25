import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance{
  income: number,
  outcome: number,
  total: number;
}

interface Response {
  balance: Balance,
  transactions: Transaction[]
}

class ListTransactionsAndBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Response {
    const transactions = this.transactionsRepository.all()
    const balance = this.transactionsRepository.getBalance()
    const response = {
      transactions,
      balance
    }
    return response;
  }
}

export default ListTransactionsAndBalanceService;
