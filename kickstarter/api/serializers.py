from rest_framework import serializers
from api.models import Kickstarter_data


class KickstarterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kickstarter_data
        fields = [
                'backers_count', 
                'blurb', 
                'converted_pledged_amount',
                'id'
        ]
        read_only_fields = ['id']