import argparse
import json
import os
from datetime import datetime

import cv2
import numpy as np
from ultralytics import YOLO
from pymongo import MongoClient
from imagekitio import ImageKit
from imagekitio.models.UploadFileRequestOptions import UploadFileRequestOptions

# Парсинг аргументов
parser = argparse.ArgumentParser()
parser.add_argument('--video', required=True)
parser.add_argument('--json', required=True)
args = parser.parse_args()

video_path = args.video
json_path = args.json

# Инициализация
model = YOLO('best.pt')
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)

with open(json_path) as f:
    gps_data = json.load(f)

# ImageKit
imagekit = ImageKit(
    public_key='public_vIcFBF9mD1vXZWBUSp1PCv8wpNY=',
    private_key='private_W3vRBOR7hhgGr34TXKdiYIYRhh0=',
    url_endpoint='https://ik.imagekit.io/Fox777'
)

# Mongo
mongo = MongoClient('mongodb+srv://gaazovalmaz589:sWIxaxeuHjkPUVHX@smartroadscan.kklaw.mongodb.net/?retryWrites=true&w=majority&appName=SmartRoadScan')
db = mongo['SmartRoadScanDB']
collection = db['reports']

# ROI
roi_y = 450
roi_height = 100
control_line_y = roi_y + roi_height - 20
px_to_cm = 0.5
min_area_cm2 = 50

def calculate_area(contour):
    return cv2.contourArea(contour) * (px_to_cm ** 2)

def find_gps_by_time(time_s):
    closest = min(gps_data, key=lambda x: abs(x['timer'] - int(time_s)))
    return closest

# Обработка
frame_id = 0
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    time_s = frame_id / fps
    roi = frame[roi_y:roi_y + roi_height, :]
    results = model(roi, conf=0.5, iou=0.4)

    if results[0].masks is not None:
        for mask in results[0].masks.data.cpu().numpy():
            mask = (cv2.resize(mask, (roi.shape[1], roi.shape[0])) * 255).astype(np.uint8)
            contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            for cnt in contours:
                cnt[:, 0, 1] += roi_y
                if calculate_area(cnt) < min_area_cm2:
                    continue
                if np.any(cnt[:, 0, 1] >= control_line_y):
                    ts = int(datetime.now().timestamp())
                    fname = f'pothole_{ts}.jpg'
                    cv2.imwrite(fname, frame)

                    with open(fname, 'rb') as f:
                        res = imagekit.upload_file(
                            file=f,
                            file_name=fname,
                            options=UploadFileRequestOptions(
                                folder="/detections",
                                tags=["pothole", "detection"],
                                is_private_file=False
                            )
    )

                    gps = find_gps_by_time(time_s)
                    collection.insert_one({
                        'timestamp': datetime.utcnow(),
                        'latitude': gps['latitude'],
                        'longitude': gps['longitude'],
                        'imageUrl': res.url,
                        'confidence': 1.0,
                        'type': 'offline'
                    })

                    os.remove(fname)

    frame_id += 1

cap.release()
print('✅ Offline detection finished')
