import http.server
import socketserver
import webbrowser
import socket
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    os.chdir(DIRECTORY)
    local_ip = get_local_ip()
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"============================================================")
        print(f" 🎓 NIT Jalandhar Lab Cover Page Generator Server Running!")
        print(f" Local URL:   http://localhost:{PORT}")
        print(f" Network URL: http://{local_ip}:{PORT} (share with phones on same WiFi)")
        print(f" Press Ctrl+C to stop.")
        print(f"============================================================")
        try:
            webbrowser.open(f"http://localhost:{PORT}")
        except Exception:
            pass
        httpd.serve_forever()

if __name__ == "__main__":
    start_server()
