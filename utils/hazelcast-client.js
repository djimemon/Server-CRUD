#! /usr/bin/env node

const { Client } = require('hazelcast-client');



function createClientConfig() {
    return {
        network: {
            hazelcastCloud: {
                discoveryToken: 'XzWgm1WU50BwF0nu5WALe2ZKqkIeVQm1EeQC7DFV2w202HWWft'
            }
        },
        clusterName: 'pr-3544',
        properties: {
            'hazelcast.client.statistics.enabled': true,
            'hazelcast.client.statistics.period.seconds': 1,
        }
    }
}

(async () => {
    const client = await Client.newHazelcastClient(createClientConfig());
    const map = await client.getMap('distributed-map');

})().catch(err => {
    console.error('Error occurred:', err);
    process.exit(1);
});