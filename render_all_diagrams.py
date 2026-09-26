import http.server
import socketserver
import subprocess
import threading
import json
import time
import os
import re
import shutil
from PIL import Image

WORKSPACE = r"c:\Users\Asus\Documents\OMBAY\_PERSONAL_\Semester 7\STSI4440_CAPSTONE PROJECT"
BRAIN_DIR = r"C:\Users\Asus\.gemini\antigravity\brain\e07e4502-5d72-499c-989c-c0ab02ab60ae"
EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
PORT = 8820

DIAGRAMS = [
    {
        "id": "erd",
        "port": 8831,
        "md_file": "ERD_AgriBuddy.md",
        "svg_file": "ERD_AgriBuddy.svg",
        "jpg_file": "ERD_AgriBuddy.jpg",
        "badge": "PEMODELAN BASIS DATA — RELASIONAL 3NF & TRACEABILITY",
        "title": "Entity Relationship Diagram — AgriBuddy v2.0",
        "sub": "Arsitektur Relasional 9 Entitas: Profil Petani, Sawah Geospasial, Rencana Tani AI, Diagnosis Gemini Vision, Gudang Saprotan, & Lumbung Ketertelusuran",
        "theme": "default",
        "curve": "basis"
    },
    {
        "id": "use_case",
        "port": 8832,
        "md_file": "USE_CASE_AgriBuddy.md",
        "svg_file": "USE_CASE_AgriBuddy.svg",
        "jpg_file": "USE_CASE_AgriBuddy.jpg",
        "badge": "STANDAR UML 2.5 — DIAGRAM USE CASE & ASOSIASI AKTOR",
        "title": "Use Case Diagram Sistem Terpadu — AgriBuddy v2.0",
        "sub": "26 Use Case dalam 6 Paket Fungsional: Smart Farming DSS, Gemini Multimodal Vision, & Food Provenance Traceability",
        "theme": "default",
        "curve": "basis"
    },
    {
        "id": "flowchart",
        "port": 8833,
        "md_file": "FLOWCHART_AgriBuddy.md",
        "svg_file": "FLOWCHART_AgriBuddy.svg",
        "jpg_file": "FLOWCHART_AgriBuddy.jpg",
        "badge": "STANDAR ANSI/ISO 5807 — DIAGRAM ALIR PROSES USAHATANI",
        "title": "Flowchart Alur Logika Sistem — AgriBuddy v2.0",
        "sub": "Integrasi End-to-End: Monitoring Cuaca, Rencana Budidaya AI, Diagnosis Citra Daun, Kas Modal, & Ketertelusuran Lumbung",
        "theme": "default",
        "curve": "basis"
    },
    {
        "id": "activity",
        "port": 8834,
        "md_file": "ACTIVITY_DIAGRAM_AgriBuddy.md",
        "svg_file": "ACTIVITY_DIAGRAM_AgriBuddy.svg",
        "jpg_file": "ACTIVITY_DIAGRAM_AgriBuddy.jpg",
        "badge": "PEMODELAN UML 2.5 — DIAGRAM AKTIVITAS & PARTISI SWIMLANE",
        "title": "Activity Diagram Sistem Terpadu — AgriBuddy v2.0",
        "sub": "Alur Kolaborasi 4 Partisi: Petani, Frontend Vue 3 SPA, Backend Node.js API, & Layanan Eksternal (Gemini AI / Open-Meteo)",
        "theme": "default",
        "curve": "basis"
    }
]

def extract_first_mermaid(md_path):
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
    match = re.search(r"```mermaid\r?\n([\s\S]*?)\r?\n```", content)
    if not match:
        raise ValueError(f"No mermaid block found in {md_path}")
    return match.group(1).strip()

def render_diagram(diag):
    print(f"\n==========================================")
    print(f"Rendering: {diag['title']}")
    print(f"==========================================")

    md_path = os.path.join(WORKSPACE, diag["md_file"])
    svg_path = os.path.join(WORKSPACE, diag["svg_file"])
    jpg_path = os.path.join(WORKSPACE, diag["jpg_file"])
    brain_jpg = os.path.join(BRAIN_DIR, diag["jpg_file"])
    html_init = os.path.join(WORKSPACE, f"_temp_{diag['id']}_init.html")
    html_final = os.path.join(WORKSPACE, f"_temp_{diag['id']}_final.html")
    diag_port = diag.get("port", PORT)

    mermaid_code = extract_first_mermaid(md_path)
    
    data_received = {
        "svg": None,
        "dims": None,
        "error": None,
        "done": False
    }

    class CustomHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=WORKSPACE, **kwargs)

        def do_POST(self):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            payload = json.loads(post_data)

            if self.path == "/save_svg":
                data_received["svg"] = payload.get("svg")
                data_received["dims"] = payload.get("dims")
                data_received["done"] = True
            elif self.path == "/report_error":
                data_received["error"] = payload.get("error")
                data_received["done"] = True

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(b'{"status":"ok"}')

        def log_message(self, format, *args):
            return  # silence HTTP logs

    # Escape backticks and backslashes for JS template literal
    escaped_code = mermaid_code.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

    init_html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <style>
    body {{ margin: 0; padding: 20px; background: white; }}
    #container {{ display: inline-block; }}
  </style>
</head>
<body>
  <div id="container"></div>
  <script>
    window.onload = async () => {{
      mermaid.initialize({{
        startOnLoad: false,
        theme: '{diag["theme"]}',
        flowchart: {{
          useMaxWidth: false,
          curve: '{diag["curve"]}',
          nodeSpacing: 35,
          rankSpacing: 45
        }},
        er: {{
          useMaxWidth: false
        }}
      }});

      const code = `{escaped_code}`;

      try {{
        const {{ svg }} = await mermaid.render('mermaidSvg_{diag["id"]}', code);
        document.getElementById('container').innerHTML = svg;
        
        const svgEl = document.querySelector('svg');
        const bbox = svgEl.getBBox();
        const pad = 40;
        const vx = Math.floor(bbox.x - pad);
        const vy = Math.floor(bbox.y - pad);
        const vw = Math.ceil(bbox.width + pad * 2);
        const vh = Math.ceil(bbox.height + pad * 2);
        svgEl.setAttribute('viewBox', `${{vx}} ${{vy}} ${{vw}} ${{vh}}`);
        svgEl.setAttribute('width', vw);
        svgEl.setAttribute('height', vh);
        svgEl.style.maxWidth = 'none';

        fetch('http://127.0.0.1:{diag_port}/save_svg', {{
          method: 'POST',
          headers: {{ 'Content-Type': 'application/json' }},
          body: JSON.stringify({{
            svg: svgEl.outerHTML,
            dims: {{ width: vw, height: vh }}
          }})
        }});
      }} catch (err) {{
        console.error("Render error:", err);
        fetch('http://127.0.0.1:{diag_port}/report_error', {{
          method: 'POST',
          headers: {{ 'Content-Type': 'application/json' }},
          body: JSON.stringify({{ error: err.message || String(err) }})
        }});
      }}
    }};
  </script>
</body>
</html>"""

    with open(html_init, "w", encoding="utf-8") as f:
        f.write(init_html_content)

    httpd = http.server.HTTPServer(("127.0.0.1", diag_port), CustomHandler)

    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()

    cmd1 = [
        EDGE_EXE,
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        "--window-size=2400,1600",
        f"http://127.0.0.1:{diag_port}/{os.path.basename(html_init)}"
    ]

    print("[Step 1] Rendering Mermaid in Edge headless...")
    proc = subprocess.Popen(cmd1)

    start_t = time.time()
    while not data_received["done"] and (time.time() - start_t < 25):
        time.sleep(0.5)

    proc.terminate()
    try:
        proc.wait(timeout=2)
    except Exception:
        proc.kill()

    httpd.shutdown()
    httpd.server_close()

    if data_received.get("error"):
        print(f"FAILED with Error: {data_received['error']}")
        return False

    if not data_received["done"]:
        print("FAILED: Timeout waiting for SVG render")
        return False

    svg_str = data_received["svg"]
    dims = data_received["dims"]
    vw = dims["width"]
    vh = dims["height"]

    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_str)
    print(f"[Success] Saved SVG ({vw}x{vh}) -> {diag['svg_file']}")

    # Step 2: Build Card Presentation & Screenshot
    card_w = vw + 100
    total_w = card_w + 100
    total_h = vh + 380

    final_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>{diag["title"]}</title>
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: #0f172a;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 45px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: max-content;
    }}
    .header {{
      text-align: center;
      margin-bottom: 28px;
      background: linear-gradient(135deg, #064e3b, #0f766e);
      padding: 24px 60px;
      border-radius: 20px;
      border: 1px solid rgba(52, 211, 153, 0.3);
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      width: 100%;
    }}
    .badge {{
      display: inline-block;
      background: rgba(52, 211, 153, 0.2);
      color: #6ee7b7;
      border: 1px solid rgba(52, 211, 153, 0.4);
      padding: 5px 15px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }}
    h1 {{ font-size: 34px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; }}
    p.sub {{ font-size: 16px; color: #a7f3d0; margin-top: 5px; font-weight: 500; max-width: 1200px; }}
    .diagram-container {{
      background: #ffffff;
      padding: 45px;
      border-radius: 28px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.6);
      display: block;
    }}
    .footer-note {{
      margin-top: 22px;
      color: #94a3b8;
      font-size: 15px;
      font-weight: 600;
      text-align: center;
    }}
  </style>
</head>
<body>
  <div class="header">
    <div class="badge">{diag["badge"]}</div>
    <h1>{diag["title"]}</h1>
    <p class="sub">{diag["sub"]}</p>
  </div>

  <div class="diagram-container">
    {svg_str}
  </div>

  <div class="footer-note">
    Capstone Project STSI4440 • Tugas Akhir Sarjana Sistem Informasi 2026 • AgriBuddy
  </div>
</body>
</html>"""

    with open(html_final, "w", encoding="utf-8") as f:
        f.write(final_html)

    if os.path.exists(jpg_path):
        os.remove(jpg_path)

    cmd2 = [
        EDGE_EXE,
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        f"--window-size={total_w},{total_h}",
        "--virtual-time-budget=4000",
        f"--screenshot={jpg_path}",
        "file:///" + html_final.replace("\\", "/")
    ]

    print(f"[Step 2] Capturing presentation screenshot ({total_w}x{total_h})...")
    subprocess.run(cmd2, capture_output=True, text=True)

    if os.path.exists(jpg_path):
        img = Image.open(jpg_path)
        print(f"[Success] JPG created: {img.size} ({os.path.getsize(jpg_path)} bytes)")
        shutil.copy2(jpg_path, brain_jpg)
        print(f"[Success] Copied to brain artifacts: {brain_jpg}")
    else:
        print("[Error] JPG screenshot failed")
        return False

    # Cleanup temp HTML files
    if os.path.exists(html_init):
        os.remove(html_init)
    if os.path.exists(html_final):
        os.remove(html_final)

    return True

if __name__ == "__main__":
    success_count = 0
    for d in DIAGRAMS:
        ok = render_diagram(d)
        if ok:
            success_count += 1
        time.sleep(1)

    print(f"\nAll rendering completed: {success_count}/{len(DIAGRAMS)} successful.")
