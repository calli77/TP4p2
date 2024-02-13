const { Kafka } = require('kafkajs');

async function connexion() {
    try {
        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['localhost:8080'],
        });
        const consumer = kafka.consumer({ groupId: 'group' });
        await consumer.connect();
        console.log('connecté au broker RedPanda');
        await consumer.subscribe({ topic: 'mon-super-topic' });
        console.log('abonné au topic');
        return consumer;
    } catch (error) {
        console.error('erreur de connexion au broker:', error);
    }
}

module.exports = connexion;