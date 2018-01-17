from django.views.generic.base import TemplateView
from django.conf import settings

try:
    STANDALONE = settings.STANDALONE
except:  # pragma: no cover
    STANDALONE = False


if STANDALONE:
    BASE_TEMPLATE = 'ccadb2_ui/standalone_base.html'
else:  # pragma: no cover
    BASE_TEMPLATE = 'front/base_update.html'

if 'agreements' in settings.INSTALLED_APPS:
    from agreements.models import Agreement
    AGREEMENT_COUNT = Agreement.objects.count()
else:
    AGREEMENT_COUNT is None

no_support = [
    'MSIE 8.0;',
    'MSIE 7.0b;',
    'MSIE 7.0;',
]


class CCADB2MainView(TemplateView):
    template_name = 'ccadb2_ui/ccdb-main.html'
    base_template = BASE_TEMPLATE

    def get_context_data(self, **kwargs):
        # See if an unsupported browser is making the request
        browser = self.request.META['HTTP_USER_AGENT']
        unsupported = any([x for x in no_support if x in browser])

        context = super(CCADB2MainView, self).get_context_data(**kwargs)
        context['ccadb2_base_template'] = self.base_template
        context['unsupported_browser'] = unsupported
        context['agreement_count'] = AGREEMENT_COUNT
        return context
