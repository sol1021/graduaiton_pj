import React from 'react';

const Cam=() => {
  return (
    <div>
      <h1>Main Page</h1>
      <form method="post" action="/main">
        <input type="submit" value="Stop/Start" name="stop" />
        <input type="submit" value="emotion" name="face" />
			  <input type="submit" value="Start/Stop Recording" name="rec" />
			  </form>
        <script type="text/javascript" src="{{ url_for('static', filename='recorder.js') }}"></script>      
      <img
    src="http://localhost:5000/video_feed"
    alt="Video"
   />
    </div>
  );
};

export default Cam;