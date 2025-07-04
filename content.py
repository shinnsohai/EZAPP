from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from datetime import datetime, date
from src.models.content import Content, Designer, DesignIdea, Article, db

content_bp = Blueprint('content', __name__)

# Content Management Routes
@content_bp.route('', methods=['GET'])
@jwt_required()
def get_content():
    try:
        content = Content.query.all()
        return jsonify([item.to_dict() for item in content]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@content_bp.route('', methods=['POST'])
@jwt_required()
def create_content():
    try:
        data = request.get_json()
        
        content = Content(
            page=data['page'],
            section=data['section'],
            content_type=data['content_type'],
            content_key=data['content_key'],
            content_value=data['content_value']
        )
        
        db.session.add(content)
        db.session.commit()
        
        return jsonify(content.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@content_bp.route('/<int:content_id>', methods=['PUT'])
@jwt_required()
def update_content(content_id):
    try:
        content = Content.query.get_or_404(content_id)
        data = request.get_json()
        
        content.page = data.get('page', content.page)
        content.section = data.get('section', content.section)
        content.content_type = data.get('content_type', content.content_type)
        content.content_key = data.get('content_key', content.content_key)
        content.content_value = data.get('content_value', content.content_value)
        content.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify(content.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@content_bp.route('/<int:content_id>', methods=['DELETE'])
@jwt_required()
def delete_content(content_id):
    try:
        content = Content.query.get_or_404(content_id)
        db.session.delete(content)
        db.session.commit()
        
        return jsonify({'message': 'Content deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Designer Management Routes
@content_bp.route('/designers', methods=['GET'])
@jwt_required()
def get_designers():
    try:
        designers = Designer.query.all()
        return jsonify([designer.to_dict() for designer in designers]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@content_bp.route('/designers', methods=['POST'])
@jwt_required()
def create_designer():
    try:
        data = request.get_json()
        
        designer = Designer(
            name=data['name'],
            rating=data.get('rating', 0.0),
            reviews=data.get('reviews', 0),
            category=data['category'],
            location=data['location'],
            image=data.get('image'),
            description=data.get('description'),
            projects=data.get('projects', 0),
            experience=data.get('experience')
        )
        
        db.session.add(designer)
        db.session.commit()
        
        return jsonify(designer.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@content_bp.route('/designers/<int:designer_id>', methods=['PUT'])
@jwt_required()
def update_designer(designer_id):
    try:
        designer = Designer.query.get_or_404(designer_id)
        data = request.get_json()
        
        designer.name = data.get('name', designer.name)
        designer.rating = data.get('rating', designer.rating)
        designer.reviews = data.get('reviews', designer.reviews)
        designer.category = data.get('category', designer.category)
        designer.location = data.get('location', designer.location)
        designer.image = data.get('image', designer.image)
        designer.description = data.get('description', designer.description)
        designer.projects = data.get('projects', designer.projects)
        designer.experience = data.get('experience', designer.experience)
        designer.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify(designer.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@content_bp.route('/designers/<int:designer_id>', methods=['DELETE'])
@jwt_required()
def delete_designer(designer_id):
    try:
        designer = Designer.query.get_or_404(designer_id)
        db.session.delete(designer)
        db.session.commit()
        
        return jsonify({'message': 'Designer deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Design Ideas Management Routes
@content_bp.route('/design-ideas', methods=['GET'])
@jwt_required()
def get_design_ideas():
    try:
        ideas = DesignIdea.query.all()
        return jsonify([idea.to_dict() for idea in ideas]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@content_bp.route('/design-ideas', methods=['POST'])
@jwt_required()
def create_design_idea():
    try:
        data = request.get_json()
        
        idea = DesignIdea(
            title=data['title'],
            category=data['category'],
            room=data['room'],
            image=data.get('image'),
            description=data.get('description'),
            likes=data.get('likes', 0),
            saves=data.get('saves', 0),
            designer=data.get('designer')
        )
        
        db.session.add(idea)
        db.session.commit()
        
        return jsonify(idea.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@content_bp.route('/design-ideas/<int:idea_id>', methods=['PUT'])
@jwt_required()
def update_design_idea(idea_id):
    try:
        idea = DesignIdea.query.get_or_404(idea_id)
        data = request.get_json()
        
        idea.title = data.get('title', idea.title)
        idea.category = data.get('category', idea.category)
        idea.room = data.get('room', idea.room)
        idea.image = data.get('image', idea.image)
        idea.description = data.get('description', idea.description)
        idea.likes = data.get('likes', idea.likes)
        idea.saves = data.get('saves', idea.saves)
        idea.designer = data.get('designer', idea.designer)
        idea.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify(idea.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@content_bp.route('/design-ideas/<int:idea_id>', methods=['DELETE'])
@jwt_required()
def delete_design_idea(idea_id):
    try:
        idea = DesignIdea.query.get_or_404(idea_id)
        db.session.delete(idea)
        db.session.commit()
        
        return jsonify({'message': 'Design idea deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Articles Management Routes
@content_bp.route('/articles', methods=['GET'])
@jwt_required()
def get_articles():
    try:
        articles = Article.query.all()
        return jsonify([article.to_dict() for article in articles]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@content_bp.route('/articles', methods=['POST'])
@jwt_required()
def create_article():
    try:
        data = request.get_json()
        
        # Parse date string to date object
        article_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        
        article = Article(
            title=data['title'],
            category=data['category'],
            author=data['author'],
            date=article_date,
            read_time=data.get('read_time'),
            image=data.get('image'),
            excerpt=data.get('excerpt'),
            content=data.get('content'),
            tags=data.get('tags')
        )
        
        db.session.add(article)
        db.session.commit()
        
        return jsonify(article.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@content_bp.route('/articles/<int:article_id>', methods=['PUT'])
@jwt_required()
def update_article(article_id):
    try:
        article = Article.query.get_or_404(article_id)
        data = request.get_json()
        
        article.title = data.get('title', article.title)
        article.category = data.get('category', article.category)
        article.author = data.get('author', article.author)
        
        if 'date' in data:
            article.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
            
        article.read_time = data.get('read_time', article.read_time)
        article.image = data.get('image', article.image)
        article.excerpt = data.get('excerpt', article.excerpt)
        article.content = data.get('content', article.content)
        article.tags = data.get('tags', article.tags)
        article.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify(article.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@content_bp.route('/articles/<int:article_id>', methods=['DELETE'])
@jwt_required()
def delete_article(article_id):
    try:
        article = Article.query.get_or_404(article_id)
        db.session.delete(article)
        db.session.commit()
        
        return jsonify({'message': 'Article deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Public API routes (no authentication required)
@content_bp.route('/public/designers', methods=['GET'])
def get_public_designers():
    try:
        category = request.args.get('category')
        location = request.args.get('location')
        
        query = Designer.query
        
        if category and category != 'all':
            query = query.filter(Designer.category.ilike(f'%{category}%'))
        if location and location != 'all':
            query = query.filter(Designer.location.ilike(f'%{location}%'))
            
        designers = query.all()
        return jsonify([designer.to_dict() for designer in designers]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@content_bp.route('/public/design-ideas', methods=['GET'])
def get_public_design_ideas():
    try:
        category = request.args.get('category')
        room = request.args.get('room')
        
        query = DesignIdea.query
        
        if category and category != 'all':
            query = query.filter(DesignIdea.category.ilike(f'%{category}%'))
        if room and room != 'all':
            query = query.filter(DesignIdea.room.ilike(f'%{room}%'))
            
        ideas = query.all()
        return jsonify([idea.to_dict() for idea in ideas]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@content_bp.route('/public/articles', methods=['GET'])
def get_public_articles():
    try:
        category = request.args.get('category')
        search = request.args.get('search')
        
        query = Article.query
        
        if category and category != 'all':
            query = query.filter(Article.category.ilike(f'%{category}%'))
        if search:
            query = query.filter(Article.title.ilike(f'%{search}%'))
            
        articles = query.order_by(Article.date.desc()).all()
        return jsonify([article.to_dict() for article in articles]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

