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
filename = 'sayılar.csv'
with open(filename, 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerows([[number] for number in data])

print(f"{num_lines} adet 7 basamaklı sayı '{filename}' dosyasına kaydedildi.")

with open(filename, 'r', newline='') as csvfile:
    csvreader = csv.reader(csvfile)
    data = [row[0] for row in csvreader]

# Varsa silme
folder_name = 'userfile'
if os.path.exists(folder_name):
    shutil.rmtree(folder_name)
    print(f"'{folder_name}' klasörü silindi.")

os.makedirs(folder_name)
print(f"'{folder_name}' klasörü oluşturuldu.")

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
    print(f"CSV dosyasının boyutu {total_csv_size} byte ile userfile.txt'lerin boyutu {total_txt_size} byte eşit değildir.")
    
if total_csv_size == total_txt_size:
            print(f"CSV dosyasının boyutu {total_csv_size} byte ile userfile.txt'lerin boyutu {total_txt_size} byte eşittir.")

print(f"{len(data)} adet 7 basamaklı sayı, kurallara uygun olarak klasörlere yerleştirildi.")

user_input = input("Bir 7 basamaklı sayı girin: ")

found = False
for root, _, files in os.walk(folder_name):
    for file_name in files:
        if file_name == 'userfile.txt':
            file_path = os.path.join(root, file_name)
            with open(file_path, 'r') as file:
                if user_input in file.read().splitlines():
                    found = True
                    break
    if found:
        break

if found:
    print("Hoşgeldiniz")
else:
    print("Bu numara yok")