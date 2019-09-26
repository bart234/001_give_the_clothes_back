from django.contrib.auth.models import User
from django import forms


class FormCreateUser(forms.Form):
    password = forms.CharField(min_length=4, max_length=100, label='Haslo',
                               widget=forms.PasswordInput, required=True)
    password2 = forms.CharField(min_length=4, max_length=100, label='Powtorz haslo',
                                widget=forms.PasswordInput, required=True)
    first_name = forms.CharField(max_length=20, label='Imie', required=True)
    last_name = forms.CharField(max_length=30, label='Nazwisko', required=True)
    email = forms.EmailField(max_length=120, label='Email', required=True)