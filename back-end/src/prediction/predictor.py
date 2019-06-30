from RMDL_model import RMDL_Model
from stance_model import Stance_Model
from text_preprocessor import TextCleaner
from collections import Counter


class Predictor():
    def __init__(self):
        self.cleaner = TextCleaner()
        self.rmdl_model = RMDL_Model()
        self.stance_model = Stance_Model()

    def predict(self, article_text, article_headline):
        clean_body = self.cleaner.cleanup_text(article_text)
        clean_headline = self.cleaner.cleanup_text(article_headline)
        body_tokens = TextCleaner.tokenize(clean_body)
        headline_tokens = TextCleaner.tokenize(clean_headline)

        body_cnts = Counter(body_tokens)
        headline_cnts = Counter(headline_tokens)
        rmdl_pred = self.rmdl_model.predict(clean_body)

        return body_cnts, headline_cnts, rmdl_pred
