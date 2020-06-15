import os
import numpy as np

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import Column, Integer, String, Float

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    send_from_directory)

from flask_cors import CORS 

app = Flask(__name__)
CORS(app)


SQLITE = "sqlite:///" + os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'zipcode_db.sqlite')
print(SQLITE)

engine = create_engine(SQLITE)
Base.metadata.create_all(engine)
session = Session(bind=engine)

class Zipcode(Base):
    __tablename__ = 'zipcode'
    zip = Column(Integer, primary_key = True)
    latitude = Column(Float)
    longitude = Column(Float)

app = Flask(__name__)


@app.route('/')
def welcome():
    return (
        f"<h2>Welcome to the Directory</h2>"
        f"Here are the available routes:<br/>"
        f"<a href = '/zipcodes' target='_blank'>/zipcodes</a><br/>"
        f"<a href = '/hike' target='_blank'>/hike</a><br/>"
    )

@app.route('/hike')
def dashboard():
    return render_template('/index.html')

@app.route('/zipcodes')
def zipcode():
    session = Session(engine)

    results = session.query(Zipcode.zip, Zipcode.latitude, Zipcode.longitude).all()

    session.close()

    all_zipcodes = []
    for zip, latitude, longitude  in results:
        zipcode_dict = {}
        zipcode_dict['zip'] = zip
        zipcode_dict['lat'] = latitude
        zipcode_dict['lon'] = longitude
        all_zipcodes.append(zipcode_dict)
        
    return jsonify(all_zipcodes)

#@app.route('/favicon.ico')
#def favicon():
    #return send_from_directory(os.path.join(app.root_path, 'static'),
                               #'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run(debug=True, threaded = True, host='localhost', port = 5444)

#if __name__ =='__main__':
    #app.run(threaded=True, host='0.0.0.0', port=os.environ['PORT'])