import csv

# ASCII'ye dönüştürme fonksiyonu
def hex_to_ascii(hex_string):
    try:
        return bytes.fromhex(hex_string).decode('ascii')
    except ValueError:
        return ''  # Geçersiz hex dizisi için boş bir string döndür

# Giriş ve çıkış dosya adları
csv_file = 'hex_data.csv'
bin_file = 'ascii_data.bin'

# CSV dosyasından okuyup binary dosyaya yazma
with open(csv_file, mode='r', newline='') as file_in, open(bin_file, mode='wb') as file_out:
    reader = csv.reader(file_in)
    
    for row in reader:
        ascii_row = ''.join([hex_to_ascii(hex_str) for hex_str in row])
        file_out.write(ascii_row.encode('utf-8') + b'\n')

print(f'Hex verileri ASCII\'ye dönüştürülerek {bin_file} dosyasına başarıyla kaydedildi.')
