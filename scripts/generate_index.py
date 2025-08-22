import os
from dotenv import load_dotenv
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.embeddings.google_genai import GoogleGenAIEmbedding

load_dotenv()

# Check if the Google API key is set
if "GOOGLE_API_KEY" not in os.environ:
    raise ValueError("GOOGLE_API_KEY not found in .env file")

# Set the embedding model
Settings.embed_model = GoogleGenAIEmbedding(model_name="models/embedding-001")

# Directories to index
input_dirs = ["./src/components"]

# Load documents
documents = SimpleDirectoryReader(input_dir=input_dirs[0], recursive=True).load_data()
for directory in input_dirs[1:]:
    documents.extend(SimpleDirectoryReader(input_dir=directory, recursive=True).load_data())


# Create the index
index = VectorStoreIndex.from_documents(documents)

# Persist the index
index.storage_context.persist(persist_dir="./storage")

print("Index generated and saved to ./storage using Gemini embedding model")