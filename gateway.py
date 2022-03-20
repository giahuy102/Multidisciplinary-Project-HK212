import serial.tools.list_ports
from Adafruit_IO import MQTTClient
ADAFRUIT_FEED_ID = "bbc-led"
ADAFRUIT_IO_USERNAME = "dat_huynh"
ADAFRUIT_IO_KEY = "aio_nmMP12cvDwjXGwRSJ8uXY1HPT5DQ"

def on_connect(client):
    print("Connected!")
    client.subscribe(ADAFRUIT_FEED_ID)

def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribe successfully!")

def on_disconnect(client):
    print("Disconnected!")

def on_message(client, feed_id, payload):
    print("Data received:", payload)

client = MQTTClient(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)
client.on_connect = on_connect;
client.on_disconnect = on_disconnect
client.on_message = on_message
client.on_subscribe = on_subscribe


client.connect()
client.loop_background()
while True:
    import random, time
    value = random.randint(0, 100)
    print(value)
    client.publish("bbc-temp", value)
    time.sleep(1)
