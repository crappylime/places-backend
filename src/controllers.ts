import { NextFunction, Request, Response } from 'express';
import { removeAccents } from './helpers';
import { fetchPlace, fetchPlaces } from './services';

export async function health(req: Request, res: Response): Promise<void> {
  res.status(200).send('OK');
}

export async function listPlaces(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const places = await fetchPlaces();
    const search = req.query.search?.toString();
    if (search) {
      const normalizedSearch = removeAccents(search);
      const filteredPlaces = places.filter(
        (place) =>
          removeAccents(place.name).includes(normalizedSearch) ||
          removeAccents(place.address).includes(normalizedSearch),
      );
      res.json(filteredPlaces);
    } else {
      res.json(places);
    }
  } catch (error) {
    next(error);
  }
}

export async function getPlace(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = req.params.id;
    const placeDetails = await fetchPlace(id);
    res.json(placeDetails);
  } catch (error) {
    next(error);
  }
}
