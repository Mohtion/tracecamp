from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from api.models import Kickstarter_data
from api.serializers import KickstarterSerializer
# Create your views here.

@csrf_exempt
def hello_world_response(request):
    return HttpResponse("hello world D:D:D:D:D:")


@csrf_exempt
def api_list(request):
    if request.method == 'GET':
        kickstarters = Kickstarter_data.objects.all()
        serialized_data = KickstarterSerializer(kickstarters, many = True).data
        #output = JSONRenderer().render(serialized_data)
        return JsonResponse(serialized_data, safe = False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serialized_data = KickstarterSerializer(data=data)
        if serialized_data.is_valid():
            serialized_data.save()
            return JsonResponse(serialized_data.data, safe = False, status=201)
        return JsonResponse(serialized_data.errors, status=400)

@csrf_exempt
def api_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Kickstarter_data.objects.get(pk=pk)
    except Kickstarter_data.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serialized_data = KickstarterSerializer(snippet)
        return JsonResponse(serialized_data.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = KickstarterSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()
        return HttpResponse(status=204)