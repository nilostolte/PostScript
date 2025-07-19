import zlib
import os

# Define the path to your compressed file
compressed_file_path = "data"

# Define the path for the decompressed output file
# The original PDF dictionary said it's Subtype /Type1C,
# so saving it as .cff (Compact Font Format) is appropriate.
decompressed_file_path = "decompressed_font.cff"

try:
    # 1. Read the compressed binary data
    with open(compressed_file_path, "rb") as f:
        compressed_data = f.read()

    # 2. Decompress the data using zlib (FlateDecode)
    # Note: Sometimes a PDF stream might be raw DEFLATE without zlib headers.
    # If zlib.decompress(compressed_data) fails, try zlib.decompress(compressed_data, wbits=-zlib.MAX_WBITS)
    # However, for typical PDFs, the standard zlib.decompress usually works.
    decompressed_data = zlib.decompress(compressed_data)

    # 3. Save the decompressed data to a new file
    with open(decompressed_file_path, "wb") as f:
        f.write(decompressed_data)

    print(f"Successfully decompressed '{compressed_file_path}' to '{decompressed_file_path}'.")
    print(f"Decompressed file size: {os.path.getsize(decompressed_file_path)} bytes.")

except zlib.error as e:
    print(f"Decompression error: {e}")
    print("This might happen if the data is corrupted or not truly Flate-encoded,")
    print("or if it's raw DEFLATE data without zlib headers.")
    print("If so, try: decompressed_data = zlib.decompress(compressed_data, wbits=-zlib.MAX_WBITS)")
except FileNotFoundError:
    print(f"Error: The file '{compressed_file_path}' was not found.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")