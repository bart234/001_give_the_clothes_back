from django.shortcuts import render, redirect
from app_oddam.models import Donation, Institution
from django.contrib.auth.models import User

from app_oddam.form import FormCreateUser

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
        f = FormCreateUser()
        return render(request, 'register.html', {'f': f})

    def post(self, request):
        form = FormCreateUser(request.POST)
        if form.is_valid():
            pwd = form.cleaned_data['password']
            pwd2 = form.cleaned_data['password2']
            fn = form.cleaned_data['first_name']
            ln = form.cleaned_data['last_name']
            mail = form.cleaned_data['email']

            new_user = User(username=fn+"_"+ln,
                            first_name=fn,
                            last_name=ln,
                            email=mail)
            new_user.set_password(pwd)
            new_user.save()
            return redirect("login_page")