export interface WeatherRecommendation {
  location: string;
  temp_celsius: number;
  humidity_percent: number;
  weather_condition: string;
  rain_probability_percent: number;
  irrigation_needed: boolean;
  status_color: 'green' | 'yellow' | 'red';
  advice_title: string;
  advice_detail: string;
}

export function getWeatherAndRecommendation(
  lat: number = -7.25,
  lon: number = 112.75,
  village: string = "Desa Sukamaju"
): WeatherRecommendation {
  const hour = new Date().getHours();
  const temp = (hour >= 10 && hour <= 15) ? 29.5 : 26.0;
  const humidity = 78;
  const rainProb = (hour >= 8 && hour <= 14) ? 20 : 65;

  if (rainProb > 50) {
    return {
      location: village,
      temp_celsius: temp,
      humidity_percent: humidity,
      weather_condition: "Berawan Berpotensi Hujan",
      rain_probability_percent: rainProb,
      irrigation_needed: false,
      status_color: "yellow",
      advice_title: "Tunda Pengairan Sore Ini",
      advice_detail: "Prakiraan menunjukkan kemungkinan hujan tinggi (65%). Tidak perlu menyalakan pompa atau mengalirkan air irigasi untuk menghemat tenaga & biaya."
    };
  } else {
    return {
      location: village,
      temp_celsius: temp,
      humidity_percent: humidity,
      weather_condition: "Cerah Berawan",
      rain_probability_percent: rainProb,
      irrigation_needed: true,
      status_color: "green",
      advice_title: "Waktu Optimal Menyiram Lahan",
      advice_detail: "Cuaca terik dan kelembaban mencukupi. Disarankan mengairi petak sawah sebelum pukul 09.00 atau setelah pukul 16.00 WIB."
    };
  }
}
