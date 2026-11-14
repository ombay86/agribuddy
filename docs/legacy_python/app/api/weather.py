from fastapi import APIRouter, Query
from app.models.schemas import WeatherRecommendation
from app.services.weather_service import get_weather_and_recommendation

router = APIRouter(prefix="/weather", tags=["Cuaca & Rekomendasi Lahan"])

@router.get("/current", response_model=WeatherRecommendation)
def get_current_weather(
    lat: float = Query(-7.25, description="Latitude lokasi lahan"),
    lon: float = Query(112.75, description="Longitude lokasi lahan"),
    village: str = Query("Desa Sukamaju", description="Nama desa/kelurahan")
):
    return get_weather_and_recommendation(lat=lat, lon=lon, village=village)
