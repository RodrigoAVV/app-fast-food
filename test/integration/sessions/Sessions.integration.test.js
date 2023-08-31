import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8081');

describe('Testing session', () => {
    let cookie;

    //Usar before para obtner el jwt jwt y usarlo en todas las peticiones del recurso
    // before()

    it('Debemos registrar un usuario correctamente', async() => {
        const userMock = {
            name:'qqqq',
            firstname:'qqqq',
            lastname:'qqqq',
            run:'123',
            email:'algoalgo@gmail.com',
            password:'$2b$10$0y6dR4wMSn7fhJAL1/KlUO4xNLmSPResrf3nXuTx7dlJ17RNikAia',
            role:'user',
            age:12,
            cart:'64ee493264e7622c2aecb551'
        };

        const { statusCode, _body } = await requester.post('/api/users/store').send(userMock);
        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
    });
/*
    it('Debemos loguear al usuario y retornar una cookie', async () => {
        const credentialsMock = {
            email: 'ch@gmail.com',
            password: '1234'
        };

        const loginResult = await requester.post('/api/sessions/login').send(credentialsMock);
        const cookieResult = loginResult.headers['set-cookie'][0];

        expect(cookieResult).to.be.ok;

        const cookieResultSplit = cookieResult.split('=');

        cookie = {
            name: cookieResultSplit[0],
            value: cookieResultSplit[1]
        };

        expect(cookie.name).to.be.ok.and.eql('coderCookie');
        expect(cookie.value).to.be.ok;
    });

    it('Debemos enviar una cookie en el servicio current y entregar la información al usuario', async() => {
        const { _body } = await requester.get('/api/sessions/current')
            .set('Cookie', [`${cookie.name}=${cookie.value}`]);
            //.set('Authorization', 'Bearer XXXXXXXXXX')

        expect(_body.payload.email).to.be.eql('ch@gmail.com');
    });
    */
})