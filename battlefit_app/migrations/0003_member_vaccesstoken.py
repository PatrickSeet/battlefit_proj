# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('battlefit_app', '0002_auto_20141117_0449'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='vaccesstoken',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
