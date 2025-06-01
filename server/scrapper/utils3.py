from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import json
import re
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import os
port = int(os.getenv("PORT", 10000))


load_dotenv()
api_key = os.getenv("api_key")
# --------------------------------------- FUNCIONES PARA SCRAPEAR -------------------------------------------------

def scrapear_web(web):
    driver_path = os.getenv("CHROMEDRIVER_PATH", "/usr/bin/chromedriver")
    
    options = Options()
    options.add_argument("--headless") 
    options.add_argument("--no-sandbox")  
    options.add_argument("--disable-dev-shm-usage")  
    options.add_argument("--disable-gpu")  
    options.add_argument("--window-size=1920,1080")   

    # Configurar el servicio con la ruta correcta
    service = Service(driver_path)
    driver = webdriver.Chrome(service=service, options=options)

    try:
        driver.get(web)
        print("Cargando página...")
        time.sleep(5)  

        # Manejo de cookies
        try:
            botones = driver.find_elements(By.XPATH, "//button[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'aceptar') or contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'accept')]")
            for boton in botones:
                try:
                    boton.click()
                    print("Cookies aceptadas.")
                    time.sleep(2)
                    break
                except ElementClickInterceptedException:
                    continue
        except NoSuchElementException:
            print("No se encontró botón de cookies.")

        html = driver.page_source
        return html

    finally:
        driver.quit()





def extraer(html_cont):
    sopa = BeautifulSoup(html_cont, "html.parser")
    contenido = sopa.body
    if contenido:
        return str(contenido)
    return ""

def limpieza(contenido):
    sopa = BeautifulSoup(contenido, "html.parser")
    for i in sopa(["script", "style"]):
        i.extract()
    contenido_limpio = sopa.get_text(separator="\n")
    contenido_limpio = "\n".join(line.strip() for line in contenido_limpio.splitlines() if line.strip())
    return contenido_limpio




def extraer_productos(html_cont):
    sopa = BeautifulSoup(html_cont, "html.parser")
    productos = []

    # Buscamos todos los enlaces válidos
    for a_tag in sopa.find_all('a', href=True):
        nombre = a_tag.get_text(strip=True)
        href = a_tag['href']

        # Saltamos si no hay nombre o href
        if not (nombre and href):
            continue

        # Inicializamos sin imagen
        img_src = None

        # Buscamos la figura más cercana que tenga data-aos="img-in"
        figura = a_tag.find_previous('figure', attrs={"data-aos": "img-in"}) or a_tag.find_next('figure', attrs={"data-aos": "img-in"})
        if figura:
            img_tag = figura.find('img')
            if img_tag:
                img_src = img_tag.get('data-src') or img_tag.get('src')
                if img_src and img_src.startswith('//'):
                    img_src = 'https:' + img_src

        productos.append({
            "name": nombre,
            "href": href,
            "image": img_src
        })

    return productos



def separar_contenido(d_content, max_length=6000):
    return [d_content[i:i + max_length] for i in range(0, len(d_content), max_length)]

# --------------------------------------- FUNCIONES PARA PARSEAR -----------------------------------------------

contexto = (
    "You are tasked with extracting specific information from the following text content: {dom_content}. "
    "Please follow these instructions carefully:\n\n"
    "1. Extract only the data that directly matches this description: {description}.\n"
    "2. Do not add comments, explanations, or any extra text.\n"
    "3. If no data is found, say 'No match found'.\n"
    "4. Return only the requested output."
)

modelo = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0,
    google_api_key=api_key
)



def parsear(chunks, description):
    prompt = ChatPromptTemplate.from_template(contexto)
    chain = prompt | modelo
    parsed_results = []

    for i, chunk in enumerate(chunks, start=1):
        print(f"Parseando chunk {i} de {len(chunks)}...")
        respuesta = chain.invoke({"dom_content": chunk, "description": description})
        raw_output = respuesta.content.strip()

        # Intentar extraer un JSON válido desde la respuesta (aunque tenga texto antes/después)
        json_match = re.search(r'\[\s*{.*?}\s*\]', raw_output, re.DOTALL)
        if json_match:
            try:
                productos = json.loads(json_match.group(0))
                # Filtrar productos sin precio
                productos_filtrados = [p for p in productos if p.get("price") is not None]
                parsed_results.extend(productos_filtrados)
            except json.JSONDecodeError:
                print(f"Error al parsear JSON en chunk {i}. Se omitirá.")
        else:
            print(f"No se encontró JSON válido en chunk {i}. Se omitirá.")

    return json.dumps(parsed_results, indent=2, ensure_ascii=False)