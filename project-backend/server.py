from flask import Flask, render_template, Response, request
import cv2
import datetime, time
import os, sys
import numpy as np
from threading import Thread
from deepface import DeepFace

#ddd
#ddd

face_cascade = cv2.CascadeClassifier('haarcascade/haarcascade_frontalface_default.xml')
ds_factor=0.6


global rec_frame, switch, rec, out,face
face=0
switch=1
rec=0

#make shots directory to save pics
try:
    os.mkdir('./shots')
except OSError as error:
    pass

#Load pretrained face detection model    

#instatiate flask app  
app = Flask(__name__, template_folder='./templates')


camera = cv2.VideoCapture(0)

def record(out):
    global rec_frame
    while(rec):
        time.sleep(0.05)
        out.write(rec_frame)


def gen_frames():  # generate frame by frame from camera
    global out, capture,rec_frame
    while True:
        ret, frame  = camera.read() 
        if ret:
            if(face):
                result = DeepFace.analyze(frame, actions =['emotion'])
                gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
                faces = face_cascade.detectMultiScale(gray, 1.1,4)
                for(x,y,w,h) in faces:
                    cv2.rectangle(frame, (x,y) , (x+w, y+h), (0,255, 0),2)            
                    font = cv2.FONT_HERSHEY_SIMPLEX
                    cv2.putText(frame, result['dominant_emotion'],( 50,50), font, 3, (0,0,255), 2,cv2.LINE_4)
            if(rec):
                rec_frame=frame
                frame= cv2.putText(cv2.flip(frame,1),"Recording...", (0,25), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255),4)
                frame=cv2.flip(frame,1)
            
                
        try:
            ret, jpeg = cv2.imencode('.jpg', frame)
            frame = jpeg.tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        except Exception as e:
            pass
                


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/main')
def main():
    return render_template('index.html')

@app.route('/join')
def join():
    return render_template('index.html')
    
    
@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/main',methods=['POST','GET'])
def tasks():
    global switch,camera
    if request.method == 'POST':
        if request.form.get('click') == 'Capture':
            global capture
            capture=1
        elif  request.form.get('stop') == 'Stop/Start':
            
            if(switch==1):
                switch=0
                camera.release()
                cv2.destroyAllWindows()
                
            else:
                camera = cv2.VideoCapture(0)
                switch=1
        elif  request.form.get('rec') == 'Start/Stop Recording':
            global rec, out
            rec= not rec
            if(rec):
                now=datetime.datetime.now() 
                fourcc = cv2.VideoWriter_fourcc(*'XVID')
                out = cv2.VideoWriter('vid_{}.avi'.format(str(now).replace(":",'')), fourcc, 20.0, (640, 480))
                #Start new thread for recording the video
                thread = Thread(target = record, args=[out,])
                thread.start()
            elif(rec==False):
                out.release()
                          
                 
    elif request.method=='GET':
        return render_template('index.html')
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
    
camera.release()
cv2.destroyAllWindows()     
