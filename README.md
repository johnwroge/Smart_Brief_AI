# Smart Brief AI 

This chrome extension was designed to summarize web content easily so users can spend less time
reading content and more time on the things they enjoy!


## Setting Up Backend

Create a virtual environment:

`python -m venv env`

Activate the virtual environment:

On macOS/Linux:
`source env/bin/activate`

On Windows:
`env\Scripts\activate`

Install dependencies:

`pip install -r requirements.txt`

Create a .env file in the root directory and add your environment variables: 

`OPENAI_API_KEY=your_openai_api_key)`


Run the FastAPI application:

`uvicorn main:app --reload`



## Setting Up Frontend


Run `npm install` in the root directory. 

To unpack extension, go to extensions menu, change setting to Developer Mode, and load unpacked file. 

Pin/Add extension to window. 

Select content on page using mouse or select all to summarize content. A popup will appear with your summary. 


