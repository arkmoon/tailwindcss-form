function columnLabels(key) {
  return {
    'amount': 'Amount',
    'buy amount': 'Buy Amount',
    'cost basis': 'Cost Basis',
    'date acquired': 'Date Acquired',
    'date sold': 'Date Sold',
    'datetime': 'Date',
    'gain or loss': 'Gain or Loss',
    'income': 'Income',
    'long term': 'Long Term',
    'lot status': 'Lot Status',
    'market value': 'Market Value',
    'price': 'Price',
    'proceeds': 'Proceeds',
    'recipientId': 'Recipient ID',
    'remaining_qty': 'Remaining QTY',
    'sell amount': 'Sell Amount',
    'senderId': 'Sender ID',
    'short term': 'Short Term',
    'tax lot': 'Tax Lot',
    'timestamp': 'Timestamp',
    'token': 'Token',
    'tx type': 'TX Type',
    'type': 'Type',
    'year': 'Year',
  }[key];
}

export {
  columnLabels,
};
