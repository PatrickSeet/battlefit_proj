# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('battlefit_app', '0003_auto_20141119_0351'),
    ]

    operations = [
        migrations.RenameField(
            model_name='member',
            old_name='pic',
            new_name='image',
        ),
    ]
