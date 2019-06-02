

import sqlalchemy


from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
#pip install Flask-MySQLdb
import json


from config import password



app = Flask(__name__)

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = password
app.config['MYSQL_DB'] = 'doggy_db'

mysql = MySQL(app)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")
    
@app.route("/sunburst")
def sunburst():
    """Return Sunburst Page"""
    return render_template("sunburst.html")

@app.route("/dogdata")
def dog_data():
    """Return the Breed Data."""
    cur=mysql.connection.cursor()
    cur.execute('SELECT * FROM doggy_data')
    row_headers = [x[0] for x in cur.description]
    rv=cur.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    return jsonify(json_data)


if __name__ == "__main__":
    app.run()
