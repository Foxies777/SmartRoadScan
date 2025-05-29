import argparse
import json
import os
from datetime import datetime, timezone

import cv2
import numpy as np
from ultralytics import YOLO
from pymongo import MongoClient
from imagekitio import ImageKit
from imagekitio.models.UploadFileRequestOptions import UploadFileRequestOptions

# Argument parsing
parser = argparse.ArgumentParser()
parser.add_argument('--video', required=True)
parser.add_argument('--json', required=True)
args = parser.parse_args()

video_path = args.video
json_path = args.json

# Initialize YOLO model
model = YOLO('best.pt')
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)

with open(json_path) as f:
    gps_data = json.load(f)

# Initialize ImageKit
imagekit = ImageKit(
    public_key='public_vIcFBF9mD1vXZWBUSp1PCv8wpNY=',
    private_key='private_W3vRBOR7hhgGr34TXKdiYIYRhh0=',
    url_endpoint='https://ik.imagekit.io/Fox777'
)

# Initialize MongoDB
mongo = MongoClient('mongodb+srv://gaazovalmaz589:sWIxaxeuHjkPUVHX@smartroadscan.kklaw.mongodb.net/?retryWrites=true&w=majority&appName=SmartRoadScan')
db = mongo['SmartRoadScanDB']
collection = db['reports']

px_to_cm = 0.5
min_area_cm2 = 50

def calculate_area(contour):
    return cv2.contourArea(contour) * (px_to_cm ** 2)

def find_gps_by_time(time_s):
    closest = min(gps_data, key=lambda x: abs(x['timer'] - int(time_s)))
    return closest

frame_id = 0
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    time_s = frame_id / fps
    results = model(frame, conf=0.5, iou=0.4)

    if results[0].masks is not None:
        for mask in results[0].masks.data.cpu().numpy():
            mask = (cv2.resize(mask, (frame.shape[1], frame.shape[0])) * 255).astype(np.uint8)
            contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            for cnt in contours:
                if calculate_area(cnt) < min_area_cm2:
                    continue

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
                now = datetime.now(timezone.utc)
                collection.insert_one({
                    'latitude': gps['latitude'],
                    'longitude': gps['longitude'],
                    'imageUrl': res.url,
                    'area': calculate_area(cnt),
                    'status': 'PENDING',
                    'type': 'offline',
                    'createdAt': now,
                    'updatedAt': now
                })

                os.remove(fname)

    frame_id += 1

cap.release()
print('✅ Offline detection finished')
