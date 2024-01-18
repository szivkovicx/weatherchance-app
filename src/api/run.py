# Flask
from flask import Flask
from flask_cors import CORS

# Internals
from src import load_routes
from config import load_config
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

load_config(app)
load_routes(app)

CORS(app)

if app.config['ENV'] == 'development':
    app.run(port=app.config['PORT'], debug=False)
elif app.config['ENV'] == 'production':
    from waitress import serve
    serve(app, port=app.config['PORT'])
