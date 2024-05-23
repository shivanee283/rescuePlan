# from django.shortcuts import render
# from .models import ElectricityBill

# def calculate_bill(request):
#     context = {}
#     if request.method == 'POST':
#         # Assuming you have a form to collect the data
#         # You would process the form data here and create an ElectricityBill instance
#         # For simplicity, let's assume the form data is already validated and available as variables
#         customer_name = request.POST.get('customer_name')
#         start_date = request.POST.get('start_date')
#         end_date = request.POST.get('end_date')
#         kwh_used = request.POST.get('kwh_used')
#         cost_per_kwh = request.POST.get('cost_per_kwh')

#         bill = ElectricityBill(
#             customer_name=customer_name,
#             start_date=start_date,
#             end_date=end_date,
#             kwh_used=kwh_used,
#             cost_per_kwh=cost_per_kwh
#         )
#         bill.calculate_total_cost()
#         bill.save()
#         context['bill'] = bill

#     return render(request, 'bill_calculator/calculate_bill.html', context)

# views.py in your Django app directory

from django.shortcuts import render
from .forms import ElectricityBillForm
from .models import ElectricityBill

def calculate_bill(request):
    if request.method == 'POST':
        form = ElectricityBillForm(request.POST)
        if form.is_valid():
            bill = form.save(commit=False)
            bill.calculate_total_cost()
            bill.save()
            return render(request, 'bill_calculator/bill_result.html', {'bill': bill})
    else:
        form = ElectricityBillForm()

    return render(request, 'bill_calculator/calculate_bill.html', {'form': form})