import json
import os
import time
import zipfile

import joblib
import pandas as pd
from flask import Flask
from flask_sock import Sock
from rich.progress import Progress


class Server:
    def __init__(self, host="10.181.171.195", port=5000):
        self.app = Flask(__name__)
        self.sock = Sock(self.app)
        self.host = host
        self.port = port
        self.connections = {}
        self.features = pd.read_csv(os.path.join(os.getcwd(), "features.csv"))
        self.logreg_model = joblib.load(os.path.join(os.getcwd(), "model.joblib"))
        self.setup_routes()

    def setup_routes(self):
        @self.sock.route("/")
        def websocket_connection(ws):
            print("Client connected")
            try:
                while True:
                    message = ws.receive()
                    if message:
                        command = message.split("|")
                        if command[0] == "INIT":
                            uid = command[1]
                            self.connections[uid] = ws
                            print(self.connections)
                            if "CLOUD" not in self.connections:
                                print("[-] Cloud not connected")
                                continue
                            if "WEB" not in self.connections:
                                print("[-] Web not connected")
                                continue
                            self.packet_capture(ws)
            except Exception as e:
                print(f"Client disconnected: {e}")

    def packet_capture(self, ws):
        ws = self.connections["WEB"]
        for _, row in self.features.iterrows():
            row_reshaped = pd.DataFrame([row], columns=self.features.columns)
            pred = self.logreg_model.predict(row_reshaped)

            row_dict = row.to_dict()

            if str(pred[0]) == "1":
                ws.send(json.dumps("ALERT" + json.dumps(row_dict)))
                status = ws.receive()
                if status == "yes":
                    input(f"ENTER FOR MITIGATION OF {row_dict}")
                    self.mitigate_data()
                    ws.send("OK")
                    block = ws.receive()
                    if block == "200":
                        continue
                elif status == "no":
                    print(f"[-] No Mitigation for: {row_dict}")
                    continue
            else:
                ws.send(json.dumps(row_dict))
                time.sleep(1)

    def mitigate_data(self):
        ws = self.connections["CLOUD"]
        folder = os.path.join(os.getcwd(), "DATA")
        zip_folder = os.path.join(os.getcwd(), "DATA.zip")
        with zipfile.ZipFile(zip_folder, "w", zipfile.ZIP_DEFLATED) as zipf:
            for root, _, files in os.walk(folder):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, folder)
                    zipf.write(file_path, arcname)

        ws.send(f"MITIGATE:{'DATA.zip'}")

        filepath = zip_folder
        filename = "DATA.zip"
        try:
            with open(filepath, "rb") as file:
                with Progress() as progress:
                    task = progress.add_task(
                        f"[+] Uploading {filename}", total=os.path.getsize(filepath)
                    )
                    while chunk := file.read(4096):
                        ws.send(chunk)
                        progress.update(task, advance=len(chunk))
                    ws.send(b"EOF")
                    print(f"[+] File {filename} uploaded successfully.")
        except FileNotFoundError:
            print(f"[-] File {filename} not found.")
        except Exception as e:
            print(f"[-] Error reading file {filename}: {e}")

    def run(self):
        self.app.run(host=self.host, port=self.port, debug=False)


if __name__ == "__main__":
    server = Server()
    server.run()
