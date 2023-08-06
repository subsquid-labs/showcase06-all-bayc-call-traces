import {TypeormDatabase} from '@subsquid/typeorm-store'
import {
    TransactionTouchingBayc,
    IndirectCallToBayc,
    StateDiff,
} from './model'
import {processor, BAYC_ADDRESS} from './processor'

processor.run(new TypeormDatabase({supportHotBlocks: false}), async (ctx) => {
    const transactions: Map<string, TransactionTouchingBayc> = new Map()
    const calls: IndirectCallToBayc[] = []
    const stateDiffs: StateDiff[] = []

    for (let block of ctx.blocks) {
        for (let trc of block.traces) {
            if (trc.type === 'call' && trc.action.to === BAYC_ADDRESS && trc.transaction?.to !== BAYC_ADDRESS) {
                if (!trc.transaction) {
                    ctx.log.fatal(`ERROR: trace came without a parent transaction`)
                    console.log(trc)
                    process.exit(1)
                }
                let txnHash = trc.transaction.hash
                if (!transactions.has(txnHash)) {
                    transactions.set(txnHash, new TransactionTouchingBayc({
                        id: trc.transaction.id,
                        block: block.header.height,
                        txnHash,
                        from: trc.transaction.from,
                        to: trc.transaction.to
                    }))
                }
                calls.push(new IndirectCallToBayc({
                    id: `${trc.transaction.id}-${trc.traceAddress.join('-')}`,
                    txn: transactions.get(txnHash),
                    directCaller: trc.action.from,
                    sighash: trc.action.sighash
                }))
            }
        }
        for (let [idx, stdiff] of block.stateDiffs.entries()) {
            if (!stdiff.transaction) {
                ctx.log.fatal(`ERROR: state diff came without a parent transaction`)
                console.log(stdiff)
                process.exit(2)
            }
            if (stdiff.address === BAYC_ADDRESS && transactions.has(stdiff.transaction.hash)) {
                stateDiffs.push(new StateDiff({
                    id: `${stdiff.transaction.id}-${idx}`,
                    txn: transactions.get(stdiff.transaction.hash),
                    key: stdiff.key,
                    kind: stdiff.kind,
                    prev: stdiff.prev,
                    next: stdiff.next
                }))
            }
        }
    }

    await ctx.store.upsert([...transactions.values()])
    await ctx.store.upsert(calls)
    await ctx.store.upsert(stateDiffs)
})
