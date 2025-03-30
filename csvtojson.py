import pandas as pd


df = pd.read_csv('./players.csv')

json_str = df.to_json()


with open("players.json", 'w') as file:
    file.write(json_str)


