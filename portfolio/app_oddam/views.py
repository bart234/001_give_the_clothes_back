from django.shortcuts import render, redirect, HttpResponse
from app_oddam.models import Donation, Institution, Category
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from app_oddam.form import FormCreateUser, FormLoginUser, FormCreateGift

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
        category_list = Category.objects.all()
        inst_list = Institution.objects.all()
        return render(request, "form.html", {'cat_l': category_list,
                                             'inst_l': inst_list})

    def post(self, request):
        qty = request.POST['bags']
        address = request.POST['address']
        phone = request.POST['phone']
        city = request.POST['city']
        zip_code = request.POST['zip_code']
        pick_up_data = request.POST['pick_up_data']
        pick_up_time = request.POST['pick_up_time']
        pick_up_comm = request.POST['pick_up_comm']
        inst_id = request.POST['inst_id']
        user_id = User.objects.get(username=request.user.username).id
        new_donat = Donation(quantity=qty,
                             address=address,
                             phone_number=phone,
                             city=city,
                             zip_code=zip_code,
                             pick_up_date=pick_up_data,
                             pick_up_time=pick_up_time,
                             pick_up_comment=pick_up_comm,
                             institution_id=inst_id,
                             user_id=user_id)
        new_donat.save()
        return redirect("confirm_form")


class Confirm(View):
    def get(self, request):
        return render(request, 'form-confirmation.html')


class Login(View):
    def get(self, request):
        f = FormLoginUser()
        return render(request, 'login.html', {'f': f})

    def post(self, request):
        form = FormLoginUser(request.POST)
        if form.is_valid():
            pwd = form.cleaned_data['password']
            mail = form.cleaned_data['email']
            user = authenticate(request, username=mail, password=pwd)
            if user is not None:
                login(request, user)
                return redirect('landing_page')
            else:
                return redirect('register_page')
        else:
            return redirect('login_page')


class Logout(View):
    def get(self, request):
        logout(request)
        return redirect('landing_page')


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

            new_user = User(username=mail,
                            first_name=fn,
                            last_name=ln,
                            email=mail)
            new_user.set_password(pwd)
            new_user.save()
            return redirect("login_page")


class UserSite(View):
    def get(self, request):
        don_list = Donation.objects.filter(user_id=request.user.id)
        return render(request, "user_site.html", {'user': User.objects.get(username=request.user.username),
                                                  'don_list': don_list})

    def post(self, request):
        don_id = Donation.objects.get(id=request.POST["inst_id"])
        don_id.is_taken = True
        don_id.save()
        return redirect("user_site")

class UserEdit(View):
    def get(self, request):
        return render(request, "user_edit.html", {'user': User.objects.get(username=request.user.username)})

    def post(self,request):
        u = User.objects.get(username=request.user.username)
        pswd = request.POST['psswd']
        new_mail = request.POST['email']
        new_fn = request.POST['first_name']
        new_ln = request.POST['last_name']

