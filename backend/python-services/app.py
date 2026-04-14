from flask import Flask
from routes.process_route import process_bp

app = Flask(__name__)

app.register_blueprint(process_bp)

if __name__ == "__main__":
    app.run(port=5001, debug=True)