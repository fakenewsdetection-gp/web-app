from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from prediction.predictor import Predictor
# from flask_cors import CORS

app = Flask(__name__)

api = Api(app)

SAMPLE_RESULT = {
    'isBiased': 'true',
    'biasConfidence': '67.23',
    'stance': 'related'
}


parser = reqparse.RequestParser()
parser.add_argument('headline')
parser.add_argument('body')


class Result(Resource):

    def __init__(self):
        self.predictor = Predictor()

    def get(self):
        print(SAMPLE_RESULT)
        return SAMPLE_RESULT, 200, {'Access-Control-Allow-Origin': '*'}

    def post(self):
        print('post endpoint is reached!')
        args = parser.parse_args()
        print(args)
        article = {
            'headline': args['headline'],
            'body': args['body']
            }
        print('parsed article: {}'.format(article))
        response = self.predictor.predict(article['headline'], article['body'])
        print('Response: {}'.format(response))
        return response, 200, {'Access-Control-Allow-Origin': '*'}

api.add_resource(Result, '/analysis')


if __name__ == '__main__':
    app.run(debug=True)
