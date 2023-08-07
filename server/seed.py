#!/usr/bin/env python3

import csv
from models import db, User, Hike, Trail
from app import app
filepath = 'trails.csv'

def clear_database():
    with app.app_context():
        print('Deleting users...')
        User.query.delete()
        Trail.query.delete()
        db.session.commit()

def create_trails(rows):
    with app.app_context():
        trails = []
        for i in range(1,len(rows)):
            trail = Trail(
                name = rows[i][0],
                location = rows[i][1],
                park = rows[i][2]
            )
            trails.append(trail)
        db.session.add_all(trails)
        db.session.commit()
    return trails

if __name__ == "__main__":
    print('Clearing trails database...')
    clear_database()
    print('Creating trails...')
    with open(f'{filepath}', newline='', encoding='utf-8') as csvfile:
            #csv to rows
        rows = [row for row in csv.reader(csvfile, delimiter=',', quotechar='"')]
            #rows to db
        create_trails(rows)
    print('Happy trails!')

    