import fastify from 'fastify';
import fastifyView from '@fastify/view';
import handlebars from 'handlebars';
import { getData } from "./api.js";


const app = fastify();
app.register(fastifyView, {
    engine: {
        handlebars,
    },
    templates: "./templates",
    options: {
        partials: {
            header: 'header.hbs',
            footer: 'footer.hbs'
        }
    },
});

app.get('/characters', async (req, res) => {
    try {
        const characters = await getData('https://gateway.marvel.com');
        await res.view('index.hbs', { characters });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
