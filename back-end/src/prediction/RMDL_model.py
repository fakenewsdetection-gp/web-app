from RMDL import rmdl_text as RMDL


class RMDL_Model():
    def __init__(self, random_deep=[3, 3, 3]):
        self.random_deep = random_deep
        RMDL.read_models(random_deep)

    def predict(self, article_text):
        pred, _ = RMDL.predict([article_text], 2, random_deep=self.random_deep, weighted_prediction=True, max_seq_len=2000, return_probs=True)
        return pred[0]
