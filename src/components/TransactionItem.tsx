import React from 'react';
import { Transaction } from '../types/transaction';

export default function TransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <div className="flex justify-between p-2 border-b">
      <span>{transaction.category}</span>
      <span>{transaction.amount}</span>
      <span>{transaction.date}</span>
    </div>
  );
}
