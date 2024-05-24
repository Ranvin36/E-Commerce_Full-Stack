

import os
# from django.conf.urls import url

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
application = get_asgi_application()
