# -*- coding: utf-8 -*-
"""
Created on Tue Feb 11 16:34:41 2025

@author: Godfrey
"""

import json
import requests

url = "http://127.0.0.1:8000/diabetes_prediction"

input_data_for_model = {
    "pregnancies" : 6,
   "Glucose" : 148,
   "BloodPressure" : 72,
   "SkinThickness" : 35,
   "Insulin" : 0,
   "BMI" : 33.6,
   "DiabetesPedigreeFunction" : 0.627,
   "Age" : 50
}

response = requests.post(url, json=input_data_for_model)  # FIXED
print(response.status_code)  # Check if request was successful (200)
print(response.json())  # Print API response
