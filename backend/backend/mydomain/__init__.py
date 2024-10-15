from fastapi import FastAPI, Request, Query, HTTPException, Body
from pydantic import BaseModel

class SocialMarketingPostRequest(BaseModel):
    startStyle: str = Body(..., example="預設開頭")
    numCharacter: str = Body(..., example="30~80字")
    numHashtag: int = Body(..., example=3)
    imageUrl: str = Body("", example="")
    userInstruction: str = Body(..., example="")
    autoNewline: bool = Body(..., example=True)
    humorLevel: int = Body(..., example=50, ge=0, le=100)
    emojiLevel: int = Body(..., example=50, ge=0, le=100)
    showyLevel: int = Body(..., example=10, ge=0, le=100)
    emotionLevel: int = Body(..., example=50, ge=0, le=100)
    professionalLevel: int = Body(..., example=50, ge=0, le=100)
    topicRelatedLevel: int = Body(..., example=50, ge=0, le=100)
    creativeLevel: int = Body(..., example=50, ge=0, le=100)
    sectorLevel: int = Body(..., example=10, ge=0, le=100)
