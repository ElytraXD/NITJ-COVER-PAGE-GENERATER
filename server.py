import http.server
import socketserver
import webbrowser
import socket
import os
import sys
import json
import urllib.parse
from datetime import datetime

# Ensure safe UTF-8 output across all consoles/OS
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(DIRECTORY, "analytics_data.json")
DEFAULT_PASSCODE = "ohhsoualsoknowhtml"

def load_analytics_data():
    if not os.path.exists(DATA_FILE):
        return {
            "passcode": DEFAULT_PASSCODE,
            "generations": [],
            "ratings": [],
            "created_at": datetime.now().isoformat()
        }
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            if "generations" not in data:
                data["generations"] = []
            if "ratings" not in data:
                data["ratings"] = []
            if "passcode" not in data:
                data["passcode"] = DEFAULT_PASSCODE
            return data
    except Exception as e:
        print(f"[Analytics] Error reading data file: {e}")
        return {"passcode": DEFAULT_PASSCODE, "generations": [], "ratings": []}

def save_analytics_data(data):
    try:
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"[Analytics] Error saving data file: {e}")
        return False

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

    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Passcode")

    def _send_json_response(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query_params = urllib.parse.parse_qs(parsed_url.query)

        # Admin Analytics API
        if path == "/api/admin/data":
            passcode = query_params.get("passcode", [""])[0] or self.headers.get("X-Passcode", "")
            data = load_analytics_data()
            
            if passcode != data.get("passcode", DEFAULT_PASSCODE):
                self._send_json_response(401, {"success": False, "error": "Invalid passcode"})
                return

            generations = data.get("generations", [])
            ratings = data.get("ratings", [])

            # Compute stats
            total_generations = len(generations)
            unique_rolls = set(g.get("roll", "").strip().lower() for g in generations if g.get("roll"))
            unique_names = set(g.get("name", "").strip().lower() for g in generations if g.get("name"))
            unique_users = max(len(unique_rolls), len(unique_names))

            # Rating stats
            valid_ratings = [r.get("rating", 0) for r in ratings if isinstance(r.get("rating"), (int, float)) and r.get("rating") > 0]
            avg_rating = round(sum(valid_ratings) / len(valid_ratings), 1) if valid_ratings else 0.0

            # Star breakdown
            star_counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
            for r in valid_ratings:
                r_int = int(r)
                if r_int in star_counts:
                    star_counts[r_int] += 1

            # Top subject / group
            subjects = {}
            groups = {}
            for g in generations:
                sub = g.get("subject", "Unknown").strip()
                grp = g.get("group", "Unknown").strip()
                if sub: subjects[sub] = subjects.get(sub, 0) + 1
                if grp: groups[grp] = groups.get(grp, 0) + 1

            top_subject = max(subjects, key=subjects.get) if subjects else "N/A"
            top_group = max(groups, key=groups.get) if groups else "N/A"

            # Attach matched rating info to generations for easier display
            rating_map = {r.get("roll", "").strip().lower(): r for r in ratings if r.get("roll")}

            enriched_generations = []
            for g in reversed(generations): # latest first
                roll_key = g.get("roll", "").strip().lower()
                matched_rating = rating_map.get(roll_key)
                g_copy = dict(g)
                if matched_rating:
                    g_copy["rating"] = matched_rating.get("rating")
                    g_copy["comment"] = matched_rating.get("comment", "")
                    g_copy["tags"] = matched_rating.get("tags", [])
                enriched_generations.append(g_copy)

            self._send_json_response(200, {
                "success": True,
                "stats": {
                    "total_generations": total_generations,
                    "unique_users": unique_users,
                    "avg_rating": avg_rating,
                    "total_ratings": len(valid_ratings),
                    "star_counts": star_counts,
                    "top_subject": top_subject,
                    "top_group": top_group
                },
                "generations": enriched_generations,
                "ratings": list(reversed(ratings))
            })
            return

        # Fallback to normal static file handler
        return super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        content_length = int(self.headers.get("Content-Length", 0))
        post_body = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"

        try:
            payload = json.loads(post_body)
        except Exception:
            payload = {}

        # 1. Track generation / usage
        if path == "/api/track":
            name = payload.get("name", "").strip()
            roll = payload.get("roll", "").strip()

            if not name and not roll:
                self._send_json_response(400, {"success": False, "error": "Name or roll number required"})
                return

            client_ip = self.client_address[0]
            user_agent = self.headers.get("User-Agent", "Unknown")

            entry = {
                "id": payload.get("id") or f"gen_{int(datetime.now().timestamp()*1000)}",
                "name": name,
                "roll": roll,
                "group": payload.get("group", "G1"),
                "subject": payload.get("subject", ""),
                "teacher": payload.get("teacher", ""),
                "degree": payload.get("degree", ""),
                "semester": payload.get("semester", ""),
                "index_pages": payload.get("index_pages", 3),
                "timestamp": payload.get("timestamp") or datetime.now().isoformat(),
                "ip": client_ip,
                "device": payload.get("device", user_agent)
            }

            data = load_analytics_data()
            data["generations"].append(entry)
            save_analytics_data(data)

            try:
                print(f"[Analytics] [Cover Generated] Name: {name} | Roll: {roll} | Group: {entry['group']}")
            except Exception:
                pass
            self._send_json_response(200, {"success": True, "message": "Usage logged successfully", "id": entry["id"]})
            return

        # 2. Submit Rating & Feedback
        elif path == "/api/rate":
            rating_val = payload.get("rating")
            if not rating_val or rating_val < 1:
                self._send_json_response(400, {"success": False, "error": "Valid rating is required"})
                return

            name = payload.get("name", "").strip()
            roll = payload.get("roll", "").strip()

            rating_entry = {
                "id": payload.get("id") or f"rate_{int(datetime.now().timestamp()*1000)}",
                "name": name,
                "roll": roll,
                "rating": int(rating_val),
                "comment": payload.get("comment", "").strip(),
                "tags": payload.get("tags", []),
                "timestamp": payload.get("timestamp") or datetime.now().isoformat(),
                "ip": self.client_address[0]
            }

            data = load_analytics_data()
            # Update existing if same roll, or append
            existing_idx = None
            if roll:
                for idx, r in enumerate(data["ratings"]):
                    if r.get("roll", "").strip().lower() == roll.lower():
                        existing_idx = idx
                        break

            if existing_idx is not None:
                data["ratings"][existing_idx] = rating_entry
            else:
                data["ratings"].append(rating_entry)

            save_analytics_data(data)

            try:
                print(f"[Analytics] [Rating Received] {rating_val}/5 Stars from {name or 'Anonymous'} (Roll: {roll or 'N/A'}) - \"{rating_entry['comment']}\"")
            except Exception:
                pass
            self._send_json_response(200, {"success": True, "message": "Rating saved successfully"})
            return

        # 3. Clear / Reset logs (Passcode protected)
        elif path == "/api/admin/clear":
            passcode = payload.get("passcode", "") or self.headers.get("X-Passcode", "")
            data = load_analytics_data()

            if passcode != data.get("passcode", DEFAULT_PASSCODE):
                self._send_json_response(401, {"success": False, "error": "Invalid passcode"})
                return

            data["generations"] = []
            data["ratings"] = []
            save_analytics_data(data)

            try:
                print("[Analytics] [Cleared] Analytics data cleared by admin.")
            except Exception:
                pass
            self._send_json_response(200, {"success": True, "message": "All analytics logs cleared"})
            return

        # 4. Change Passcode
        elif path == "/api/admin/set-passcode":
            old_passcode = payload.get("oldPasscode", "")
            new_passcode = payload.get("newPasscode", "").strip()
            data = load_analytics_data()

            if old_passcode != data.get("passcode", DEFAULT_PASSCODE):
                self._send_json_response(401, {"success": False, "error": "Current passcode is incorrect"})
                return

            if len(new_passcode) < 3:
                self._send_json_response(400, {"success": False, "error": "Passcode must be at least 3 characters"})
                return

            data["passcode"] = new_passcode
            save_analytics_data(data)
            self._send_json_response(200, {"success": True, "message": "Passcode updated successfully"})
            return

        # Not found
        self._send_json_response(404, {"success": False, "error": "API route not found"})

def start_server():
    os.chdir(DIRECTORY)
    local_ip = get_local_ip()
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("============================================================")
        print("  NIT Jalandhar Lab Cover Page Generator Server Running!")
        print(f" Local URL:   http://localhost:{PORT}")
        print(f" Network URL: http://{local_ip}:{PORT} (share with phones on WiFi)")
        print(" Press Ctrl+C to stop.")
        print("============================================================")
        try:
            webbrowser.open(f"http://localhost:{PORT}")
        except Exception:
            pass
        httpd.serve_forever()

if __name__ == "__main__":
    start_server()
