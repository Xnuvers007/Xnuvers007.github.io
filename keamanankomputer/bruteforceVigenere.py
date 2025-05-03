
from itertools import product
import string

def vigenere_decrypt(ciphertext, key):
    plaintext = ''
    key = key.lower()
    key_indices = [ord(k) - ord('a') for k in key]
    key_length = len(key)
    
    i = 0
    for char in ciphertext:
        if char in string.ascii_letters:
            offset = ord('a') if char.islower() else ord('A')
            char_index = ord(char.lower()) - ord('a')
            key_index = key_indices[i % key_length]
            plain_index = (char_index - key_index + 26) % 26
            plaintext += chr(plain_index + offset)
            i += 1
        else:
            plaintext += char
    return plaintext

ciphertext = "uhqn axif".replace(" ", "").lower()
perkiraan_kunci = int(input("Masukkan panjang kunci yang diperkirakan (Default 3): "))
if not perkiraan_kunci:
    perkiraan_kunci = 3

# Semua kemungkinan kunci dari inputan jumlah yang diingkan user
for key_tuple in product(string.ascii_lowercase, repeat=perkiraan_kunci):
    key = ''.join(key_tuple)
    decrypted = vigenere_decrypt(ciphertext, key)
    print(f"Key: {key} -> Plaintext: {decrypted}")