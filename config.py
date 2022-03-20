import serial.tools.list_ports
import sys
from Adafruit_IO import MQTTClient

ADAFRUIT_IO_USERNAME = "dat_huynh"
ADAFRUIT_IO_KEY = "aio_nmMP12cvDwjXGwRSJ8uXY1HPT5DQ"
FEED_IDS = ["bbc-led", "bbc-temp", "bbc-pump", "bbc-humi-air", "bbc-humi-soil"]
PORT = "COM3"

client = MQTTClient(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)
serial_port = serial.Serial(port=PORT, baudrate=115200)

def on_connect(client):
    for feed_id in FEED_IDS:
        client.subscribe(feed_id)

def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribe successfully!")

def on_disconnect(client):
    print("Disconnected!")
    sys.exit(1)

def on_message(client, feed_id, payload):
    print("Data received from", feed_id, ":", payload)

client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message
client.on_subscribe = on_subscribe
client.connect()
client.loop_background()

def process_data(client, data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    data_id, data_name, data_value = data.split(":")
    if data_name == "TEMP":
        client.publish("bbc-temp", data_value)
    elif data_name =="LIGHT":
        client.publish("bbc-light", data_value)
    elif data_name == "HUMI_AIR":
        client.publish("bbc-humi-air", data_value)
    elif data_name == "HUMI_SOIL":
        client.publish("bbc-humi-soil", data_value)

def read_serial(serial_port):
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

def write_serial(serial_port, data):
    serial_port.write(data.encode("UTF-8"))

def open_led():
    write_serial(serial_port, "!1:LED:1")
    client.publish("bbc-led", 1)

def close_led():
    write_serial(serial_port, "!1:LED:0")
    client.publish("bbc-led", 0)

def open_pump():
    write_serial(serial_port, "!1:PUMP:1")
    client.publish("bbc-pump", 1)

def close_pump():
    write_serial(serial_port, "!1:PUMP:0")
    client.publish("bbc-pump", 0)
