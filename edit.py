import json

def transform_json(data):
    transformed_data = {
        "perks": [],
        "characters": {
            "killers": [],
            "survivors": []
        }
    }

    # Transforming perks section
    for perk_key, perk_value in data.get("perks", {}).items():
        transformed_data["perks"].append({
            "id": perk_key,
            "name": perk_value.get("name"),
            "role": perk_value.get("role"),
            "image": perk_value.get("image")
        })
    
    # Transforming killers section
    for killer_key, killer_value in data.get("characters", {}).get("killers", {}).items():
        transformed_data["characters"]["killers"].append({
            "id": killer_value.get("id"),
            "name": killer_value.get("name"),
            "role": killer_value.get("role"),
            "image": killer_value.get("image")
        })
    
    # Transforming survivors section
    for survivor_key, survivor_value in data.get("characters", {}).get("survivors", {}).items():
        transformed_data["characters"]["survivors"].append({
            "id": survivor_value.get("id"),
            "name": survivor_value.get("name"),
            "role": survivor_value.get("role"),
            "image": survivor_value.get("image")
        })
    
    return transformed_data

# Function to load, transform, and save the JSON file
def process_json_file(input_file, output_file):
    try:
        with open(input_file, 'r') as f:
            data = json.load(f)
        
        # Transform the data
        transformed_data = transform_json(data)
        
        # Save the transformed data to a new file
        with open(output_file, 'w') as f:
            json.dump(transformed_data, f, indent=2)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    input_file = "db.json"
    output_file = "transformed_db.json"
    process_json_file(input_file, output_file)