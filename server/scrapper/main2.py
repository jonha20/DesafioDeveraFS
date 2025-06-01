from utils3 import scrapear_web, extraer, limpieza, separar_contenido, parsear,extraer_productos

def primer_scraping(url):
    html = scrapear_web(url)
    body = extraer(html)
    href = extraer_productos(body)
    chunks = separar_contenido(href)

    descripcion = (
    "You are extracting real products from a web page.\n"
    "For each product, return the following fields:\n"
    "- \"name\": Only the real product name. Do NOT include variants like colors, people's names, shades, or numbers.\n"
    "- \"href\": Full product page URL.\n"
    "- \"price\": Product price as a string (e.g., \"€24.90\"), or null if not available.\n"
    "- \"image\": Direct URL to the main product image (JPG, PNG, or WebP), or null if not available.\n\n"

    "**Important rules:**\n"
    "- DO NOT return color variants, shades, or personal names as products.\n"
    "- DO NOT include prices or numbers in the name.\n"
    "- Skip elements that are not actual products (e.g., ads, navigation bars, cookie banners, etc.).\n"
    "- Image may not be in the same tag — search in surrounding elements.\n"
    "- If price or image is not found, return them as null.\n"

    "**Output format:**\n"
    "Return a JSON array ONLY. Do NOT add explanations, titles, or extra text.\n"
    "Example:\n"
    "[\n"
    "  {\n"
    "    \"name\": \"Moisturizing Face Cream\",\n"
    "    \"href\": \"https://example.com/products/face-cream\",\n"
    "    \"price\": \"€29.90\",\n"
    "    \"image\": \"https://example.com/images/face-cream.jpg\"\n"
    "  },\n"
    "  {\n"
    "    \"name\": \"Gentle Cleanser\",\n"
    "    \"href\": \"https://example.com/products/cleanser\",\n"
    "    \"price\": null,\n"
    "    \"image\": null\n"
    "  }\n"
    "]"
)



    

    resultado = parsear(chunks, descripcion)

    return resultado

if __name__ == "__main__":
    url = input("Introduce la URL de la página: ")
    primer_scraping(url)