import axios from 'axios';
import { LocalEntryPlace, Place } from "../src/models";
import * as services from '../src/services';

describe('fetchPlace', () => {
  it('should return a transformed place', async () => {
    const mockDayHours = {
      start: '09:00',
      end: '17:00',
      type: 'open',
    };
    const mockPlace: LocalEntryPlace = {
      local_entry_id: '1',
      displayed_what: 'Café',
      displayed_where: '123 Main St',
      addresses: [
        {
          contacts: [
            {
              contact_type: 'url',
              formatted_service_code: 'Website',
              service_code: 'https://www.cafe.com',
            },
            {
              contact_type: 'phone',
              formatted_service_code: '123 456 789',
              service_code: '123456789',
            },
          ],
        },
      ],
      opening_hours: {
        days: {
          sunday: [mockDayHours],
        },
        closed_on_holidays: false,
        open_by_arrangement: false,
      }
    };
    jest.spyOn(axios, 'get').mockResolvedValueOnce({data: mockPlace});
    const place = await services.fetchPlace('1');

    expect(place).toEqual({
      id: '1',
      name: 'Café',
      address: '123 Main St',
      websites: [
        {
          label: 'Website',
          link: 'https://www.cafe.com',
        },
      ],
      phoneNumbers: [
        {
          label: '123 456 789',
          link: '123456789',
        },
      ],
      openingHours: {
        sunday: [mockDayHours]
      },
    } as Place);
  });
});