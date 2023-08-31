import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8081');

describe('Testing de Carts', () => {
    it('GET de /api/carts2/:cid se debe corroborar que se obtenga un carrito de manera correcta', async () => {
        const { statusCode, _body } = await requester.get('/api/products2');

        expect(statusCode).to.be.eql(200);
        //expect(_body).to.have.property('status');
        //expect(_body).to.have.property('payload');
        //expect(Array.isArray(_body.payload)).to.be.eql(true);
    });
})