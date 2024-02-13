const { Kafka } = require('kafkajs');

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

async function connexion() {
    try {
        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['localhost:9092'],
        });
        const consumer = kafka.consumer({ groupId: 'group' });
        await consumer.connect();
        console.log('Connecté au broker Kafka');
        await consumer.subscribe({ topic: '850_kiB' });
        console.log('Abonné au topic');

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    value: JSON.parse(message.value.toString()),
                    timestamp: formatTimestamp(message.timestamp)
                });
            },
        });

        return consumer;
    } catch (error) {
        console.error('Erreur de connexion au broker:', error);
    }
}

module.exports = { connexion };
