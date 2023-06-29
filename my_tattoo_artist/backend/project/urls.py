from django.urls import path
from . import views

urlpatterns = [
    path('api/tattoo-style/', views.tattoo_style_list),
]