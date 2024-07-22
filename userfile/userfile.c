#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define NUM_LINES 1000000

void generateRandomNumbers(int num_lines, char numbers[][8]) {
    int i, j;
    srand(time(NULL));

    for (i = 0; i < num_lines; ++i) {
        for (j = 0; j < 7; ++j) {
            numbers[i][j] = '0' + rand() % 10;
        }
        numbers[i][7] = '\0';
    }
}

void writeNumbersToCSV(char numbers[][8], int num_lines) {
    FILE *csv_file;
    char filename[] = "sayilar.csv";
    int i;

    csv_file = fopen(filename, "w");
    if (csv_file == NULL) {
        printf("Dosya acilamadi.");
        exit(1);
    }

    for (i = 0; i < num_lines; ++i) {
        fprintf(csv_file, "%s\n", numbers[i]);
    }

    fclose(csv_file);
    printf("%d adet 7 basamakli sayi '%s' dosyasina kaydedildi.\n", num_lines, filename);
}

int main() {
    char numbers[NUM_LINES][8];
    int i;
    char folder_name[] = "userfile";
    char path[50];
    FILE *file;
    
    generateRandomNumbers(NUM_LINES, numbers);
    writeNumbersToCSV(numbers, NUM_LINES);

    if (remove(folder_name) == 0) {
        printf("'%s' klasoru silindi.\n", folder_name);
    }

    if (mkdir(folder_name) != 0) {
        printf("'%s' klasoru olusturulamadi.\n", folder_name);
        exit(1);
    }
    printf("'%s' klasoru olusturuldu.\n", folder_name);

    for (i = 0; i < NUM_LINES; ++i) {
        sprintf(path, "%s/%c/%c/%c", folder_name, numbers[i][0], numbers[i][1], numbers[i][2]);
        mkdir(path);
        strcat(path, "/userfile.txt");
        file = fopen(path, "a");
        fprintf(file, "%s\n", numbers[i]);
        fclose(file);
    }

    // Dosya boyutu kontrolü
    int total_txt_size = 0;
    FILE *txt_file;
    for (i = 0; i < NUM_LINES; ++i) {
        sprintf(path, "%s/%c/%c/%c/userfile.txt", folder_name, numbers[i][0], numbers[i][1], numbers[i][2]);
        txt_file = fopen(path, "r");
        fseek(txt_file, 0, SEEK_END);
        total_txt_size += ftell(txt_file);
        fclose(txt_file);
    }

    FILE *csv_file = fopen("sayilar.csv", "r");
    fseek(csv_file, 0, SEEK_END);
    int total_csv_size = ftell(csv_file);
    fclose(csv_file);

    if (total_csv_size != total_txt_size) {
        printf("CSV dosyasinin boyutu %d byte ile userfile.txt'lerin boyutu %d byte esit degildir.\n", total_csv_size, total_txt_size);
    } else {
        printf("CSV dosyasinin boyutu %d byte ile userfile.txt'lerin boyutu %d byte esittir.\n", total_csv_size, total_txt_size);
    }

    printf("%d adet 7 basamakli sayi, kurallara uygun olarak klasorlere yerlestirildi.\n", NUM_LINES);

    // Input alma kısmı
    char user_input[8];
    printf("Bir 7 basamakli sayi girin: ");
    scanf("%s", user_input);

    sprintf(path, "%s/%c/%c/%c/userfile.txt", folder_name, user_input[0], user_input[1], user_input[2]);
    file = fopen(path, "r");
    if (file) {
        char line[8];
        int found = 0;
        while (fgets(line, sizeof(line), file)) {
            if (strncmp(line, user_input, 7) == 0) {
                found = 1;
                break;
            }
        }
        fclose(file);
        if (found) {
            printf("Hosgeldiniz\n");
        } else {
            printf("Bu numara yok\n");
        }
    } else {
        printf("Bu numara yok\n");
    }

    return 0;
}
