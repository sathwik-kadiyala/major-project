from pymongo import MongoClient
import sys

# Extract email and DNA sequence from command-line arguments
email = sys.argv[1]
received_dna_sequence = sys.argv[2]

# Connect to MongoDB and retrieve stored DNA sequence
client = MongoClient('mongodb+srv://sathwikkadiyala:sathwik@cluster0.ekipjtb.mongodb.net/?retryWrites=true&w=majority')
db = client['test']
collection = db['users']

# Find document by email
user_document = collection.find_one({'email': email})

# Check if the document exists and contains 'dnaSequence' key
if user_document and 'dnaSequence' in user_document:
    stored_dna_sequence = user_document['dnaSequence']

    # Authenticate user based on DNA sequences
    if received_dna_sequence == stored_dna_sequence:
        print('User authenticated. Running Spark job...')
        # Your Spark job logic here
    else:
        print('Authentication failed. Exiting...')
        sys.exit(1)
else:
    print('User not found. Exiting...')
    sys.exit(1)
