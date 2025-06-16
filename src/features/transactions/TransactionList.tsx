import React from 'react';
import { Transaction } from '../../types/transaction';
import TransactionItem from '../../components/TransactionItem';

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div>
      {transactions.map((t, i) => (
        <TransactionItem key={i} transaction={t} />
      ))}
    </div>
  );
}
