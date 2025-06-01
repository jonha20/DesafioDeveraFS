from fastapi import FastAPI, HTTPException     
from pydantic import BaseModel            
from typing import List                                             
from utils3 import scrapear_web,separar_contenido,parsear,extraer_productos,extraer,limpieza
from main2 import primer_scraping 
from typing import List, Optional 
import json
from fastapi.responses import JSONResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://deveraai.netlify.app",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

 

class ScrapeRequest(BaseModel):           
    url: str     

class Producto(BaseModel):
    name: str
    href: str
    price: Optional[str] = None
    image: Optional[str] = None
                            
'''class FootprintRequest(BaseModel):       
    productos: List[str] '''    

@app.get("/")
async def inicio():
    return {"message": "Hola, API está corriendo"}

@app.post("/scrapear")
async def scrapear_endpoint(body: ScrapeRequest):
    try:
        resultado_json_text = primer_scraping(body.url)  
        resultado_obj = json.loads(resultado_json_text)  
        return JSONResponse(content=resultado_obj)      
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))