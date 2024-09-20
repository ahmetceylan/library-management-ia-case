import request from 'supertest';
import application from '../app';

describe('middlewares/notFound', () => {
  afterEach(async () => {
    await application.close();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  const getRequests = () =>
    request(application).post('/api/invalid').send({
      name: 'sample'
    });

  it('url not found test', async () => {
    const res = await getRequests();
    expect(res.status).toBe(404);
  });
});
