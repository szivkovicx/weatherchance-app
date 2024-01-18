from os import getenv

def load_config(app):
    app.config['WEATHER_API_KEY'] = getenv("WEATHER_API_KEY")
    app.config['PORT'] = int(getenv("PORT"))
    app.config['ENV'] = getenv("ENV")
