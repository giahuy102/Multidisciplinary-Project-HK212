import time
from config import *

client = MQTTClient(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message
client.on_subscribe = on_subscribe
client.connect()
client.loop_background()

serial_port = serial.Serial(port="COM3", baudrate=115200)
while True:
    read_serial(client, serial_port)
    time.sleep(1)