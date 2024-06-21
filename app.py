from flask import Flask, render_template, request
import numpy as np
import nltk
import string
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load NLTK resources
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')

# Load data
f = open('data.txt', 'r', errors='ignore')
raw_doc = f.read()

raw_doc = raw_doc.lower()
sentence_tokens = nltk.sent_tokenize(raw_doc)
word_tokens = nltk.word_tokenize(raw_doc)

# Initialize Lemmatizer
lemmer = nltk.stem.WordNetLemmatizer()

def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punc_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punc_dict)))

greet_inputs = ('hello', 'hi','hii','hey', 'how are you?')
greet_response = ('Hi, How may I help you today?', 'Hey, How may I help you today?')

def greet(sentence):
    for word in sentence.split():
        if word.lower() in greet_inputs:
            return random.choice(greet_response)

def response(user_response):
    global word_tokens  # Declare word_tokens as global
    
    robo1_response = ''
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(sentence_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if (req_tfidf == 0):
        robo1_response = robo1_response + "I am sorry. Unable to understand you!"
        return robo1_response
    else:
        robo1_response = robo1_response + sentence_tokens[idx]
        return robo1_response

@app.route("/")
def home():
    return render_template("index3.html")


@app.route("/get")
def get_bot_response():
    user_response = request.args.get('msg')
    user_response = user_response.lower()

    if user_response != 'bye':
        if user_response == 'thank you' or user_response == 'thanks':
            return 'You are welcome...'
        else:
            if greet(user_response) is not None:
                return greet(user_response)
            else:
                sentence_tokens.append(user_response)
                word_tokens.extend(nltk.word_tokenize(user_response))  # Use extend instead of +
                final_words = list(set(word_tokens))
                response_text = response(user_response)
                sentence_tokens.remove(user_response)
                return response_text
    else:
        return 'Goodbye!'

if __name__ == "__main__":
    app.run(debug=True)

