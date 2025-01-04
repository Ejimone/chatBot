import google.generativeai as genai
import os
from dotenv import load_dotenv
import requests

load_dotenv()

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-pro-vision')
def generate_response(text, question, image=None):
    try:
        contents = [f"given the following text: {text}, please answer this question: {question}"]

        if image:
            image_data = requests.get(image).content
            contents.append({'mime_type': 'image/jpeg', 'data': image_data})
        response = model.generate_content(contents)
        return response.text
    except Exception as e:
        raise Exception(f"Error generating response: {e}")