from django.db import models

class ElectricityBill(models.Model):
    customer_name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    kwh_used = models.DecimalField(max_digits=10, decimal_places=2)
    cost_per_kwh = models.DecimalField(max_digits=5, decimal_places=2)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def calculate_total_cost(self):
        self.total_cost = self.kwh_used * self.cost_per_kwh
        self.save()