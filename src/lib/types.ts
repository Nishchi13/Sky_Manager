export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
}

export interface Booking {
  id: string;
  flight: Flight;
  passengerName: string;
  passengerEmail: string;
  seatPreference: 'window' | 'aisle' | 'middle';
  dietaryRestrictions: string;
  otherAccommodations: string;
  status: 'On Time' | 'Delayed' | 'Cancelled' | 'Boarding' | 'Gate Change';
}
