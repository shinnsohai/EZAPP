import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from PIL import Image
import mimetypes

upload_bp = Blueprint('upload', __name__)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def resize_image(image_path, max_width=1200, max_height=800, quality=85):
    """Resize image to optimize for web while maintaining aspect ratio"""
    try:
        with Image.open(image_path) as img:
            # Convert to RGB if necessary (for JPEG compatibility)
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Calculate new dimensions maintaining aspect ratio
            width, height = img.size
            if width > max_width or height > max_height:
                ratio = min(max_width/width, max_height/height)
                new_width = int(width * ratio)
                new_height = int(height * ratio)
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Save optimized image
            img.save(image_path, 'JPEG', quality=quality, optimize=True)
            return True
    except Exception as e:
        print(f"Error resizing image: {e}")
        return False

@upload_bp.route('/image', methods=['POST'])
@jwt_required()
def upload_image():
    try:
        # Check if file is in request
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Check file size
        if len(file.read()) > MAX_FILE_SIZE:
            return jsonify({'error': 'File too large. Maximum size is 16MB'}), 400
        
        # Reset file pointer
        file.seek(0)
        
        # Check file type
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Allowed: PNG, JPG, JPEG, GIF, WEBP'}), 400
        
        # Generate unique filename
        file_extension = file.filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{uuid.uuid4().hex}.{file_extension}"
        
        # Create upload directory if it doesn't exist
        upload_dir = os.path.join(current_app.root_path, 'static', 'uploads')
        os.makedirs(upload_dir, exist_ok=True)
        
        # Save file
        file_path = os.path.join(upload_dir, unique_filename)
        file.save(file_path)
        
        # Optimize image for web
        if file_extension.lower() in ['jpg', 'jpeg', 'png']:
            resize_image(file_path)
        
        # Return file URL
        file_url = f"/uploads/{unique_filename}"
        
        return jsonify({
            'success': True,
            'filename': unique_filename,
            'url': file_url,
            'message': 'Image uploaded successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@upload_bp.route('/images', methods=['GET'])
@jwt_required()
def list_images():
    try:
        upload_dir = os.path.join(current_app.root_path, 'static', 'uploads')
        
        if not os.path.exists(upload_dir):
            return jsonify({'images': []}), 200
        
        images = []
        for filename in os.listdir(upload_dir):
            if allowed_file(filename):
                file_path = os.path.join(upload_dir, filename)
                file_stats = os.stat(file_path)
                
                images.append({
                    'filename': filename,
                    'url': f"/uploads/{filename}",
                    'size': file_stats.st_size,
                    'created': file_stats.st_ctime
                })
        
        # Sort by creation time (newest first)
        images.sort(key=lambda x: x['created'], reverse=True)
        
        return jsonify({'images': images}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@upload_bp.route('/image/<filename>', methods=['DELETE'])
@jwt_required()
def delete_image(filename):
    try:
        # Validate filename
        if not allowed_file(filename):
            return jsonify({'error': 'Invalid filename'}), 400
        
        # Secure the filename
        secure_name = secure_filename(filename)
        file_path = os.path.join(current_app.root_path, 'static', 'uploads', secure_name)
        
        # Check if file exists
        if not os.path.exists(file_path):
            return jsonify({'error': 'File not found'}), 404
        
        # Delete file
        os.remove(file_path)
        
        return jsonify({
            'success': True,
            'message': 'Image deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

