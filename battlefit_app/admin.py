from django.contrib import admin
from battlefit_app.models import Member, Group, GroupAdmin, Data

# Register your models here.
admin.site.register(Member)
admin.site.register(Group)
admin.site.register(GroupAdmin)
admin.site.register(Data)