# Flask
from flask import jsonify, request

# Services
from .services.forecast import ForecastService

def load_routes(app):
    forecast_service = ForecastService(app.config['WEATHER_API_KEY'])

    @app.errorhandler(404)
    def not_found(e): 
        return jsonify({
            "message": "Not found"
        })
    
    @app.errorhandler(500)
    def server_error(e):
        return jsonify({
            "message": str(e)
        })

    @app.route("/api/forecast")
    def forecast():
        try:
            meta, forecast = forecast_service.forecast(request.args.get('query'))
            return jsonify({
                "data": {
                    "meta": meta,
                    "forecast": forecast
                }
            }), 200
        except Exception as e:
            return jsonify({
                "message": str(e)
            }), 500
