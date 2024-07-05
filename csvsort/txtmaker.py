import os
import shutil
import csv
import random

num_lines = 10**3
data = set()

while len(data) < num_lines:
    number = ''.join(random.choice('0123456789') for _ in range(7))
    data.add(number)

# CSV
filename = 'sayilar.csv'
with open(filename, 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    sorted_data = sorted(data)  # Sorting the data
    csvwriter.writerows([[number] for number in sorted_data])

print(f"{num_lines} adet 7 basamakli sayi '{filename}' dosyasina kaydedildi.")

with open(filename, 'r', newline='') as csvfile:
    csvreader = csv.reader(csvfile)
    data = [row[0] for row in csvreader]

# Varsa silme
folder_name = 'userfile'
if os.path.exists(folder_name):
    shutil.rmtree(folder_name)
    print(f"'{folder_name}' klasoru silindi.")

os.makedirs(folder_name)
print(f"'{folder_name}' klasoru olusturuldu.")

for number in data:
    path = os.path.join(folder_name, number[0], number[1], number[2])
    os.makedirs(path, exist_ok=True)
    
    # userfile.txt eklediğim kısım
    file_path = os.path.join(path, 'userfile.txt')
    with open(file_path, 'a') as file:
        file.write(number + '\n')

total_txt_size = 0
for root, _, files in os.walk(folder_name):
    for file_name in files:
        file_path = os.path.join(root, file_name)
        total_txt_size += os.path.getsize(file_path)

total_csv_size = os.path.getsize(filename)

if total_csv_size != total_txt_size:
    print(f"CSV dosyasinin boyutu {total_csv_size} byte ile userfile.txt'lerin boyutu {total_txt_size} byte esit degildir.")
    
if total_csv_size == total_txt_size:
            print(f"CSV dosyasinin boyutu {total_csv_size} byte ile userfile.txt'lerin boyutu {total_txt_size} byte esittir.")

print(f"{len(data)} adet 7 basamakli sayi, kurallara uygun olarak klasorlere yerlestirildi.")

user_input = input("Bir 7 basamakli sayi girin: ")

path_to_check = os.path.join(folder_name, user_input[0], user_input[1], user_input[2], 'userfile.txt')

if os.path.exists(path_to_check):
    with open(path_to_check, 'r') as file:
        if user_input in file.read().splitlines():
            print("Hosgeldiniz")
        else:
            print("Bu numara yok")
else:
    print("Bu numara yok")
