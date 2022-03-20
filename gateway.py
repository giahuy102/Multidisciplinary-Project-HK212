import time
from config import *

while True:
    read_serial(serial_port)
    write_serial(serial_port, "Fuck you baby\n")
    time.sleep(1)