import numpy as np
import pickle
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import sent_tokenize
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from keras.models import load_model

from .text_preprocessor import TextCleaner

nltk.download('vader_lexicon')


class Stance_Model():
    def __init__(self):
        self.cleaner = TextCleaner()
        self.__read_bows()
        self.sentiment_intensity_analyzer = SentimentIntensityAnalyzer()
        self.model = load_model('stance_model/ucl-based.hdf5')

    def predict(self, article_head, article_body):
        features = self.__extract_features(article_head, article_body)
        return self.model.predict(features)[0].tolist()

    def __clean_text(self, text):
        text = self.cleaner.cleanup_text(text,
                                            remove_punctuation=True,
                                            remove_nonascii=True,
                                            replace_num=True,
                                            remove_possessive=False,
                                            remove_puncwords=True)
        return text

    def __read_bows(self):
        with open("stance_bow_vectorizer.pickle", "rb") as bow_vectorizer_file:
            self.bow_vectorizer = pickle.load(bow_vectorizer_file)
        with open("stance_tfidf_vectorizer.pickle", "rb") as tfidf_vectorizer_file:
            self.tfidf_vectorizer = pickle.load(tfidf_vectorizer_file)
        with open("stance_tfreq_vectorizer.pickle", "rb") as tfreq_vectorizer_file:
            self.tfreq_vectorizer = pickle.load(tfreq_vectorizer_file)

    def __extract_tf_tfidf_features(self, text):
        text_bow = self.bow_vectorizer.transform([text]).toarray()
        text_tf = self.tfreq_vectorizer.transform(text_bow).toarray()[0].reshape(1, -1)
        text_tfidf = self.tfidf_vectorizer.transform([text]).toarray().reshape(1, -1)
        return text_tf, text_tfidf

    def __compute_cosine_similarity(self, head_tfidf, body_tfidf):
        return cosine_similarity(head_tfidf, body_tfidf)[0].reshape(1, 1)

    def __extract_sentiment_features(self, text):
        sentences = sent_tokenize(text)
        return np.mean([list(self.sentiment_intensity_analyzer.polarity_scores(s).values()) for s in sentences], axis=0)

    def __extract_features(self, article_head, article_body):
        article_head = self.__clean_text(article_head)
        article_body = self.__clean_text(article_body)
        head_tf, head_tfidf = self.__extract_tf_tfidf_features(article_head)
        body_tf, body_tfidf = self.__extract_tf_tfidf_features(article_body)
        cosine_sim = self.__compute_cosine_similarity(head_tfidf, body_tfidf)
        tf_cosine_vec = np.squeeze(np.c_[head_tf, body_tf, cosine_sim])
        print("tf_cosine_vec")
        print(tf_cosine_vec.shape)
        head_sent = self.__extract_sentiment_features(article_head)
        body_sent = self.__extract_sentiment_features(article_body)
        sent_feat = np.concatenate((head_sent, body_sent), axis=None)
        feat_vec = np.concatenate((tf_cosine_vec, sent_feat))
        return feat_vec.reshape((1, feat_vec.shape[0]))
