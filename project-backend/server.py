from flask import Flask, render_template, Response, request
import cv2
import datetime, time
import os, sys
import numpy as np
import matplotlib.pyplot as pyplot
import dlib
from threading import Thread
from sqlalchemy.orm import query, session
from werkzeug.utils import redirect
from gaze_tracking import GazeTracking
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from model.user_model import Users, Records
import pyaudio
import json

CHUNK = 2**10
RATE = 44100

#pip install pipwin
#pipwin install pyaudio

# pip install flask_sqlalchemy
# pip install pymysql

p=pyaudio.PyAudio()
stream=p.open(format=pyaudio.paInt16,channels=1,rate=RATE,input=True,frames_per_buffer=CHUNK)

FACE_CASCADE = cv2.CascadeClassifier('haarcascade/haarcascade_frontalface_default.xml')
EYE_CASCADE = cv2.CascadeClassifier('haarcascade/haarcascade_eye.xml')
SMILE_CASCADE = cv2.CascadeClassifier('haarcascade/haarcascade_smile.xml')

global rec_frame, switch, rec, out, camera
switch = 0
rec = 0
smile = 0 
noSmile = 0
top = 0
left = 0
right = 0
center = 0
joinId = ""
joinPw = ""
loginId = ""
loginPw = ""

#Load pretrained face detection model    

#instatiate flask app  
app = Flask(__name__, template_folder='./templates')

gaze = GazeTracking()
camera = cv2.VideoCapture()

# database 설정파일
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:gkdl1367!@localhost:3306/mydata?charset=utf8"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


def gen_frames():  # generate frame by frame from camera
    global out, capture, rec_frame, smile, noSmile, data, voice, top, left, right, center
    while True:
        ret, frame  = camera.read()
        if not ret:
            break
        else:
            bw_img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = FACE_CASCADE.detectMultiScale(bw_img, 1.3, 5)
            for fx, fy, fw, fh in faces:
                region_of_interest_bw = bw_img[fy:fy+fh, fx:fx+fw]
                smiles = SMILE_CASCADE.detectMultiScale(region_of_interest_bw, 1.7, 22)
                if len(smiles):
                    for sx, sy, sw, sh in smiles:
                        # cv2.putText(frame, 'smile', (50, 50), 0, 3, (0, 0, 255), 2, cv2.LINE_4)
                        smile += 1
                else:
                    # cv2.putText(frame, 'no smile', (50, 50), 0, 3, (0, 0, 255), 2, cv2.LINE_4)
                    noSmile += 1
            data = np.frombuffer(stream.read(CHUNK),dtype=np.int16)
            voice=int(np.average(np.abs(data)))
            if(voice>1700):
                frame= cv2.putText(frame,"Your voice is too loud", (0,25), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0),4)
            elif(voice<250 and voice>100):
                frame= cv2.putText(frame,"Your voice is too small.", (0,25), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0),4)
            
            print(voice)
            gaze.refresh(frame)
            frame = gaze.annotated_frame()
            text = ""

            if gaze.is_top():
                top += 1
                
            elif gaze.is_right():
                right += 1

            elif gaze.is_left():
                left += 1

            elif gaze.is_center():
                center += 1

            # cv2.putText(frame, text, (90, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, (147, 58, 31), 2)
            # cv2.putText(frame, "Left : %d"%left, (120, 100), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
            # cv2.putText(frame, "Right : %d"%right, (120, 135), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
            # cv2.putText(frame, "Top : %d"%top, (120, 170), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
            # cv2.putText(frame, "center : %d"%center, (120, 200), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
           
        try:
            ret, jpeg = cv2.imencode('.jpg', frame)
            frame = jpeg.tobytes()
            yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        except Exception as e:
            stream.stop_stream()
            stream.close()
            p.terminate()
            pass
        
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/mypage')
def mypage():
    myrecords = Records.query.filter_by(user_id = loginId).all()
    return render_template('mypage.html', loginId=loginId, myrecords=myrecords)

@app.route('/main')
def main():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('index.html')

@app.route('/join')
def join():
    return render_template('index.html')

@app.route('/join/register', methods=['POST', 'GET'])
def register():
    global joinId, joinPw
    userInfo = request.get_json()
    joinId = userInfo['userId']
    joinPw = userInfo['passWord']
    
    try:
        users=Users(joinId, joinPw)
        db.session.add(users)
        db.session.commit()
        return 'Done', 200
    except exc.IntegrityError:
        db.session.rollback()
        return 'Failed', 403
   
    # return 'Done'

@app.route('/login/userLogin', methods=['POST', 'GET'])
def get_user():
    global loginId, loginPw
    userInfo = request.get_json()
    loginId = userInfo['userId']
    loginPw = userInfo['passWord']
    
    chkId = Users.query.filter_by(userId=loginId).first()

    if (chkId != None): 
        if (chkId.passWord == loginPw):
            return 'Done', 200
        else:
            return 'Faild', 404
    else:
        loginId = ""
        loginPw = ""
        
        return 'Failed', 404

@app.route('/logout')
def logout():
    global loginId, loginPw
    loginId = ""
    loginPw = ""
    return redirect('/')
    
@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/main',methods=['POST','GET'])
def tasks():
    global switch,camera,left,right,smile,noSmile,top,center, cnt
    if request.method == 'POST':
        if  request.form.get('stop') == 'Stop/Start':
            
            if(switch==0):
                switch=1
                smile=0
                noSmile=0
                center=0
                right=0
                left=0
                top=0

                camera = cv2.VideoCapture(0, cv2.CAP_DSHOW)
            else:
                switch=0
                camera.release()
                cv2.destroyAllWindows()

                try:
                    left_ratio = str(round((left/center)*100,1))
                    right_ratio = str(round((right/center)*100,1))
                    top_ratio = str(round((top/center)*100,1))
                    center_ratio = str(round((center/100)*100,1))
                    smile_ratio = str(round(smile/(smile+noSmile)*100,1))
                    noSmile_ratio = str(round(noSmile/(smile+noSmile)*100,1))
                                              
                    feedbacks=Records(loginId,left_ratio,right_ratio,top_ratio,smile_ratio,noSmile_ratio)
                    db.session.add(feedbacks)
                    db.session.commit()
                    
                #결과가 아무것도 없을때
                except ZeroDivisionError:
                    text = '결과 없음'
                    left_ratio = '0.0' 
                    right_ratio = '0.0'
                    top_ratio = '0.0'
                    smile_ratio = '0.0'
                    noSmile_ratio = '0.0'
                    return render_template('test.html',text=text,left_ratio=left_ratio, right_ratio=right_ratio, top_ratio=top_ratio,smile_ratio=smile_ratio, noSmile_ratio=noSmile_ratio)
                return render_template('test.html',left_ratio=left_ratio, right_ratio=right_ratio, top_ratio=top_ratio,                     center_ratio=center_ratio,smile_ratio=smile_ratio, noSmile_ratio=noSmile_ratio,loginId=loginId)

            
    elif request.method=='GET':
        return render_template('index.html')
    return render_template('index.html')

if __name__ == '__main__':
    app.run()

camera.release()
cv2.destroyAllWindows()  