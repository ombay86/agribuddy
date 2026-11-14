import math
from typing import Dict, Any, List
from app.services.weather_service import get_weather_and_recommendation

class FarmPlannerService:
    """
    Smart Farm Planner & Cost Calculator Engine.
    Mengalkulasi Rencana Anggaran Biaya (RAB), jadwal budidaya,
    proyeksi hasil panen, dan analisis keuntungan berdasarkan luas lahan,
    komoditas, kondisi tanah, serta prakiraan cuaca & ketersediaan air lokal.
    """

    def calculate_plan(
        self,
        land_size_ha: float,
        commodity: str = "Padi Sawah Inpari 32",
        soil_type: str = "Lempung Berliat (Subur)",
        water_source: str = "Irigasi Teknis Bendungan",
        location: str = "Sukamaju, Jawa Timur",
        latitude: float = -7.2504,
        longitude: float = 112.7512,
        coordinates_label: str = "-7.2504, 112.7512 (Desa Sukamaju)",
        user_id: str = "usr_001"
    ) -> Dict[str, Any]:
        # Normalisasi luas lahan minimal 0.05 Ha
        ha = max(float(land_size_ha), 0.05)

        # Ambil kondisi cuaca lokal untuk penyesuaian agronomi berbasis koordinat GPS
        weather_rec = get_weather_and_recommendation(lat=latitude, lon=longitude, village=location)
        rain_prob = weather_rec.rain_probability_percent
        temp = weather_rec.temp_celsius
        is_wet_season = rain_prob >= 50



        # Parameter Dasar (per Hektar)
        # Standar Litbang Pertanian & Kementan untuk Padi Sawah
        seed_kg_per_ha = 25.0
        seed_price_per_kg = 15000.0  # Benih Inpari bersertifikat

        # Olah Tanah
        tractor_fee_per_ha = 1200000.0
        cangkul_labor_per_ha = 500000.0

        # Jasa Tanam
        transplant_labor_per_ha = 1400000.0

        # Pupuk
        # Jika musim hujan tinggi, kurangi Urea 15% cegah busuk/rebah, tapi tingkatkan NPK/Kalium
        if is_wet_season:
            urea_kg_per_ha = 175.0
            npk_kg_per_ha = 320.0
            weather_note = "Curah hujan tinggi terdeteksi (probabilitas {}%). Dosis Urea diturunkan 15% untuk mencegah serangan Hawar Daun (Kresek) dan rebah batang, dengan penguatan Kalium NPK.".format(rain_prob)
        else:
            urea_kg_per_ha = 200.0
            npk_kg_per_ha = 300.0
            weather_note = "Kondisi cuaca cerah/normal (suhu {}°C). Dosis pemupukan NPK dan Urea standar berimbang dianjurkan.".format(temp)

        urea_price_per_kg = 2250.0   # Subsidi
        npk_price_per_kg = 3300.0    # Subsidi Phonska
        organic_fertilizer_per_ha = 400000.0  # Kompos / pupuk kandang

        # Pengairan
        if water_source == "Irigasi Teknis Bendungan":
            water_cost_per_ha = 150000.0 if not is_wet_season else 50000.0
            water_note = "Memanfaatkan saluran irigasi teknis P3A poktan (hemat biaya operasional)."
        elif water_source == "Sumur Pompa Diesel / Bor":
            # Butuh solar untuk mesin diesel alkon
            water_cost_per_ha = 850000.0 if not is_wet_season else 350000.0
            water_note = "Menggunakan pompa diesel alkon/sumur bor. Dihitung biaya BBM solar & sewa pompa pengairan."
        else: # Tadah Hujan
            water_cost_per_ha = 450000.0 if not is_wet_season else 0.0
            water_note = "Sawah tadah hujan, sangat bergantung pada curah hujan musiman."

        # Perlindungan Hama & Penyakit (HPT)
        pesticide_per_ha = 650000.0
        spray_labor_per_ha = 350000.0

        # Panen & Pasca Panen
        harvest_labor_per_ha = 1800000.0
        transport_sacks_per_ha = 350000.0

        # Hitung item RAB berdasarkan skala luas lahan
        budget_items = [
            {
                "id": "bgt_1",
                "phase": "Olah Tanah & Lahan",
                "name": "Sewa Traktor & Operator (Bajak & Garu)",
                "category": "JASA_TRAKTOR",
                "recommended_provider": "Mas Bambang (Jasa Traktor Quick Sukamaju)",
                "quantity": round(ha, 2),
                "unit": "Hektar",
                "unit_price": int(tractor_fee_per_ha),
                "total_price": int(tractor_fee_per_ha * ha),
                "notes": "Olah tanah sempurna gembur dan perataan gulma"
            },
            {
                "id": "bgt_2",
                "phase": "Olah Tanah & Lahan",
                "name": "Jasa Cangkul & Perbaikan Galengan/Pematang",
                "category": "JASA_CANGKUL",
                "recommended_provider": "Mang Udin & Kelompok Buruh Cangkul",
                "quantity": max(1, round(ha * 3)),
                "unit": "Orang-Hari",
                "unit_price": int(cangkul_labor_per_ha / 3),
                "total_price": int(cangkul_labor_per_ha * ha),
                "notes": "Pembersihan kebocoran pematang sawah penahan air"
            },
            {
                "id": "bgt_3",
                "phase": "Persemaian & Benih",
                "name": f"Benih {commodity} Bersertifikat",
                "category": "SAPROTAN",
                "recommended_provider": "Kios Tani Subur Makmur (Ibu Ratna)",
                "quantity": round(seed_kg_per_ha * ha, 1),
                "unit": "kg",
                "unit_price": int(seed_price_per_kg),
                "total_price": int(seed_kg_per_ha * seed_price_per_kg * ha),
                "notes": "Daya tumbuh > 85%, tahan rebah"
            },
            {
                "id": "bgt_4",
                "phase": "Tanam",
                "name": "Upah Buruh Tanam (Sistem Jajar Legowo 2:1)",
                "category": "JASA_BURUH",
                "recommended_provider": "Kelompok Tani Makmur (Regu Tanam Melati)",
                "quantity": max(1, round(ha * 10)),
                "unit": "Orang-Hari",
                "unit_price": int(transplant_labor_per_ha / 10),
                "total_price": int(transplant_labor_per_ha * ha),
                "notes": "Populasi rumpun optimal dan sirkulasi udara baik"
            },
            {
                "id": "bgt_5",
                "phase": "Nutrisi & Pemupukan",
                "name": "Pupuk Urea N-46 (Subsidi)",
                "category": "PUPUK",
                "recommended_provider": "Kios Pupuk KPL Resmi",
                "quantity": round(urea_kg_per_ha * ha, 1),
                "unit": "kg",
                "unit_price": int(urea_price_per_kg),
                "total_price": int(urea_kg_per_ha * urea_price_per_kg * ha),
                "notes": "Pemupukan dasar (1/3 dosis) dan susulan I & II"
            },
            {
                "id": "bgt_6",
                "phase": "Nutrisi & Pemupukan",
                "name": "Pupuk Majemuk NPK Phonska 15-15-15",
                "category": "PUPUK",
                "recommended_provider": "Kios Pupuk KPL Resmi",
                "quantity": round(npk_kg_per_ha * ha, 1),
                "unit": "kg",
                "unit_price": int(npk_price_per_kg),
                "total_price": int(npk_kg_per_ha * npk_price_per_kg * ha),
                "notes": "Keseimbangan fosfat & kalium untuk bobot bulir"
            },
            {
                "id": "bgt_7",
                "phase": "Nutrisi & Pemupukan",
                "name": "Pupuk Hayati Organik / Pembenah Tanah",
                "category": "PUPUK",
                "recommended_provider": "Koperasi Unit Desa (KUD Sukamaju)",
                "quantity": round(ha * 500, 1),
                "unit": "kg",
                "unit_price": 800,
                "total_price": int(organic_fertilizer_per_ha * ha),
                "notes": f"Menjaga mikroba tanah jenis {soil_type}"
            },
            {
                "id": "bgt_8",
                "phase": "Pengairan",
                "name": f"Operasional Pengairan ({water_source})",
                "category": "JASA_PENGAIRAN",
                "recommended_provider": "Pak Slamet (Jasa Pompa Air Alkon Sukamaju)",
                "quantity": round(ha, 2),
                "unit": "Paket Lahan",
                "unit_price": int(water_cost_per_ha),
                "total_price": int(water_cost_per_ha * ha),
                "notes": water_note
            },
            {
                "id": "bgt_9",
                "phase": "Perawatan & Hama",
                "name": "Paket Fungisida & Bakterisida Hayati (Anti-Kresek)",
                "category": "SAPROTAN",
                "recommended_provider": "Kios Tani Subur Makmur",
                "quantity": max(1, round(ha * 2)),
                "unit": "Paket Obat",
                "unit_price": int(pesticide_per_ha / 2),
                "total_price": int(pesticide_per_ha * ha),
                "notes": "Pencegahan dini hawar daun bakteri dan jamur bulir"
            },
            {
                "id": "bgt_10",
                "phase": "Panen & Pengangkutan",
                "name": "Upah Panen / Sewa Mesin Combine Harvester",
                "category": "JASA_PANEN",
                "recommended_provider": "Bpk. Hendra Jaya (Mitra Penggilingan Sri Jaya)",
                "quantity": round(ha, 2),
                "unit": "Hektar",
                "unit_price": int(harvest_labor_per_ha),
                "total_price": int(harvest_labor_per_ha * ha),
                "notes": "Termasuk perontokan dan penimbangan langsung"
            },
            {
                "id": "bgt_11",
                "phase": "Panen & Pengangkutan",
                "name": "Karung & Ongkos Angkut ke Lumbung/Pengepul",
                "category": "JASA_LOGISTIK",
                "recommended_provider": "Armada Pick-Up Desa Sukamaju",
                "quantity": round(ha, 2),
                "unit": "Paket Muatan",
                "unit_price": int(transport_sacks_per_ha),
                "total_price": int(transport_sacks_per_ha * ha),
                "notes": "Karung isi 50-60kg dan pengiriman ke lumbung tani"
            }
        ]

        total_budget = sum(item["total_price"] for item in budget_items)

        # Proyeksi Hasil Panen
        # Rata-rata produktivitas nasional padi varietas unggul: 6.200 kg GKP / Ha
        # Variasi sedikit berdasarkan kesuburan tanah
        soil_mult = 1.05 if "Subur" in soil_type or "Aluvial" in soil_type else 0.95
        projected_yield_kg = round(6400 * ha * soil_mult)
        projected_selling_price_per_kg = 6850  # Rp / kg GKP saat ini
        projected_revenue = int(projected_yield_kg * projected_selling_price_per_kg)
        projected_net_profit = projected_revenue - total_budget
        roi_percentage = round((projected_net_profit / total_budget) * 100, 1) if total_budget > 0 else 0
        hpp_per_kg = round(total_budget / projected_yield_kg) if projected_yield_kg > 0 else 0

        # Timeline Monitoring Siklus Tanam (Interactive Phased Checklist)
        timeline_phases = [
            {
                "step_no": 1,
                "name": "Persemaian Benih & Pengolahan Tanah Pertama",
                "day_range": "H-15 s/d H-5",
                "duration_days": 10,
                "status": "SELESAI", # Default awal
                "allocated_budget": int(budget_items[0]["total_price"] + budget_items[1]["total_price"] + budget_items[2]["total_price"]),
                "actual_cost": int(budget_items[0]["total_price"] + budget_items[1]["total_price"] + budget_items[2]["total_price"]),
                "tasks": [
                    "Rendam benih 24 jam dan tiriskan 48 jam hingga berkecambah",
                    "Bajak tanah pertama (singkal) sedalam 20-25 cm",
                    "Garu dan ratakan permukaan sawah agar lumpur matang sempurna"
                ],
                "ai_tips": "Pastikan bedengan persemaian tidak tergenang air lebih dari 2 cm agar kecambah tidak busuk."
            },
            {
                "step_no": 2,
                "name": "Penanaman Bibit & Pemupukan Dasar",
                "day_range": "H+1 s/d H+7",
                "duration_days": 7,
                "status": "SEDANG_BERJALAN",
                "allocated_budget": int(budget_items[3]["total_price"] + budget_items[6]["total_price"] + (budget_items[4]["total_price"] * 0.3)),
                "actual_cost": 0,
                "tasks": [
                    "Tanam bibit umur muda (15-18 hari setelah semai), 1-2 bibit per rumpun",
                    "Gunakan jarak tanam Jajar Legowo 2:1 (20 x 10 x 40 cm)",
                    "Aplikasi pupuk organik kandang dan 1/3 dosis Urea sebagai pupuk dasar"
                ],
                "ai_tips": "Tanam dangkal (1-2 cm) memicu pembentukan anakan produktif lebih cepat dan kuat."
            },
            {
                "step_no": 3,
                "name": "Pemupukan Susulan I & Penyiangan Gulma",
                "day_range": "H+18 s/d H+24",
                "duration_days": 6,
                "status": "BELUM",
                "allocated_budget": int((budget_items[4]["total_price"] * 0.35) + (budget_items[5]["total_price"] * 0.5)),
                "actual_cost": 0,
                "tasks": [
                    "Penyiangan rumput liar/gulma dengan alat gosrok/landak",
                    "Taburkan pupuk susulan I (campuran NPK Phonska dan Urea)",
                    "Kondisikan air macak-macak (nyemek) saat menabur pupuk"
                ],
                "ai_tips": f"{weather_note} Jangan tabur pupuk saat mendung pekat menjelang hujan deras agar tidak hanyut."
            },
            {
                "step_no": 4,
                "name": "Pemupukan Susulan II & Fase Primordia (Bunting)",
                "day_range": "H+40 s/d H+50",
                "duration_days": 10,
                "status": "BELUM",
                "allocated_budget": int((budget_items[4]["total_price"] * 0.35) + (budget_items[5]["total_price"] * 0.5) + budget_items[7]["total_price"]),
                "actual_cost": 0,
                "tasks": [
                    "Pengamatan malai bunting dan serangan hama sundep/penggerek batang",
                    "Aplikasi pupuk susulan terakhir penambah Kalium untuk pengisian bulir",
                    "Pengaturan debit pintu air irigasi masuk setinggi 3-5 cm"
                ],
                "ai_tips": "Kebutuhan air pada fase bunting sangat krusial, hubungi pengelola pompa jika saluran kering."
            },
            {
                "step_no": 5,
                "name": "Pengisian Bulir, Pemasakan & Pencegahan Hama",
                "day_range": "H+65 s/d H+85",
                "duration_days": 20,
                "status": "BELUM",
                "allocated_budget": int(budget_items[8]["total_price"]),
                "actual_cost": 0,
                "tasks": [
                    "Semprot fungisida/bakterisida hayati bila tampak tanda daun menguning bercak",
                    "Pemasangan tali kresek/orang-orangan sawah pengusir burung pipit",
                    "Mulai kurangi ketinggian air sawah 10 hari sebelum panen raya"
                ],
                "ai_tips": "Keringkan sawah saat gabah sudah mulai menguning 85% untuk mempercepat kematangan serentak."
            },
            {
                "step_no": 6,
                "name": "Panen Raya & Distribusi ke Lumbung/Pengepul",
                "day_range": "H+100 s/d H+115",
                "duration_days": 15,
                "status": "BELUM",
                "allocated_budget": int(budget_items[9]["total_price"] + budget_items[10]["total_price"]),
                "actual_cost": 0,
                "tasks": [
                    "Cek kadar air gabah kering panen (target 14-18%)",
                    "Pemanenan dengan Combine Harvester atau sabit gerigi",
                    "Pencatatan timbangan gabah dan penawaran langsung di Bursa Panen AgriBuddy"
                ],
                "ai_tips": "Langsung buat listing panen di AgriBuddy untuk mendapatkan penawaran harga tertinggi dari pengepul."
            }
        ]

        return {
            "plan_id": f"pln_{int(ha * 100)}_{int(total_budget % 10000)}",
            "user_id": user_id,
            "land_size_ha": ha,
            "commodity": commodity,
            "soil_type": soil_type,
            "water_source": water_source,
            "location": location,
            "latitude": latitude,
            "longitude": longitude,
            "coordinates_label": coordinates_label,
            "weather_condition": {

                "temp_celsius": temp,
                "rain_probability": rain_prob,
                "season": "Musim Hujan (Rendeng)" if is_wet_season else "Musim Kemarau (Gadu)",
                "note": weather_note
            },
            "financial_summary": {
                "total_budget": total_budget,
                "hpp_per_kg": hpp_per_kg,
                "projected_yield_kg": projected_yield_kg,
                "projected_selling_price_per_kg": projected_selling_price_per_kg,
                "projected_revenue": projected_revenue,
                "projected_net_profit": projected_net_profit,
                "roi_percentage": roi_percentage
            },
            "budget_items": budget_items,
            "timeline_phases": timeline_phases,
            "ecosystem_recommendations": [
                {
                    "role_category": "Jasa Olah Tanah",
                    "partner_name": "Mas Bambang (Traktor Quick)",
                    "action_text": "Hubungi untuk jadwal bajak lahan",
                    "phone": "6281298765432"
                },
                {
                    "role_category": "Jasa Pengairan",
                    "partner_name": "Pak Slamet (Pompa Alkon 3 Inci)",
                    "action_text": "Booking jadwal sedot saluran",
                    "phone": "6285799988811"
                },
                {
                    "role_category": "Penyedia Saprotan",
                    "partner_name": "Kios Tani Subur Makmur (Ibu Ratna)",
                    "action_text": "Pesan pupuk & benih bersertifikat",
                    "phone": "6285712345678"
                },
                {
                    "role_category": "Penggilingan Padi",
                    "partner_name": "Bpk. Hendra Jaya (Sri Jaya)",
                    "action_text": "Cek harga serapan gabah panen",
                    "phone": "6281356789012"
                }
            ]
        }

planner_service = FarmPlannerService()
