from flask import Flask, render_template, request
import random
import string
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Download stopwords and WordNetLemmatizer
nltk.download('stopwords')
nltk.download('wordnet')

# Initialize lemmatizer
lemmatizer = WordNetLemmatizer()

# Initialize stopwords
stop_words = set(stopwords.words('english'))

# Load the dataset
with open('data.csv', 'r', encoding='utf-8') as file:
    dataset = file.read().lower().split('\n')

# Preprocess the dataset
processed_data = []
for sentence in dataset:
    words = sentence.split()
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    processed_data.append(' '.join(words))

# Initialize TfidfVectorizer
vectorizer = TfidfVectorizer()

# Fit the TfidfVectorizer on the processed dataset
tfidf_matrix = vectorizer.fit_transform(processed_data)

# Define a function to get the response
def get_response(query):
    query = re.sub('[^a-zA-Z]', ' ', query)
    words = query.split()
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    query_tfidf = vectorizer.transform([' '.join(words)])
    similarity = cosine_similarity(query_tfidf, tfidf_matrix).flatten()
    max_index = np.argmax(similarity)
    response = dataset[max_index]
    return response

# Initialize Flask app
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get', methods=['POST'])
def get_bot_response():
    query = request.form['input_query']
    response = get_response(query)
    return response

if __name__ == '__main__':
    app.run(debug=True)