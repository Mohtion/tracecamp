from django.db import models

class Kickstarter_data(models.Model):
    backers_count = models.IntegerField()
    blurb = models.CharField(max_length= 180)
    converted_pledged_amount = models.IntegerField()