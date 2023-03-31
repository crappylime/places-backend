export interface Place {
  id: string;
  name: string;
  address: string;
  websites: Contact[];
  phoneNumbers: Contact[];
  openingHours: DayOpeningHours;
}

export interface Contact {
  label: string;
  link: string;
}

/** localentry API */
export interface LocalEntryPlace {
  local_entry_id: string;
  addresses: { contacts: LocalEntryContact[] }[];
  displayed_what: string;
  displayed_where: string;
  opening_hours: LocalEntryOpeningHours;
}

interface LocalEntryOpeningHours {
  days: DayOpeningHours;
  closed_on_holidays: boolean;
  open_by_arrangement: boolean;
}

interface LocalEntryContact {
  contact_type: 'phone' | 'url';
  service_code: string;
  formatted_service_code: string;
}

type DayNames =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

type DayOpeningHours = {
  [key in DayNames]?: { start: string; end: string; type: string }[];
};
