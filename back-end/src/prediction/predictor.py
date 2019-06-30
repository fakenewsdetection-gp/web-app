# from RMDL_model import RMDL_Model
# from stance_model import Stance_Model
from .text_preprocessor import TextCleaner
from collections import Counter


class Predictor():
    def __init__(self):
        self.cleaner = TextCleaner()
        # self.rmdl_model = RMDL_Model()
        # self.stance_model = Stance_Model()

    def predict(self, article_text, article_headline):
        clean_body = self.cleaner.cleanup_text(article_text)
        clean_headline = self.cleaner.cleanup_text(article_headline)
        body_tokens = TextCleaner.tokenize(clean_body)
        headline_tokens = TextCleaner.tokenize(clean_headline)

        body_cnts = Counter(body_tokens)
        headline_cnts = Counter(headline_tokens)
        # rmdl_pred = self.rmdl_model.predict(clean_body)
        rmdl_pred = { 'hyperpartisan': '58.6' }
        return self._reformat_word_cloud(body_cnts), self._reformat_word_cloud(headline_cnts), rmdl_pred

    def _reformat_word_cloud(self, cnts_dict):
        formatted_word_cloud = []
        for word, count in cnts_dict.items():
            formatted_word_cloud.append({'text': word, 'value': count})
        return formatted_word_cloud
