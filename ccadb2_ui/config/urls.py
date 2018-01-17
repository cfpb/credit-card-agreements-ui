from django.conf.urls import url
from ccadb2_ui.views import CCADB2MainView

urlpatterns = [
    url(r'^.*$', CCADB2MainView.as_view()),
]
