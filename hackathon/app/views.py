from django.shortcuts import render, redirect
import base64
from .models import Fake, MarkExample, StampExample, Diary
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

def home(request):
    return render(request, 'home.html')

# Create your views here.
def fake (request) :
    stampExample1 = StampExample.objects.filter(pk=1)
    stampExample2 = StampExample.objects.filter(pk=2)
    stampExample3 = StampExample.objects.filter(pk=3)
    stampImg1 = stampExample1[0].base_img
    stampImg2 = stampExample2[0].base_img
    stampImg3 = stampExample3[0].base_img

    markExample1 = MarkExample.objects.filter(pk=1)
    markExample2 = MarkExample.objects.filter(pk=2)
    markExample3 = MarkExample.objects.filter(pk=3)
    markImg1 = markExample1[0].base_img
    markImg2 = markExample2[0].base_img
    markImg3 = markExample3[0].base_img

    first_fake = Fake.objects.filter(pk=1)
    title = first_fake[0].title
    content = first_fake[0].content
    sign = first_fake[0].sign
    img = first_fake[0].base_img
    # fames = Fake

    return render(request, 'fake.html', {'title': title, 'content': content, 'sign': sign, 'img':img, 'markImg1': markImg1, 'markImg2': markImg2, 'markImg3': markImg3, 'stampImg1': stampImg1, 'stampImg2': stampImg2, 'stampImg3': stampImg3})

@csrf_exempt
def create_fake(request):
     if (request.method == 'POST'):
        request_body = json.loads(request.body)
        
        new_fake = Fake.objects.create(
            title = request_body['title'],
            content = request_body['content'],
            sign = request_body['sign'],
            base_img = request_body['img']
        )
        
        response = {
            'success': True
        }
        return HttpResponse(json.dumps(response))
     
@csrf_exempt
def create_diary(request):
     if (request.method == 'POST'):
        request_body = json.loads(request.body)
        
        new_diary = Diary.objects.create(
            title = request_body['title'],
            content = request_body['content'],
            base_img = request_body['img']
        )
        
        response = {
            'success': True
        }
        return HttpResponse(json.dumps(response))

def diary(request):
    first_diary = Diary.objects.filter(pk=1)
    title = first_diary[0].title
    content = first_diary[0].content
    image = first_diary[0].base_img
    return render(request, 'diary.html', {'title': title, 'content': content, 'image' : image})