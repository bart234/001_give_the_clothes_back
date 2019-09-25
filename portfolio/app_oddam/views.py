from django.shortcuts import render
from app_oddam.models import Donation, Institution
from random import sample

# Create your views here.
from django.views import View


class LandingPage(View):
    def get(self, request):
        bags = Donation.objects.filter(quantity__gt=0).count()
        institution = Institution.objects.filter(id__gt=0).count()
        fundation = Institution.objects.filter(type="fundacja").order_by('?')[:3]
        org = Institution.objects.filter(type="organizacja pozarzadowa").order_by('?')[:3]
        lcolection = Institution.objects.filter(type="zbiorka lokalna").order_by('?')[:3]
        return render(request, "index.html", {'bags': bags,
                                              'institution': institution,
                                              'fundation': fundation,
                                              'org': org,
                                              'lcolection': lcolection})

class AddDonation(View):
    def get(self, request):
        return render(request, "form.html")

class Login(View):
    def get(self, request):
        return render(request, 'login.html')

class Register(View):
    def get(self, request):
        return render(request, 'register.html')