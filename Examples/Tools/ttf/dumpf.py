import os
import io
import subprocess # For calling external ttx command

from fontTools.ttLib import TTFont

# Import the specific CFF table class for explicit instantiation
# This is where we've had ModuleNotFoundError before, but it's crucial.
try:
    from fontTools.ttLib.tables._c_f_f_ import table_C_F_F_
except ImportError:
    print("Error: Could not import 'table_C_F_F_'. Your fontTools version might be incompatible.")
    print("Please ensure you have a recent, stable version of fontTools installed (e.g., pip install --upgrade fonttools).")
    exit(1)


# --- Configuration ---
input_cff_path = "decompressed_font.cff"
temp_wrapped_otf_path = "temp_wrapped_font.otf" # Temporary file to hold the wrapped CFF
output_xml_path = "cff_dump.xml"

# --- Script Logic ---
try:
    if not os.path.exists(input_cff_path):
        print(f"Error: Input file '{input_cff_path}' not found.")
        print("Please ensure the decompressed CFF file is in the same directory as this script,")
        print("or provide its full path.")
        exit(1) # Exit if file not found

    # 1. Read the raw CFF data
    with open(input_cff_path, "rb") as f:
        raw_cff_data = f.read()

    # 2. Create a dummy TTFont object (representing an OpenType font structure)
    ttfont = TTFont()
    # Set the sfntVersion to 'OTTO' for CFF-based OpenType fonts
    ttfont.sfntVersion = "OTTO"

    # 3. Create an instance of the CFF table and assign the raw CFF data
    cff_table = table_C_F_F_()
    # The 'cff' attribute of the CFF table object expects the raw CFF bytes.
    cff_table.cff = raw_cff_data

    # 4. Add the CFF table to our dummy TTFont
    ttfont['CFF '] = cff_table # Note the space in 'CFF ' - this is the standard tag

    # 5. Add other minimal required tables for a valid OpenType font file to avoid save errors
    if 'maxp' not in ttfont:
        ttfont['maxp'] = ttfont.newTable('maxp')
        # We need to decompile the cff_table.cff to get the fontset and its length
        from fontTools.cffLib import CFFFontSet
        temp_cff_font_set = CFFFontSet()
        temp_cff_font_set.decompile(io.BytesIO(raw_cff_data), {})
        ttfont['maxp'].numGlyphs = len(temp_cff_font_set.fonts[0].CharStrings) if temp_cff_font_set.fonts else 0
        ttfont['maxp'].tableVersion = 0x00010000 # Version 1.0 for OpenType
        ttfont['maxp'].maxZones = 1
        ttfont['maxp'].maxTwilightPoints = 0
        ttfont['maxp'].maxStorage = 0
        ttfont['maxp'].maxFunctionDefs = 0
        ttfont['maxp'].maxInstructionDefs = 0
        ttfont['maxp'].maxStackElements = 0
        ttfont['maxp'].maxSizeOfInstructions = 0
        ttfont['maxp'].maxComponentElements = 0
        ttfont['maxp'].maxComponentDepth = 0

    if 'post' not in ttfont:
        ttfont['post'] = ttfont.newTable('post')
        ttfont['post'].formatType = 2.0 # Standard format for CFF-based fonts
        ttfont['post'].italicAngle = 0.0
        ttfont['post'].underlinePosition = -100
        ttfont['post'].underlineThickness = 50
        ttfont['post'].isFixedPitch = 0
        ttfont['post'].minMemType42 = 0
        ttfont['post'].maxMemType42 = 0
        ttfont['post'].minMemType1 = 0
        ttfont['post'].maxMemType1 = 0
        ttfont['post'].names = []

    if 'cmap' not in ttfont:
        ttfont['cmap'] = ttfont.newTable('cmap')
        ttfont['cmap'].tableVersion = 0
        ttfont['cmap'].numTables = 0
        ttfont['cmap'].tables = []

    if 'name' not in ttfont:
        ttfont['name'] = ttfont.newTable('name')
        ttfont['name'].names = []


    # 6. Save the dummy TTFont to a temporary OTF file
    ttfont.save(temp_wrapped_otf_path)

    print(f"Successfully created temporary wrapped font: '{temp_wrapped_otf_path}'")

    # 7. Call the 'ttx' command-line tool using subprocess
    cmd = ["py", "-m", "fontTools.ttx", temp_wrapped_otf_path, "-o", output_xml_path]
    print(f"Running command: {' '.join(cmd)}")

    result = subprocess.run(cmd, capture_output=True, text=True, check=False)

    if result.returncode != 0:
        print(f"\nError running ttx command (exit code {result.returncode}):")
        print(f"--- TTX STDOUT ---\n{result.stdout}")
        print(f"--- TTX STDERR ---\n{result.stderr}")
        raise RuntimeError(f"ttx command failed. See output above.")

    print(f"Successfully dumped wrapped font to XML: '{output_xml_path}'.")
    print("You can open this XML file in any text editor to examine its contents.")
    print("Look for the '<CFF >' table section for the font and glyph definitions.")

except Exception as e:
    print(f"An error occurred: {e}")
    print("Please double-check your fontTools installation and the input CFF file.")
    import traceback; traceback.print_exc()

finally:
    # 8. Clean up the temporary file
    if os.path.exists(temp_wrapped_otf_path):
        try:
            os.remove(temp_wrapped_otf_path)
            print(f"Cleaned up temporary file: '{temp_wrapped_otf_path}'")
        except OSError as e:
            print(f"Error removing temporary file {temp_wrapped_otf_path}: {e}")