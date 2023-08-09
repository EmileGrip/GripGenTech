import json

def get_largest_line_length(file_path):
    largest_length = 0

    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
        for row in data:
            line_length = len(row)
            if line_length > largest_length:
                largest_length = line_length

    return largest_length

# Example usage
file_path = '/home/gemy/Downloads/records.json'
largest_length = get_largest_line_length(file_path)
print(f"Largest line length: {largest_length}")
