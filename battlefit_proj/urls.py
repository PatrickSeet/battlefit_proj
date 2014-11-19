from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.static import static
from battlefit_proj import settings

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'fit.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^create/$', 'battlefit_app.views.create_group', name='create_group'),
    url(r'^group/(?P<group_id>\w+)/$', 'battlefit_app.views.group', name='group'),
    url(r'^load_group/$', 'battlefit_app.views.load_group', name='load_group'),
    url(r'^user_dashboard/$', 'battlefit_app.views.user_dashboard', name='user_dashboard'),
    # ajax
    url(r'^new_calories_consume/$', 'battlefit_app.views.new_calories_consume', name='new_calories_consume'),
    url(r'^new_calories_burned/$', 'battlefit_app.views.new_calories_burned', name='new_calories_burned'),
    url(r'^new_body_fat/$', 'battlefit_app.views.new_body_fat', name='new_body_fat'),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'battlefit_app.views.index', name='index'),
    url(r'^home/$', 'battlefit_app.views.home', name='home'),

    # register log in and out
    url(r'^register/$', 'battlefit_app.views.register', name='register'),
    url(r'^login/$', 'django.contrib.auth.views.login', name='login'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/login/'}, name='logout'),
    url(r'^profile/$', 'battlefit_app.views.profile', name='profile'),

    #password reset
    url(r'^password_reset/$', 'django.contrib.auth.views.password_reset', name='password_reset'),
    url(r'^password_reset/done/$', 'django.contrib.auth.views.password_reset_done', name='password_reset_done'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        'django.contrib.auth.views.password_reset_confirm',
        name='password_reset_confirm'),
    url(r'^reset/done/$', 'django.contrib.auth.views.password_reset_complete', name='password_reset_complete'),


)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)