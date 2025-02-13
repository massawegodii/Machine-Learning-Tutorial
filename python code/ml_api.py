# -*- coding: utf-8 -*-
"""
Created on Sat Feb 11 03:50:57 2025

@author: Godfrey
"""

from fastapi import FastAPI
from pydantic import BaseModel
import pickle

app = FastAPI()

class ModelInput(BaseModel):
    pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int

# Load Model
diabetes_model = pickle.load(open('diabetes_model_fixed.sav.sav', 'rb'))

@app.post("/diabetes_prediction")
def diabetes_pred(input_parameters: ModelInput):
    input_data = input_parameters.dict()  # FIXED
    
    input_list = [
        input_data["pregnancies"], input_data["Glucose"], input_data["BloodPressure"],
        input_data["SkinThickness"], input_data["Insulin"], input_data["BMI"],
        input_data["DiabetesPedigreeFunction"], input_data["Age"]
    ]
    
    prediction = diabetes_model.predict([input_list])[0]  # Get first prediction
    
    return {"prediction": "Diabetic" if prediction == 1 
            else "Not Diabetic"}
