import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'

export const BAYC_ADDRESS = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: 'https://v2.archive.subsquid.io/network/ethereum-mainnet',
    })
    .setBlockRange({ from: 12_287_507 })
    .addTrace({
        type: ['call'],
        callTo: [BAYC_ADDRESS],
        transaction: true,
    })
    .addStateDiff({
        address: [BAYC_ADDRESS],
        transaction: true,
    })
    .setFields({
        trace: {
            callTo: true,
            callFrom: true,
            callSighash: true,
        },
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
