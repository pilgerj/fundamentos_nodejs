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

interface ResultSet {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];  

  constructor() {
    this.transactions = [];

  }

  public all(): ResultSet {
    const auxBalance = this.getBalance();

    const result = {
      transactions: this.transactions,
      balance: auxBalance
    }
    return result;
  }

  public getBalance(): Balance {

    const sumValues = (total: number, currentValue: number) => total + currentValue;

    const income  = this.transactions.filter(t => t.type === 'income').length === 0 ? 0 :
                    this.transactions.filter(t => t.type === 'income')
                                     .map(t => t.value)
                                     .reduce(sumValues);

    const outcome = this.transactions.filter(t => t.type === 'outcome').length === 0 ? 0 :
                    this.transactions.filter(t => t.type === 'outcome')
                                     .map(t => t.value)
                                     .reduce(sumValues);
    
    const total   = income - outcome;

    const balance = {
      income,
      outcome, 
      total
    }

    return balance;
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {
    
    const newTransaction = new Transaction({title, value, type});
    
    this.transactions.push(newTransaction);
    
    return newTransaction;
  }
}

export default TransactionsRepository;
