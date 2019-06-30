from RMDL import rmdl_text as RMDL


class RMDL_Model():
    def __init__(self):
        pass

    def predict(self, article_text):
        pred, _ = RMDL.predict([article_text], 2, weighted_prediction=True, max_seq_len=2000, return_probs=True)
        return pred[0]
