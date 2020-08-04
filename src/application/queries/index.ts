import { FindUserHandler } from './FindUser/find-user.handler'
import { FindTripsHandler } from './FindTrips/find-trips.handler'
import { FindCountriesHandler } from './FindCountries/find-countries.handler'
import { FindCountryHandler } from './FindCountry/find-country.handler'

export const QueryHandlers = [FindUserHandler, FindTripsHandler, FindCountriesHandler, FindCountryHandler]
