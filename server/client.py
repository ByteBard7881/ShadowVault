import asyncio
import os

import websockets


class Client:
    def __init__(self, url):
        self.url = url
        self.ID = "CLOUD"
        self.cwd = os.getcwd()
        self.folder = os.path.join(os.getcwd(), "MITIGATION")
        if not os.path.exists(self.folder):
            os.makedirs(self.folder, exist_ok=True)

    async def connect(self):
        while True:
            try:
                async with websockets.connect(self.url) as websocket:
                    await websocket.send(f"INIT|{self.ID}")
                    while True:
                        message = await websocket.recv()

                        if message.startswith("MITIGATE"):
                            filepath = os.path.join(
                                self.folder, f"uploaded_{message.split(':')[1]}"
                            )

                        try:
                            with open(filepath, "wb") as file:
                                while True:
                                    chunk = await websocket.recv()
                                    if chunk == b"EOF":
                                        break
                                    file.write(chunk)

                            print("[+] Mitigation Successfull")

                        except Exception as e:
                            print("[-] " + e)
                            return
                        continue
                # break

            except (websockets.ConnectionClosedError, websockets.ConnectionClosedOK):
                await asyncio.sleep(2)
                break
            except Exception as e:
                print("[-] " + e)
                await asyncio.sleep(2)
                break


if __name__ == "__main__":
    url = "ws://10.181.171.195:5000/"
    client = Client(url)
    asyncio.run(client.connect())
