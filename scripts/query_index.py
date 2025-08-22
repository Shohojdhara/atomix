import os
import sys
from dotenv import load_dotenv
from llama_index.core import VectorStoreIndex, StorageContext, load_index_from_storage, Settings
from llama_index.llms.google_genai import GoogleGenAI

load_dotenv()

# Check if the Google API key is set
if "GOOGLE_API_KEY" not in os.environ:
    raise ValueError("GOOGLE_API_KEY not found in .env file")

# Set the LLM
Settings.llm = GoogleGenAI(model_name="models/gemini-pro")

# Check for query
if len(sys.argv) < 2:
    print("Usage: python3 scripts/query_index.py <query>")
    sys.exit(1)

query_text = sys.argv[1]

# Load the index from storage
storage_context = StorageContext.from_defaults(persist_dir="./storage")
index = load_index_from_storage(storage_context)

# Create a query engine
query_engine = index.as_query_engine()

# Query the index
response = query_engine.query(query_text)

# Print the response
print(response)