import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    PROJECT_NAME: str = "AgriBuddy API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    MONGODB_URI: str = os.getenv("MONGODB_URI", "")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "agribuddy_db")
    
    # AI & Service Settings
    OPENWEATHER_API_KEY: str = os.getenv("OPENWEATHER_API_KEY", "")

settings = Settings()
