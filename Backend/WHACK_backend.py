import requests
from wenyepython import main
import PyPDF2
import io
from flask import Flask, request, send_file, render_template_string, jsonify
import random

app = Flask(__name__)

@app.route('/simulate', methods=['GET'])
def simulate():
    savings = float(request.args.get('savings',1000))
    debt = float(request.args.get('debt',1000))
    savings_rate = float(request.args.get('savings_rate',5))
    debt_rate = float(request.args.get('debt_rate',20))
    months = int(request.args.get('months',24))
    min_payment_rate = float(request.args.get('min_payment_rate',2))
    extra_debt_payment = float(request.args.get('extra_debt_payment',0))
    extra_savings = float(request.args.get('extra_savings',0))

    savings_monthly_rate = savings_rate / 12 / 100
    debt_monthly_rate = debt_rate / 12 / 100
    savings_history = []
    debt_history = []
    payments_history = []

    for month in range(1, months+1):
        savings += savings * savings_monthly_rate + extra_savings
        savings_history.append(round(savings, 2))

        total_payment = 0
        if debt > 0:
            debt += debt * debt_monthly_rate
            min_payment = debt * (min_payment_rate / 100)
            total_payment = min_payment + extra_debt_payment

            if total_payment > debt:
                total_payment = debt
            debt -= total_payment
        debt_history.append(round(debt, 2))
        payments_history.append(round(total_payment, 2))

    return jsonify({
        "months":[f"Month {i}" for i in range(1, months + 1)],
        "savings": savings_history,
        "debt": debt_history,
        "monthly_payments": payments_history,
        "final_savings": round(savings, 2),
        "final_debt": round(debt, 2)
    })


@app.route('/')
def index():
    return send_file('index.html')

@app.route('/data')
def data():
    chart_data_no_debt = {
        "labels": names,
        "values": percents
    }
    return jsonify(chart_data_no_debt)


if __name__ == "__main__":
    app.run(debug=True)
    names, percents = main.main()
