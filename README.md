# Smart Brief AI 

This chrome extension was designed to summarize web content easily so users can spend less time
reading content and more time on the things they enjoy!

To set up an OpenAI account and get an API key, follow these steps:

Visit the OpenAI website (https://openai.com) and click on the "Sign Up" button.
Create an account using your email address or by signing in with Google or Microsoft.
Once logged in, navigate to the API section (https://platform.openai.com/).
In the left sidebar, click on "API Keys" and then "Create new secret key" to generate your API key.
Copy and securely store your API key, as it won't be shown again.

**Note:** To use the API, you'll need to purchase credits. After logging in, go to the "Billing" section in your account dashboard. Here, you can add a payment method and buy credits. The amount of credits you'll need depends on your usage, so start with a small amount and monitor your consumption.
Remember to keep your API key confidential and never share it publicly. It's also a good practice to set up usage limits and notifications in your OpenAI account settings to avoid unexpected charges.


## Setting Up Backend

Go to backend directory:

`cd API`

Create a virtual environment:

`python -m venv env`

Activate the virtual environment:

On macOS/Linux:
`source env/bin/activate`

On Windows:
`env\Scripts\activate`

Install dependencies:

`pip install -r requirements.txt`

Create a .env file in the API directory and add your environment variables: 

`OPENAI_API_KEY=your_openai_api_key)`


Run the FastAPI application:

`uvicorn main:app --reload`

After usage deactivate your virtual environment:

`deactivate`

## Setting Up Frontend


Run `npm install` in the root directory. 

To unpack extension, go to extensions menu, change setting to Developer Mode, and load unpacked file. 

Pin/Add extension to window. 

Select content on page using mouse or select all to summarize content. A popup will appear with your summary. 


