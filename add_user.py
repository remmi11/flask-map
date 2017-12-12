# #############################
# Insert New User Cruedentials
# #############################

import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from tabledef import *
 
engine = create_engine(connString, echo=True)
 
# create a Session
Session = sessionmaker(bind=engine)
session = Session()

user = User("nhuntington","gdipass2017")
session.add(user)

user = User("smunger","gdipass1")
session.add(user)

user = User("hharriman","gdipass2")
session.add(user)

# commit the record the database
session.commit()