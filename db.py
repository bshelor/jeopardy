from flask import g
import psycopg2
import psycopg2.extras

# Database tools
data_source_name = "host=localhost port=5434 dbname=jeopardy user=postgres password=@QhsTu19"

####OPEN AND CLOSE DATABASE####
def connect():
    '''
    Open a connection to the database.
    Will open a connection to the data_source_name path.
    Stores resulting connection in g
    :return:'''
    g.connection = psycopg2.connect(data_source_name)
    g.cursor = g.connection.cursor(cursor_factory=psycopg2.extras.DictCursor)


def disconnect():
    '''
    Closes connection to database.

    Properly discards all tools used.
    :return:
    '''

    g.cursor.close()
    g.connection.close()

def get_all_users():
    query = '''
    SELECT * FROM "user"'''

    g.cursor.execute(query)
    return g.cursor.fetchall()