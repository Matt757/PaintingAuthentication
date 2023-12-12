from roboflow import Roboflow
import os

rf = Roboflow(api_key="4DbycCeBNArqyqpLsQPu")
project = rf.workspace("painting-authenticator").project("painting-authenticator")
dataset = project.version(2).download("folder")

dataset_name = dataset.location.split(os.sep)[-1]
os.environ["DATASET_NAME"] = dataset_name
