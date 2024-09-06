from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

class TextRequest(BaseModel):
    text: str

openai.api_key = os.getenv('OPENAI_API_KEY')

@app.post("/summarize")
async def summarize_text(request: TextRequest):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes text."},
                {"role": "user", "content": f"Please summarize the following text: {request.text}"}
            ],
            max_tokens=100,
            temperature=0.5,
        )
        return {"summary": response.choices[0].message['content'].strip()}
    except openai.error.OpenAIError as e:
        raise HTTPException(status_code=500, detail=str(e))