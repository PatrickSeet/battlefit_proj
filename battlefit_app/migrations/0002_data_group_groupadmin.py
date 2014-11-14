# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('battlefit_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('calories_consumed', models.FloatField(null=True, blank=True)),
                ('calories_burned', models.FloatField(null=True, blank=True)),
                ('date', models.CharField(max_length=200)),
                ('body_fat', models.FloatField(null=True, blank=True)),
                ('activity_type', models.CharField(max_length=200)),
                ('activity_title', models.CharField(max_length=200)),
                ('member', models.ForeignKey(related_name='data', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('category', models.CharField(default=b'W', max_length=1, choices=[(b'W', b'Weight Loss'), (b'H', b'Health'), (b'F', b'Fitness')])),
                ('group_name', models.CharField(max_length=200)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('goal', models.FloatField(null=True, blank=True)),
                ('group_member', models.ManyToManyField(related_name='member', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='GroupAdmin',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('admin', models.BooleanField(default=False)),
                ('group', models.ForeignKey(related_name='administrator', to='battlefit_app.Group')),
                ('user', models.ForeignKey(related_name='administrator', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
