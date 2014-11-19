# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('battlefit_app', '0002_auto_20141117_0449'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='pic',
            field=models.ImageField(default=b'/static/media/profile_img/default.png', null=True, upload_to=b'profile_img', blank=True),
            preserve_default=True,
        ),
    ]
