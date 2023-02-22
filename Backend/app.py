from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_caching import Cache
import requests
import subprocess
import re

app = Flask(__name__)
CORS(app, supports_credentials=True)
cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})


@app.route("/", methods=["GET"])
def index():
    return "Hello World!"


@cache.memoize(timeout=60 * 5)
def check_uptime(data: dict) -> dict:
    uptime_api = "https://api.uptimerobot.com/v2/getMonitors"
    try:
        resp = requests.post(uptime_api, data=data)
        if resp.status_code == 200:
            resp_data = resp.json()
            resp_data["x-stat"] = "0"
            resp_data["x-message"] = "ok"
            return resp_data
        else:
            return {
                "x-stat": "1",
                "x-message": "request failed"
            }
    except Exception as e:
        return {
            "x-stat": "1",
            "x-message": str(e)
        }


@app.route("/uptime", methods=["POST"])
def uptime():
    data = request.get_json()
    if data is None:
        return jsonify({
            "x-stat": "1",
            "x-message": "data is required"
        }), 400
    result = check_uptime(data)
    if result["x-stat"] == "0":
        return jsonify(result), 200
    else:
        return jsonify(result), 500


@cache.memoize(timeout=60 * 60 * 24)
def check_cert(domain: str) -> dict:
    try:
        command = f"curl -Ivs {domain} --connect-timeout 5"
        output = subprocess.getstatusoutput(command)[1]
        subject = re.search(r"subject: (.*)", output).group(1)
        start = re.search(r"start date: (.*)", output).group(1)
        expire = re.search(r"expire date: (.*)", output).group(1)
        subjectAltName = re.search(r"subjectAltName: (.*)", output).group(1)
        issuer = re.search(r"issuer: (.*)", output).group(1)
        return {
            "status": 0,
            "message": "ok",
            "subject": subject,
            "start date": start,
            "expire date": expire,
            "subjectAltName": subjectAltName,
            "issuer": issuer
        }
    except Exception as e:
        return {
            "status": 1,
            "message": str(e),
        }


@app.route("/cert", methods=["GET"])
def cert():
    domain = request.args.get("domain")
    if domain is None:
        return jsonify({
            "status": 1,
            "message": "domain is required"
        }), 400
    if not re.match(r"https://", str(domain)):
        domain = "https://" + domain
    result = check_cert(domain)
    if result["status"] == 0:
        return jsonify(result), 200
    else:
        return jsonify(result), 500


if __name__ == "__main__":
    app.run()
