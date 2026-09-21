from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import auth, weather, inventory, harvest, ai_diagnose, network, social_market, farm_plan, catalog, farmlands

app = FastAPI(
    title="AgriBuddy Backend API",
    description="Backend pendamping ekosistem pertanian cerdas untuk Capstone Project STSI4440",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware agar Frontend Vue di localhost:5173 bisa mengakses backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inisialisasi Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(weather.router, prefix=settings.API_V1_STR)
app.include_router(inventory.router, prefix=settings.API_V1_STR)
app.include_router(harvest.router, prefix=settings.API_V1_STR)
app.include_router(ai_diagnose.router, prefix=settings.API_V1_STR)
app.include_router(network.router, prefix=settings.API_V1_STR)
app.include_router(social_market.router, prefix=settings.API_V1_STR)
app.include_router(farm_plan.router, prefix=settings.API_V1_STR)
app.include_router(catalog.router, prefix=settings.API_V1_STR)
app.include_router(farmlands.router, prefix=settings.API_V1_STR)



@app.get("/", tags=["Root"])
def root():
    return {
        "app": "AgriBuddy API",
        "status": "Online",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
