from flask import Blueprint

rider_bp = Blueprint("rider", __name__)


@rider_bp.route('/')
def main():
    return "<h1>This is the <i>/rider</i> endpoint</h1>"
    pass



@rider_bp.route('/getRider')
def get_rider():
    return "<h1>/getRider</h1>"



@rider_bp.route("/addRider")
def add_rider():
    return "<h1>Rider added</h1>"