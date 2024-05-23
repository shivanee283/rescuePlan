from django.urls import path
from .views import calculate_bill

urlpatterns = [
    path('calculate/', calculate_bill, name='calculate_bill'),
]
