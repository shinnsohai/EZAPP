import os
import sys
# DON'T CHANGE: Add the src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from src.models.content import db
from src.routes.auth import auth_bp
from src.routes.content import content_bp
from src.routes.upload import upload_bp

def create_app():
    app = Flask(__name__, static_folder='static', static_url_path='')
    
    # Configuration
    app.config['SECRET_KEY'] = 'ez-id-secret-key-2024'
    app.config['JWT_SECRET_KEY'] = 'ez-id-jwt-secret-key-2024'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ez_id.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
    
    # Initialize extensions
    CORS(app, origins="*")
    JWTManager(app)
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(content_bp, url_prefix='/api/content')
    app.register_blueprint(upload_bp, url_prefix='/api/upload')
    
    # Create database tables
    with app.app_context():
        db.create_all()
        
        # Create default broadcast message if none exists
        from src.models.content import BroadcastMessage
        if not BroadcastMessage.query.first():
            default_broadcast = BroadcastMessage(
                message="5 - 6 & 19 - 20 July: Skip showroom-hopping! Meet multiple designers at the Ez-ID Meetup event. 😎",
                link_text="RSVP now",
                link_url="#",
                is_active=True
            )
            db.session.add(default_broadcast)
            db.session.commit()
    
    # Serve React app
    @app.route('/')
    def serve_react_app():
        return send_from_directory(app.static_folder, 'index.html')
    
    @app.route('/<path:path>')
    def serve_react_routes(path):
        # Check if it's an API route
        if path.startswith('api/'):
            return {'error': 'API endpoint not found'}, 404
        
        # Check if it's a static file
        if '.' in path:
            try:
                return send_from_directory(app.static_folder, path)
            except:
                pass
        
        # Serve React app for all other routes
        return send_from_directory(app.static_folder, 'index.html')
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

