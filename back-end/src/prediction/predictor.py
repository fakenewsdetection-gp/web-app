from .RMDL_model import RMDL_Model
from .stance_model import Stance_Model
from .text_preprocessor import TextCleaner
from collections import Counter


class Predictor():
    def __init__(self):
        self.cleaner = TextCleaner()
        self.rmdl_model = RMDL_Model()
        self.stance_model = Stance_Model()

    def predict(self, article_headline, article_text):
        clean_body = self.cleaner.cleanup_text(article_text)
        clean_headline = self.cleaner.cleanup_text(article_headline)
        body_tokens = TextCleaner.tokenize(clean_body)
        headline_tokens = TextCleaner.tokenize(clean_headline)

        body_cnts = Counter(body_tokens)
        headline_cnts = Counter(headline_tokens)
        rmdl_pred = { 'hyperpartisan': self.rmdl_model.predict(clean_body) }
        print('Received hyperpartisan confidence: {}'.format(rmdl_pred))
        stance_pred = self.stance_model.predict(article_headline, article_text)
        stance_pred = { 'agree': stance_pred[0] , 'disagree': stance_pred[1],
                        'discuss': stance_pred[2], 'unrelated': stance_pred[3] }
        # stance_pred = { 'agree': float(50.0) , 'disagree': float(10.0),
        #                 'discuss': float(30.0), 'unrelated': float(10.0) }
        print('Received stance predictions: {}'.format(stance_pred))
        return self._reformat_word_cloud(body_cnts), self._reformat_word_cloud(headline_cnts), rmdl_pred, stance_pred

    def _reformat_word_cloud(self, cnts_dict):
        formatted_word_cloud = []
        for word, count in cnts_dict.items():
            formatted_word_cloud.append({'text': word, 'value': count})
        return formatted_word_cloud
