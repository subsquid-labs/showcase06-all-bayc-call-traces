import {DataSourceBuilder} from '@subsquid/evm-stream'

export const BAYC_ADDRESS = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'

export const dataSource = new DataSourceBuilder()
    // The SQD Network Portal is the primary source of blockchain data: it is public,
    // needs no API key, and streams pre-filtered data — including real-time unfinalized
    // blocks — far faster than a plain RPC endpoint.
    .setPortal('https://portal.sqd.dev/datasets/ethereum-mainnet')
    // To use a private or rate-limit-lifted Portal, supply an API key
    // through the HTTP client headers (create a key at https://portal.sqd.dev/app):
    // .setPortal({
    //     url: 'https://portal.sqd.dev/datasets/ethereum-mainnet',
    //     http: {
    //         headers: {'x-api-key': process.env.SQD_API_KEY},
    //     },
    // })
    .setBlockRange({from: 12_287_507})
    // Field selection is explicit: there are no default optional fields, so list every
    // field the handler reads. Trace action fields use call*-prefixed selectors.
    .setFields({
        transaction: {
            hash: true,
            from: true,
            to: true,
        },
        trace: {
            callTo: true,
            callFrom: true,
            callSighash: true,
        },
        stateDiff: {
            prev: true,
            next: true,
        },
    })
    // Request call traces into BAYC and BAYC state diffs, each with the parent transaction.
    .addTrace({
        where: {
            type: ['call'],
            callTo: [BAYC_ADDRESS],
        },
        include: {
            transaction: true,
        },
    })
    .addStateDiff({
        where: {
            address: [BAYC_ADDRESS],
        },
        include: {
            transaction: true,
        },
    })
    .build()
