from django.shortcuts import render, redirect, HttpResponse
from app_oddam.models import Donation, Institution, Category
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from app_oddam.form import FormCreateUser, FormLoginUser
from django.core.paginator import Paginator

# Create your views here.
from django.views import View


class LandingPage(View):
    def get(self, request):
        bags = Donation.objects.filter(quantity__gt=0).count()
        institution = Institution.objects.filter(id__gt=0).count()
        fundation = Institution.objects.filter(type="fundacja").order_by('?')[:3]

        # fundation = Institution.objects.filter(type="fundacja").all()
        # inst_pagi = Paginator(fundation, 2)
        # page = request.GET.get('page')
        # inst_pag_result = inst_pagi.get_page(page)

        org = Institution.objects.filter(type="organizacja pozarzadowa").order_by('?')[:3]
        # org_pagi = Paginator(org, 2)
        # page2 = request.GET.get('page')
        # org_pag_result = org_pagi.get_page(page2)

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
            username = form.cleaned_data['username']
            user = authenticate(request, username=username, password=pwd)
            if user is not None:
                login(request, user)
                messages.success(request, 'Zalogowano')
                return redirect('landing_page')
            else:
                messages.error(request, 'Haslo lub login sa nieprawidlowe')
                return redirect('register_page')
        else:
            messages.error(request, 'Wystapil blad, sprobuj jeszcze raz')
            return redirect('login_page')


class Logout(View):
    def get(self, request):
        logout(request)
        messages.success(request, 'Wylogowano')
        return redirect('landing_page')


class Register(View):
    def get(self, request):
        f = FormCreateUser()
        return render(request, 'register.html', {'f': f})

    def post(self, request):
        form = FormCreateUser(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            pwd = form.cleaned_data['password']
            fn = form.cleaned_data['first_name']
            ln = form.cleaned_data['last_name']
            mail = form.cleaned_data['email']

            new_user = User(username=username,
                            first_name=fn,
                            last_name=ln,
                            email=mail)
            new_user.set_password(pwd)
            new_user.save()
            messages.success(request, 'Konto zostalo utworzone')
            return redirect("landing_page")
        else:
            messages.success(request, 'Wystapil blad, sprobuj jeszcze raz')
            return redirect("register_page")


class UserSite(View):
    def get(self, request):
        don_list = Donation.objects.filter(user_id=request.user.id)
        return render(request, "user_site.html", {'user': User.objects.get(username=request.user.username),
                                                  'don_list': don_list})

    def post(self, request):
        don_id = Donation.objects.get(id=request.POST["inst_id"])
        don_id.is_taken = True
        don_id.save()
        messages.success(request, 'Zmiana zostala zapisana')
        return redirect("user_site")


class UserEdit(View):
    def get(self, request):
        return render(request, "user_edit.html", {'user': User.objects.get(username=request.user.username)})

    def post(self, request):
        u = User.objects.get(username=request.user.username)
        new_mail = request.POST['email']
        new_fn = request.POST['first_name']
        new_ln = request.POST['last_name']
        new_pswd = request.POST['new_pswd']
        new_pswd_rep = request.POST['new_pswd_rep']
        old_psswd = request.POST['old_psswd']

        if u.check_password(old_psswd):
            if u.email != new_mail and new_mail == "" :
                u.email = new_mail
            if u.first_name != new_fn and new_fn == "":
                u.first_name = new_fn
            if u.last_name != new_ln:
                u.last_name = new_ln
            if new_pswd == new_pswd_rep and new_pswd != "" :
                u.set_password(new_pswd)
            u.save()
            messages.success(request, 'Zmiana zostala zapisana')
            return redirect("user_edit")

        else:
            messages.error(request, 'Bledne haslo')
            return redirect("user_edit")


