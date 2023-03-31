import request from 'supertest';
import { NextFunction, Request, Response } from 'express';
import { startServer, stopServer } from '../src/app';
import * as services from '../src/services';
import { listPlaces } from '../src/controllers';


describe('GET /api/', () => {
  const url = `http://localhost:${process.env.PORT}`;

  beforeAll(() => {
    startServer();
  });

  afterAll(() => {
    stopServer();
  });

  it('should return 200 OK', async () => {
    const response = await request(url).get('/api/');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('OK');
  });

  it('should return 404 Not Found', async () => {
    const response = await request(url).get('/api/unknown');
    expect(response.status).toBe(404);
  });

  describe('GET /places', () => {
    const mockPlaces = [
      {
        id: '1',
        name: 'Café',
        address: '123 Main St',
        websites: [],
        phoneNumbers: [],
        openingHours: {},
      },
      {
        id: '2',
        name: 'Casa',
        address: '456 High St',
        websites: [],
        phoneNumbers: [],
        openingHours: {},
      },
    ];
  
    it('should return list of places', async () => {
      const fetchPlacesMock = jest.fn().mockResolvedValueOnce(mockPlaces);
      jest.spyOn(services, "fetchPlaces").mockImplementation(fetchPlacesMock);
  
      const res = await request(url).get('/api/places').send();
  
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(mockPlaces);
      expect(fetchPlacesMock).toHaveBeenCalledTimes(1);
    });

    it('should find a place by name', async () => {
      const fetchPlacesMock = jest.fn().mockResolvedValueOnce(mockPlaces);
      jest.spyOn(services, "fetchPlaces").mockImplementation(fetchPlacesMock);
      
      const req = { query: { search: 'cafe' } } as any as Request;
      const res = { json: jest.fn() } as any as Response;
      const next = jest.fn() as any as NextFunction;

      await listPlaces(req, res, next);

      expect(res.json).toHaveBeenCalledWith([mockPlaces[0]]);
    });

    it('should get a place by id', async () => {
      const fetchPlaceMock = jest.fn().mockResolvedValueOnce(mockPlaces[1]);
      jest.spyOn(services, "fetchPlace").mockImplementation(fetchPlaceMock);
  
      const res = await request(url).get('/api/places/2').send();
  
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(mockPlaces[1]);
      expect(fetchPlaceMock).toHaveBeenCalledTimes(1);
    });
  });

});
