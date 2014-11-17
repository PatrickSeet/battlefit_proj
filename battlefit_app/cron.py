import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from battlefit_app.models import Data

__author__ = 'j3dev'


@csrf_exempt
def fetch_routine(request):
    if request.method == 'GET':
        data = json.loads(request.body)
        for i in data:
            Data.objects.get_or_create(
                date = i['date'],
                activity_title = i['activity_title'],
                activity_type = i['activity_type'],
                member = request.user
            )
    return HttpResponse(content_type='application.json')