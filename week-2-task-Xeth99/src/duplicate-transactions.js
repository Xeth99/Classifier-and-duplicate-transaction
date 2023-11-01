function findDuplicateTransactions(transactions) {
    const duplicateGroups = new Map();
  
    transactions.forEach((transact1, i) => {
        transactions.slice(i + 1).forEach((transact2) => {
            if (
                transact1.sourceAccount === transact2.sourceAccount &&
                transact1.targetAccount === transact2.targetAccount &&
                transact1.amount === transact2.amount &&
                transact1.category === transact2.category &&
                Math.abs(new Date(transact1.time) - new Date(transact2.time)) <= 60000
            ) {
                const groupKey = `${transact1.sourceAccount}-${transact1.targetAccount}-${transact1.amount}-${transact1.category}`;
                if (!duplicateGroups.has(groupKey)) {
                    duplicateGroups.set(groupKey, [transact1]);
                }
                duplicateGroups.get(groupKey).push(transact2);
            }
        });
    });
  
    // Convert Map values (groups) to an array, sort, and return
    const sortedDuplicateGroups = Array.from(duplicateGroups.values()).sort(
        (group1, group2) => new Date(group1[0].time) - new Date(group2[0].time)
    );
  
    return sortedDuplicateGroups;
  }

  export default findDuplicateTransactions;