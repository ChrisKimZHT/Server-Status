from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_caching import Cache
import requests
import subprocess
import re
import configs

app = Flask(__name__)
CORS(app, supports_credentials=True)
if configs.ENABLE_CACHE:
    cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})
else:
    cache = Cache(app, config={'CACHE_TYPE': 'NullCache'})


@app.route("/", methods=["GET", "POST"])
def index():
    return "Hello World!"


@cache.memoize(timeout=configs.UPTIME_CACHE_TIMEOUT)
def check_uptime(data: dict) -> dict:
    try:
        resp = requests.post(configs.UPTIMEROBOT_API, data=data)
        if resp.status_code == 200:
            resp_data = resp.json()
            resp_data["backend-status"] = "0"
            resp_data["backend-message"] = "ok"
            return resp_data
        else:
            return {
                "backend-status": "1",
                "backend-message": "request failed"
            }
    except Exception as e:
        return {
            "backend-status": "1",
            "backend-message": str(e)
        }


@app.route("/uptime", methods=["GET", "POST"])
def uptime():
    if request.method == "GET":
        data = request.args
    else:
        data = request.get_json()
    if data is None:
        return jsonify({
            "backend-status": "1",
            "backend-message": "data is required"
        }), 400
    result = check_uptime(data)
    if result["backend-status"] == "0":
        return jsonify(result), 200
    else:
        return jsonify(result), 500


@cache.memoize(timeout=configs.CERT_CACHE_TIMEOUT)
def check_cert(domain: str) -> dict:
    try:
        command = f"{configs.CURL_BIN} -Ivs {domain} --connect-timeout 5"
        output = subprocess.getstatusoutput(command)[1]
        subject = re.search(r"subject: (.*)", output).group(1)
        start = re.search(r"start date: (.*)", output).group(1)
        expire = re.search(r"expire date: (.*)", output).group(1)
        issuer = re.search(r"issuer: (.*)", output).group(1)
        return {
            "backend-status": 0,
            "backend-message": "ok",
            "subject": subject,
            "start date": start,
            "expire date": expire,
            "issuer": issuer
        }
    except Exception as e:
        return {
            "backend-status": 1,
            "backend-message": str(e),
        }


@app.route("/cert", methods=["GET", "POST"])
def cert():
    if request.method == "GET":
        domain = request.args.get("domain")
    else:
        domain = request.get_json().get("domain")
    if domain is None:
        return jsonify({
            "backend-status": 1,
            "backend-message": "domain is required"
        }), 400
    if not re.match(r"https://", str(domain)):
        domain = "https://" + domain
    result = check_cert(domain)
    if result["backend-status"] == 0:
        return jsonify(result), 200
    else:
        return jsonify(result), 500


if __name__ == "__main__":
    app.run()
