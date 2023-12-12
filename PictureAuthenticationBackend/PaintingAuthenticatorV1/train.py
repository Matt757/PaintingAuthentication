import subprocess
subprocess.run('python yolov5/classify/train.py --model yolov5s-cls.pt --data Painting-Authenticator-2 '
               '--epochs 100 --img 128 '               '--pretrained weights/yolov5s-cls.pt')