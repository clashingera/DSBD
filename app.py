from flask import Flask, render_template, jsonify, request
import pandas as pd

app = Flask(__name__)

# Load the CSV file
df = pd.read_csv("abc.csv")

# Route for serving the HTML template
@app.route('/')
def home():
    return render_template('index.html')

# Route for serving static files (CSS and JavaScript)
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

# Route for fetching state names
@app.route('/states')
def get_states():
    states = df['STATE_And_UNION_TERRITORY'].unique().tolist()
    return jsonify(states)

# Route for fetching vaccine data for a specific state
@app.route('/state_data')
def get_state_data():
    state = request.args.get('state')
    state_data = df[df['STATE_And_UNION_TERRITORY'] == state].to_dict('records')
    print(state_data)
    return jsonify(state_data)



 

 

























# FAQ`S
@app.route('/describe')
def describe():
    return df.describe().to_html()

@app.route('/first_dose_by_state')
def first_dose_by_state():
    return df.groupby('STATE_And_UNION_TERRITORY')['DOSE1'].sum().reset_index().to_html()

@app.route('/second_dose_by_state')
def second_dose_by_state():
    return df.groupby('STATE_And_UNION_TERRITORY')['DOSE2'].sum().reset_index().to_html()

@app.route('/males_vaccinated')
def males_vaccinated():
    return str(df['Males_Vaccinated'].sum())

@app.route('/females_vaccinated')
def females_vaccinated():
    return str(df['Females_Vaccinated'].sum())

if __name__ == '__main__':
    app.run(debug=True)
