from django.contrib.auth.models import User
from django import forms


class FormCreateUser(forms.Form):
    username = forms.CharField(max_length=120, label='Nazwa uzytkownika', required=True)
    password = forms.CharField(min_length=4, max_length=100, label='Haslo',
                               widget=forms.PasswordInput, required=True)
    password2 = forms.CharField(min_length=4, max_length=100, label='Powtorz haslo',
                                widget=forms.PasswordInput, required=True)
    first_name = forms.CharField(max_length=20, label='Imie', required=True)
    last_name = forms.CharField(max_length=30, label='Nazwisko', required=True)
    email = forms.EmailField(max_length=120, label='Email', required=True)


class FormLoginUser(forms.Form):
    username = forms.CharField(max_length=120, label='username', required=True)
    password = forms.CharField(min_length=4, max_length=100, label='Haslo',
                               widget=forms.PasswordInput, required=True)


class FormCreateGift(forms.Form):
    qty = forms.IntegerField(min_value=1, max_value=99, required=True)
    address = forms.CharField(max_length=20, required=True)
    phone = forms.IntegerField(min_value=1000000000, max_value=999999999, required=True)
    city = forms.CharField(max_length=20, required=True)
    zip_code = forms.CharField(max_length=6, required=True)
    pick_up_dta = forms.DateField(required=True)
    pick_up_time = forms.TimeField(required=True)
    pick_up_comm = forms.CharField(max_length=120, required=False)
    inst_id = forms.IntegerField(required=True)
    user_id = forms.IntegerField(required=True)