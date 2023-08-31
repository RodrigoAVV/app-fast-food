import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8081');

describe('Testing de productos', () => {
    it('POST de /api/products2/store debe crearr un producto correctamente', async () => {
        const productMock = {
            title:'Papas fritas',
            description:'Papas fritas con agregado',
            price:2690,
            thumbnail:[],
            code:'102',
            stock:190
        };

        const { statusCode, ok, _body } = await requester.post('/api/products2/store').send(productMock);
        console.log('status: '+statusCode)
        console.log('ok: '+ok)
        console.log('body: '+_body)

        expect(statusCode).to.be.eql(200)
        expect(_body.data).to.have.property('_id')
    })

    it('GET de /api/products2 se debe corroborrar que se obtengan los productos de manera correcta', async () => {
        const { statusCode, _body } = await requester.get('/api/products2');

        expect(statusCode).to.be.eql(200);
        //expect(_body).to.have.property('status');
        //expect(_body).to.have.property('payload');
        //expect(Array.isArray(_body.payload)).to.be.eql(true);
    });

    it('PUT de /api/products2/edit se debe corroborrar que se actualice correctamente la información de un producto', async () => {
        const productMock = {
            title: 'New product',
            description: 'New description',
            price:2600,
            thumbnail:[],
            code:'12345',
            stock:10
        }

        const { _body } = await requester.post('/api/products2/store').send(productMock);

        const id = _body.data._id;

        const productMockUpdated = {
            title: 'New product2',
            description: 'New description2',
            price:2700,
            thumbnail:[],
            code:'223344',
            stock:15
        };

        const putResult = await requester.put(`/api/products2/${id}`).send(productMockUpdated);

        expect(putResult.statusCode).to.be.eql(200);
        expect(putResult._body.message).to.be.eql('Producto actualizado');
    });
})