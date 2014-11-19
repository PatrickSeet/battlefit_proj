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
            name='gender',
            field=models.CharField(blank=True, max_length=1, null=True, choices=[(b'F', b'Female'), (b'M', b'Male')]),
            preserve_default=True,
        ),
    ]
