from RMDL.RMDL import rmdl_text as RMDL


class RMDL_Model():
    def __init__(self, random_deep=[3, 3, 3]):
        RMDL.read_models(random_deep)
        pass

    def predict(self, article_text):
        pred, _ = RMDL.predict([article_text], 2, weighted_prediction=True, max_seq_len=2000, return_probs=True)
        return float(pred[0][0]*100.0)
