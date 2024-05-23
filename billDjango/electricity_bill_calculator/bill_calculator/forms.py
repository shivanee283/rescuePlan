from django import forms
from .models import ElectricityBill

class ElectricityBillForm(forms.ModelForm):
    class Meta:
        model = ElectricityBill
        fields = ['customer_name', 'start_date', 'end_date', 'kwh_used', 'cost_per_kwh']