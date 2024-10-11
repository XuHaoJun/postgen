import os
from fastapi import FastAPI, Request, Query, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from .postgen import social_marketing

from dotenv import load_dotenv

load_dotenv()

from .mydomain import SocialMarketingPostRequest

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


# Set up CORS middleware
origins = [
    "http://localhost",
    "http://localhost:3000",
    os.getenv("CORS_URL") or "https://xuhaojun.github.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/social-marketing/posts")
@limiter.limit(os.getenv("POSTS_CREATE_LIMIT") or "1/1minute")
async def create_post(request: Request, data: SocialMarketingPostRequest = Body(...)):
    print(data)
    text = await social_marketing.call_llm(data)
    return text

@app.get("/health")
async def get_mquery(request: Request):
    return {"status": "ok"}   