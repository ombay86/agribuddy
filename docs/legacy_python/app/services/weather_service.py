from typing import Dict, Any
from app.models.schemas import WeatherRecommendation

def get_weather_and_recommendation(lat: float = -7.25, lon: float = 112.75, village: str = "Desa Sukamaju") -> WeatherRecommendation:
    # Simulasi cuaca realistik dan dinamis berbasis agrikultur
    # Jika ada OPENWEATHER_API_KEY, dapat memanggil endpoint eksternal
    import random
    from datetime import datetime

    hour = datetime.now().hour
    # Kondisi cuaca bervariasi realistis
    temp = 29.5 if 10 <= hour <= 15 else 26.0
    humidity = 78
    rain_prob = 20 if 8 <= hour <= 14 else 65

    if rain_prob > 50:
        return WeatherRecommendation(
            location=village,
            temp_celsius=temp,
            humidity_percent=humidity,
            weather_condition="Berawan Berpotensi Hujan",
            rain_probability_percent=rain_prob,
            irrigation_needed=False,
            status_color="yellow",
            advice_title="Tunda Pengairan Sore Ini",
            advice_detail="Prakiraan menunjukkan kemungkinan hujan tinggi (65%). Tidak perlu menyalakan pompa atau mengalirkan air irigasi untuk menghemat tenaga & biaya."
        )
    else:
        return WeatherRecommendation(
            location=village,
            temp_celsius=temp,
            humidity_percent=humidity,
            weather_condition="Cerah Berawan",
            rain_probability_percent=rain_prob,
            irrigation_needed=True,
            status_color="green",
            advice_title="Waktu Optimal Menyiram Lahan",
            advice_detail="Cuaca terik dan kelembaban mencukupi. Disarankan mengairi petak sawah sebelum pukul 09.00 atau setelah pukul 16.00 WIB."
        )
