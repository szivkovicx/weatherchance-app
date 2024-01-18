# Imports
from datetime import datetime, timedelta
import requests

class ForecastService:
    __api_key: str = None # WeatherAPI API key
    __sample: object = {} # Sample data from WeatherAPI

    def __init__(self, api_key: str):
        self.__api_key = api_key

    # We want single instance of this service in memory so we can do a fetch check in ForecastService.__fetch_sample
    def __new__(cls, api_key: str):
        if not hasattr(cls, 'instance'):
            cls.instance = super(ForecastService, cls).__new__(cls)
        return cls.instance

    def __fetch_sample(self, query: str) -> object:
        # Fetch sample if it doesn't exist locally or if last sample fetch is older than a day
        if not query in self.__sample or (self.__sample[query]['created'] and (datetime.now() - self.__sample[query]['created']) > timedelta(1)):
            # Fetch sample with sample size of 7 days ( Limit of WeatherAPI Historic API )
            req = requests.get(f"http://api.weatherapi.com/v1/history.json?key={self.__api_key}&q={query}&dt={(datetime.now() - timedelta(7)).strftime('%Y-%m-%d')}&end_dt={datetime.now().strftime('%Y-%m-%d')}")
            if req.status_code != 200:
                # Failed to fetch from source which most likely means that the query is an unknown location or location that doesn't exist
                raise Exception("Location from query doesn't exist or can't be recognized by external service.")
            req_json = req.json()
            # Save meta, data as sample and creation date for fetch check
            self.__sample[query] = {}
            self.__sample[query]["meta"] = req_json['location']
            self.__sample[query]['data'] = [x['day']['condition']['code'] for x in req_json['forecast']['forecastday']]
            self.__sample[query]['created'] = datetime.now()
        return self.__sample[query]

    # Convert data from API to understandable states of 0s and 1s
    def __convert_to_state(self, data: list[int]) -> list[int]:
        # 1000, 1003 and 1006 are codes resembling good/nice/sunny weather of the day
        return [1 if x in [1000, 1003, 1006] else 0 for x in data]

    # Create a Markov transition matrix of probabilities for possible states
    def __create_transition_matrix(self, states: list[int]) -> list[list]:
        n = 1+ max(states) # Number of states
        # Create matrix of 0s
        M = [[0]*n for _ in range(n)]
        # Prepare for probability calculation
        for (i,j) in zip(states,states[1:]):
            M[i][j] += 1
        # Conversion to probabilities
        for row in M:
            s = sum(row)
            if s > 0:
                row[:] = [round(f/s, 2) * 100 for f in row]
        return M

    # Create a forecast of the next day weather based on Markov chain model
    #
    # 1. Fetch the historic weather data from data source ( in this case last 7 days from WeatherAPI )
    # 2. Convert source data to states of 0s and 1s in which 0 represents a bad weather and 1 represents a good weather
    # 3. Create Markov transition matrix based from states that resembles probabilities of the next state
    def forecast(self, query: str) -> list[object, list]:
        data = self.__fetch_sample(query) # Fetch dataset
        S = self.__convert_to_state(data['data']) # Convert to state of 0s and 1s
        M = self.__create_transition_matrix(S) # Create Markov transition matrix
        return [
            data['meta'],
            M[S[-1]] # Query matrix by last state as index
        ]
