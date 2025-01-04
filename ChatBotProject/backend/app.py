from flask import Flask, request, jsonify
from flask_cors import CORS
from pdf_processor import extract_text_from_pdf
from gemini_handler import generate_response
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app) # Enable CORS for React app

@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'pdf' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    pdf_file = request.files['pdf']
    if pdf_file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        pdf_text = extract_text_from_pdf(pdf_file)
        return jsonify({'message': 'File uploaded and text extracted', 'text': pdf_text}), 200
    except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    text = data.get('text')
    question = data.get('question')
    image = data.get('image')

    if not text or not question:
        return jsonify({'error': 'Text and Question are required'}), 400

    try:
        response = generate_response(text, question, image)
        return jsonify({'response': response}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
        app.run(debug=True, port=5000)