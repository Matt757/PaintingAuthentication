import subprocess
import re
from subprocess import check_output
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['POST'])
def hello_world():
    file_storage = request.files.get('file_upload')
    if file_storage:
        # Get the filename
        filename = secure_filename(file_storage.filename)

        # Save the file to a desired location
        file_storage.save(f'./images/{filename}')
        out = check_output(
            r"python yolov5/classify/predict.py --weights yolov5\runs\train-cls\exp10\weights\best.pt --source "
            r"./images/" + filename, shell=True, stderr=subprocess.STDOUT)
        result_array = re.split("[0-9]{1,2}\.[0-9]ms", out.decode("utf-8").split('224x224 ')[1])[0].split(', ')
        other = []
        for result in result_array[:-1]:
            other.append({'key': result.split(' ')[0], 'value': result.split(' ')[1]})
        return jsonify({'result': other})
