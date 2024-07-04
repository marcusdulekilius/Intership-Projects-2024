import csv
import random

# CSV dosyası adı
csv_file = 'hex_data.csv'

# Kaç satır oluşturulacak
num_lines = 1000000

# Fonksiyon: Rastgele 7 adet hex sayı oluştur
def generate_row():
    return [format(random.randint(20, 127), '02x') for _ in range(7)]  # 0-255 arası rastgele hex değerleri üret

# CSV dosyasını aç ve yazma modunda oluştur
with open(csv_file, mode='w', newline='') as file:
    writer = csv.writer(file)

    # Belirtilen sayıda satır oluştur ve dosyaya yaz
    for _ in range(num_lines):
        row = generate_row()  # Her satırda 7 adet rastgele hex sayı
        writer.writerow(row)

print(f'{num_lines} satır boyunca hex verileri başarıyla oluşturuldu ve {csv_file} dosyasına kaydedildi.')
