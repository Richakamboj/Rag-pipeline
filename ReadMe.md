## Basic RAG Project

## Indexing phase
1. Create our knowledge base(some .txt files)
2. Document Loading
3. Chunking
4. Create Embeddings
5. Store the embedding into our vectior DB

## Querying phase:
1. create a query
2. convert the query into embeddings
3. Retrive the relevent chunks from our vector DB
4. pass it into LLM model (pass the chnks and query into LLM)
5. Generate the final response for our query.














-SetUp the qdrant account
- create a cluster
- setup the project - empty repo
- create .env file and paste the qdrant_api_key and host_url in it.
- git init and add gitignore file and add nodemodules, .env, and other files which you want are not good to move on git.

// more info for below points : https://qdrant.tech/documentation/cloud-quickstart/

- install the qdrant client - npm install @qdrant/js-client-rest            # for Node.js projects
- connect to the qdrant cloud  
- add node types in tsconfig.
- creating a collection which is named as items.
- building points array out of data
- upsert/pushing /edit points to the collection. 
- install "npm i dotenv" and import doten/config into indexing.ts file
- run the code using "node src/indexing.ts
