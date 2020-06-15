# import numpy as np
import os
import numpy as np 
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
# Base = declarative_base()
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from sqlalchemy import Column, Integer, String, Float

from flask import Flask, jsonify, request


#################################################
# Database Setup
#################################################
SQLITE = "sqlite:///" + os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'movie_db.sqlite')
print(SQLITE)
print(__file__)

engine = create_engine(SQLITE)

Base = automap_base()
Base.prepare(engine, reflect=True)

inspector=inspect(engine)
table_names=inspector.get_table_names()
print(table_names)
column_names=inspector.get_columns(table_names[0])
for each_column in column_names:
    print(each_column['name'], each_column['type'])


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/movie_data<br/>"
        f"/get_piechart_data<br/>"
        f"/get_barchart_data<br/>"
        f"/dashboard<br/>"
    )

@app.route("/movie_data")
def movie_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of movie data """
    # Query all movies
    results=engine.execute('SELECT movie_title, director_name, genres, actor_1_name, plot_keywords, language, country, title_year, imdb_score, content_rating, * FROM sqldata').fetchall()
    print(results)

    session.close()

    # # Create a dictionary from the row data and append to a list of movies
    # all_movies = []
    # for movie_title, director_name, duration, genres, actors, plot_keywords, language, country, title_year, imdb_score  in results:
    #     movies_dict = {}
    #     movies_dict["movie"] = movie_title
    #     movies_dict["director"] = director_name
    #     movies_dict["genres"] = genres
    #     movies_dict["keywords"] = plot_keywords
    #     movies_dict["language"] = language
    #     movies_dict["country"] = country
    #     movies_dict["year"] = title_year
    #     movies_dict["rating"] = imdb_score
    #     movies_dict["duration"] = duration
    #     all_movies.append(movies_dict)
    return jsonify(results)





@app.route("/pie_chart")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)


    # Query all content_rating
    # results = session.query(sqldata.content_rating).all()
    results=engine.execute('SELECT content_rating, COUNT(*) FROM sqldata GROUP BY content_rating').fetchall()
    print(results)
    result_list=[(result[0], result[1]) for result in results]
    print(result_list)
    session.close()


    return jsonify(result_list)










#################################################
# Flask Routes
#################################################

# @app.route("/movies")
# def pullAllDetail(sql, engine):
#     return engine.execute(sql)


# @app.route("/api/v1.0/names")
# def names():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(Movie.movie_title).all()

#     session.close()

#     # Convert list of tuples into normal list
#     all_movies = list(np.ravel(results))

#     return jsonify(all_movies)


# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

#     return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)