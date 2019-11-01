from django.shortcuts import render, redirect, HttpResponse
from app_oddam.models import Donation, Institution, Category
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from app_oddam.form import FormCreateUser, FormLoginUser
from app_oddam.site_set import FUNDACJA, ORGANIZACJA_PZ, ZBIORKA_L, INST_NUMBERS, OUR_MAIL, INST_PAGIN_NUMBER
from django.core.mail import send_mail
from django.core.paginator import Paginator

# Create your views here.
from django.views import View


class InstitutionLists(View):
    def get(self,request,tab):
        # fundation = Institution.objects.filter(type="fundacja").all()
        # inst_pagi = Paginator(fundation, 2)
        # page = request.GET.get('page')
        # inst_pag_result = inst_pagi.get_page(page)
                # return render(request, "index.html", {'bags': bags,
                #                               'institution': institution,
                #                               'fundation': fundation,
                #                               # 'fundation': inst_pag_result,
                #                               'org': org,
                #                               'lcolection': lcolection})
        if tab == 'fd':         
            coll1 = Institution.objects.filter(type="{}".format(FUNDACJA)).all()
        elif tab == 'og':
            coll1 = Institution.objects.filter(type="{}".format(ORGANIZACJA_PZ)).all()  
        elif tab == 'zl':
            coll1 = Institution.objects.filter(type="{}".format(ZBIORKA_L)).all()

        pagi_inst = Paginator(coll1, INST_PAGIN_NUMBER)
        page = request.GET.get('page')
        coll = pagi_inst.get_page(page)
        return render(request, 'inst_list.html',{'coll':coll, 't':tab})


class SendMail(View):
    def get(self, request):
        send_mail("test 1 2 3 ",
                      "sdfdasfdasfsdf",
                      'bart234_bart@wp.pl',
                  ['bart234_bart@wp.pl'],
                  fail_silently=False)
        return HttpResponse("Mail sended")


class LandingPage(View):
    def get(self, request):
        bags = Donation.objects.filter(quantity__gt=0).count()
        institution = Institution.objects.filter(id__gt=0).count()
        fundation = Institution.objects.filter(type='{}'.format(FUNDACJA)).order_by('?')[:INST_NUMBERS]
        org = Institution.objects.filter(type="{}".format(ORGANIZACJA_PZ)).order_by('?')[:INST_NUMBERS]
        lcolection = Institution.objects.filter(type="{}".format(ZBIORKA_L)).order_by('?')[:INST_NUMBERS]

        return render(request, "index.html", {'bags': bags,
                                              'institution': institution,
                                              'fundation': fundation,
                                              # 'fundation': inst_pag_result,
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
        zip_code = request.POST['postcode']
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
            pwd2 = form.cleaned_data['password2']
            fn = form.cleaned_data['first_name']
            ln = form.cleaned_data['last_name']
            mail = form.cleaned_data['email']
            msg = []

            if User.objects.filter(email=mail).count() != 0:
                msg.append('Email in use')
            if User.objects.filter(username=username).count() != 0:
                msg.append('Login in use')
            if pwd != pwd2:
                msg.append('Password dont match')
            if len(pwd) < 6 or len(pwd2) < 6:
                msg.append('Password is too short')
            num_count = sum(1 if a.isdigit() else 0 for a in pwd)
            if num_count < 1:
                msg.append('Password require one number')
            cap_count = sum(1 if a.isupper() else 0 for a in pwd)
            if cap_count < 1:
                msg.append('Password require one capital')
            if len(msg) > 0:
                messages.warning(request, ','.join(msg))
                return redirect('register_page')

            try:
                new_user = User(username=username,
                                first_name=fn,
                                last_name=ln,
                                email=mail)
                new_user.set_password(pwd)
                new_user.save()
                messages.success(request, 'Konto zostalo utworzone')
                return redirect("landing_page")

            except:
                messages.warning(request, 'Formularz zostal blednie wypelniony')
                return redirect('register_page')

        else:
            messages.success(request, 'Formularz zostal blednie wypelniony')
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
            if u.email != new_mail and new_mail != "":
                u.email = new_mail
            if u.first_name != new_fn and new_fn != "":
                u.first_name = new_fn
            if u.last_name != new_ln and new_ln != "":
                u.last_name = new_ln
            if new_pswd == new_pswd_rep and new_pswd != "":
                u.set_password(new_pswd)
            u.save()
            messages.success(request, 'Zmiana zostala zapisana')
            return redirect("user_edit")

        else:
            messages.error(request, 'Bledne haslo')
            return redirect("user_edit")
