
import re
import os

def extract_resources():
    file_path = r'assets/index-CdOcfYy_.js'
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # defined markers based on manual inspection
        start_marker = '[{title:"Codementor"'
        end_marker = 'category:"Jobs"}]'
        
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker)
        
        if start_idx == -1 or end_idx == -1:
            print(f"Could not find markers. Start: {start_idx}, End: {end_idx}")
            return

        # Extract the array string
        array_str = content[start_idx:end_idx + len(end_marker)]
        
        output_content = f"export const resources = {array_str};\n"
        
        output_path = r'src/data/resources.js'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(output_content)
            
        print(f"Successfully extracted {len(array_str)} bytes to {output_path}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_resources()
