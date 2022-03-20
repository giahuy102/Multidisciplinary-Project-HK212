import serial.tools.list_ports
import sys
from Adafruit_IO import MQTTClient

ADAFRUIT_IO_USERNAME = "dat_huynh"
ADAFRUIT_IO_KEY = "aio_nmMP12cvDwjXGwRSJ8uXY1HPT5DQ"
FEED_IDS = ["bbc-led", "bbc-temp"]

def on_connect(client):
    for feed_id in FEED_IDS:
        client.subscribe(feed_id)

def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribe successfully!")

def on_disconnect(client):
    print("Disconnected!")
    sys.exit(1)

def on_message(client, feed_id, payload):
    print("Data received:", payload)

def process_data(client, data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    data_id, data_name, data_value = data.split(":")
    if (data_name == "TEMP"):
        client.publish("bbc-temp", data_value)

def read_serial(client, serial_port):
    message = ""
    bytes_to_read = serial_port.inWaiting()
    if (bytes_to_read > 0):
        message += serial_port.read(bytes_to_read).decode("UTF-8")
        while "#" in message and "!" in message:
            start = message.find("!")
            end = message.find("#")
            print("Serial data:", message)
            process_data(client, message[start: end + 1])
            message = "" if end == len(message) - 1 else message[end + 1:]

