import axios, { AxiosError } from 'axios';
import { Contact, LocalEntryPlace, Place } from './models';
import createError from 'http-errors';

const PLACE_IDS = ['GXvPAor1ifNfpF0U5PTG0w', 'ohGSnJtMIC5nPfYRi_HTAg'];
const API_URL = 'https://storage.googleapis.com/coding-session-rest-api/';

export async function fetchPlace(placeId: string): Promise<Place> {
  try {
    const response = await axios.get<LocalEntryPlace>(API_URL + placeId);
    return transformPlace(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw createError(
          axiosError.response.status,
          axiosError.response.statusText,
        );
      } else {
        throw new Error(`API request failed: ${axiosError.message}`);
      }
    } else {
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? error.message
          : 'Unknown error';
      throw new Error(
        `Error fetching place with id ${placeId} from API: ${errorMessage}`,
      );
    }
  }
}

export async function fetchPlaces(): Promise<Place[]> {
  const places: Place[] = [];
  for (const placeId of PLACE_IDS) {
    const place = await fetchPlace(placeId);
    places.push(place);
  }
  return places;
}

function transformPlace(localEntryPlace: LocalEntryPlace): Place {
  const websites: Contact[] = [];
  const phoneNumbers: Contact[] = [];

  localEntryPlace.addresses.forEach((address) => {
    address.contacts.forEach((contact) => {
      if (contact.contact_type === 'url') {
        websites.push({
          label: contact.formatted_service_code,
          link: contact.service_code,
        });
      } else if (contact.contact_type === 'phone') {
        phoneNumbers.push({
          label: contact.formatted_service_code,
          link: contact.service_code,
        });
      }
    });
  });

  return {
    id: localEntryPlace.local_entry_id,
    name: localEntryPlace.displayed_what,
    address: localEntryPlace.displayed_where,
    websites,
    phoneNumbers,
    openingHours: localEntryPlace.opening_hours.days,
  };
}
