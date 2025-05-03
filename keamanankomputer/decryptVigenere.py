
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

# ciphertext = "age nkjw".replace(" ", "").lower()
ciphertext = input("Masukan Kata: ").lower()

key = input("Masukkan key untuk dekripsi: ").strip().lower()

decrypted = vigenere_decrypt(ciphertext, key)

print(f"Key: {key} -> Plaintext: {decrypted}")
