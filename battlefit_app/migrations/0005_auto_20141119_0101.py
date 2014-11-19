# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('battlefit_app', '0004_auto_20141119_0059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='pic',
            field=models.ImageField(default=b'/profile_img/default.png', null=True, upload_to=b'profile_img', blank=True),
            preserve_default=True,
        ),
    ]
