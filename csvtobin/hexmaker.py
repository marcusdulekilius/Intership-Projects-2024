import csv
import random

csv_file = 'hex_data.csv'

num_lines = 1000000

def generate_row():
    return [format(random.randint(20, 127), '02x') for _ in range(7)]  # 0-255 arası rastgele hex değerleri üret

# CSV 
with open(csv_file, mode='w', newline='') as file:
    writer = csv.writer(file)

    for _ in range(num_lines):
        row = generate_row()  # Her satırda 7 adet 
        writer.writerow(row)

print(f'{num_lines} satır boyunca hex verileri başarıyla oluşturuldu ve {csv_file} dosyasına kaydedildi.')
