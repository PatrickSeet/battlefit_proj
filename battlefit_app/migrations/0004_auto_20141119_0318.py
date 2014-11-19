# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('battlefit_app', '0003_member_vaccesstoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='vaccesstoken',
            field=models.CharField(max_length=100, null=True, blank=True),
            preserve_default=True,
        ),
    ]
