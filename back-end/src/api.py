from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
# from flask_cors import CORS

app = Flask(__name__)

api = Api(app)

SAMPLE_RESULT = {
    'isBiased': 'true',
    'biasConfidence': '67.23',
    'stance': 'related' # related, non-related - NONE (no headline provided)
}


# def abort_if_todo_doesnt_exist(todo_id):
#     if todo_id not in TODOS:
#         abort(404, message="Todo {} doesn't exist".format(todo_id))

parser = reqparse.RequestParser()
parser.add_argument('headline')
parser.add_argument('body')


class Result(Resource):
    def get(self):
        # abort_if_todo_doesnt_exist(todo_id)
        print(SAMPLE_RESULT)
        return SAMPLE_RESULT, 200, {'Access-Control-Allow-Origin': '*'}

    # def delete(self, todo_id):
    #     abort_if_todo_doesnt_exist(todo_id)
    #     del TODOS[todo_id]
    #     return '', 204

    def put(self):
        print('put endpoint is reached! ')
        args = parser.parse_args()
        print(args)
        article = {
            'headline': args['headline'],
            'body': args['body']
            }
        print('article: {}'.format(article))
        return SAMPLE_RESULT, 201, {'Access-Control-Allow-Origin': '*'}

    # def options (self):
    #     return {'Allow' : 'PUT' }, 200, \
    #         { 'Access-Control-Allow-Origin': '*', \
    #         'Access-Control-Allow-Methods' : 'PUT,GET' }

api.add_resource(Result, '/analysis')


if __name__ == '__main__':
    app.run(debug=True)
