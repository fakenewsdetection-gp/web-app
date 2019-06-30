from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
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
    def get(self):
        print(SAMPLE_RESULT)
        return SAMPLE_RESULT, 200, {'Access-Control-Allow-Origin': '*'}

    def post(self):
        print('put endpoint is reached!')
        args = parser.parse_args()
        print(args)
        article = {
            'headline': args['headline'],
            'body': args['body']
            }
        print('article: {}'.format(article))
        return SAMPLE_RESULT, 200, {'Access-Control-Allow-Origin': '*'}

api.add_resource(Result, '/analysis')


if __name__ == '__main__':
    app.run(debug=True)
