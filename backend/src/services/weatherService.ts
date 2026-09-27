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
  provider?: string;
}

function mapWeatherCode(code: number): string {
  switch (code) {
    case 0:
      return "Cerah";
    case 1:
      return "Sebagian Besar Cerah";
    case 2:
      return "Cerah Berawan";
    case 3:
      return "Berawan Mendung";
    case 45:
    case 48:
      return "Berkabut";
    case 51:
    case 53:
    case 55:
      return "Gerimis / Rintik";
    case 61:
      return "Hujan Ringan";
    case 63:
      return "Hujan Sedang";
    case 65:
      return "Hujan Lebat";
    case 80:
    case 81:
    case 82:
      return "Hujan Lokal";
    case 95:
    case 96:
    case 99:
      return "Hujan Badai & Petir";
    default:
      return "Cerah Berawan";
  }
}

/**
 * Fallback synchronous calculation based on diurnal cycle
 */
export function getWeatherAndRecommendationSync(
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
      advice_detail: "Prakiraan menunjukkan kemungkinan hujan tinggi (65%). Tidak perlu menyalakan pompa atau mengalirkan air irigasi untuk menghemat tenaga & biaya.",
      provider: "AgriBuddy Agro-Klimat Fallback"
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
      advice_detail: "Cuaca terik dan kelembaban mencukupi. Disarankan mengairi petak sawah sebelum pukul 09.00 atau setelah pukul 16.00 WIB.",
      provider: "AgriBuddy Agro-Klimat Fallback"
    };
  }
}

/**
 * Real-time weather query using Open-Meteo API
 */
export async function getWeatherAndRecommendation(
  lat: number = -7.25,
  lon: number = 112.75,
  village: string = "Desa Sukamaju"
): Promise<WeatherRecommendation> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&hourly=precipitation_probability&forecast_days=1&timezone=auto`;
    
    const response = await fetch(url, { signal: AbortSignal.timeout(4500) });
    if (!response.ok) {
      throw new Error(`Open-Meteo HTTP status ${response.status}`);
    }

    const data = (await response.json()) as any;
    const current = data.current || {};
    const hourly = data.hourly || {};

    const temp = current.temperature_2m !== undefined ? Number(current.temperature_2m.toFixed(1)) : 28.0;
    const humidity = current.relative_humidity_2m !== undefined ? Math.round(current.relative_humidity_2m) : 75;
    const precipitation = current.precipitation !== undefined ? Number(current.precipitation) : 0;
    const weatherCode = current.weather_code !== undefined ? Number(current.weather_code) : 2;
    const weatherCondition = mapWeatherCode(weatherCode);

    // Current hour precipitation probability
    const currentHour = new Date().getHours();
    let rainProb = 15;
    if (hourly.precipitation_probability && Array.isArray(hourly.precipitation_probability)) {
      rainProb = Number(hourly.precipitation_probability[currentHour] ?? 15);
    }

    let irrigationNeeded = true;
    let statusColor: 'green' | 'yellow' | 'red' = 'green';
    let adviceTitle = 'Waktu Optimal Sirkulasi Air Sawah';
    let adviceDetail = `Kondisi cuaca satelit Open-Meteo terpantau stabil (${temp}°C, kelembaban ${humidity}%). Sirkulasi debit air irigasi aman dijalankan pada pagi atau sore hari.`;

    if (precipitation > 0.5 || rainProb > 50 || [61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weatherCode)) {
      irrigationNeeded = false;
      statusColor = 'yellow';
      adviceTitle = 'Tunda Pengairan Lahan Hari Ini';
      adviceDetail = `Satelit Open-Meteo mendeteksi potensi hujan ${rainProb}% (${weatherCondition}). Tunda penggunaan pompa alkon dan biarkan air hujan mengairi petak untuk menghemat biaya operasional.`;
    } else if (temp >= 33) {
      irrigationNeeded = true;
      statusColor = 'red';
      adviceTitle = 'Waspada Evaporasi Tinggi (Suhu Terik)';
      adviceDetail = `Suhu lingkungan mencapai ${temp}°C dengan potensi penguapan tinggi. Disarankan menggenangi petak sawah setinggi 3-5 cm saat sore hari untuk mencegah tanah pecah-pecah.`;
    }

    return {
      location: village,
      temp_celsius: temp,
      humidity_percent: humidity,
      weather_condition: weatherCondition,
      rain_probability_percent: rainProb,
      irrigation_needed: irrigationNeeded,
      status_color: statusColor,
      advice_title: adviceTitle,
      advice_detail: adviceDetail,
      provider: "Open-Meteo Global Satellite"
    };
  } catch (error) {
    console.warn(`[OpenMeteo] Warning: Failed to fetch live weather, falling back to local simulation:`, error);
    return getWeatherAndRecommendationSync(lat, lon, village);
  }
}
