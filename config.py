import serial.tools.list_ports
import sys
from Adafruit_IO import MQTTClient

ADAFRUIT_IO_USERNAME = "dat_huynh"
ADAFRUIT_IO_KEY = "aio_OXtD13SoCstFQ0BWCSM17wriOj8J"
FEED_IDS = ["bbc-led", "bbc-temp", "bbc-pump", "bbc-humi-air", "bbc-humi-soil"]
PORT = "COM3"
def get_serial_port():
    import serial.tools.list_ports
    port_list = serial.tools.list_ports.comports()
    for port in port_list:
        port_string = str(port)
        if "USB Serial Device" in port_string:
            return port_string.split(" ")[0]
    return None
input_port = get_serial_port()
if input_port: PORT = input_port
print("Get default port: ", PORT)
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
    #write_serial(serial_port, feed_id + " " + payload + "\n")
    payload = "on" if payload != "0" else "off"
    if feed_id == "bbc-led": write_serial(serial_port, "led_" + payload + "#")
    elif feed_id == "bbc-pump": write_serial(serial_port, "pump_" + payload + "#")
  
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
        print("Serial data:", message)
        while "#" in message and "!" in message:
            start = message.find("!")
            end = message.find("#")
            process_data(client, message[start: end + 1])
            message = "" if end == len(message) - 1 else message[end + 1:]


def write_serial(serial_port, data):
    serial_port.write(data.encode("UTF-8"))
