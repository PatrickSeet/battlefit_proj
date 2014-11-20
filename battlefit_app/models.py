# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class Member(AbstractUser):
    FEMALE = 'F'
    MALE = 'M'
    score = models.IntegerField(null=True, blank=True)
    image = models.ImageField(null=True, upload_to='profile_img', default='profile_img/default.png')
    weight = models.FloatField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    GENDER_CHOICES = (
        (FEMALE, 'Female'),
        (MALE, 'Male'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    vid = models.CharField(max_length=100, null=True, blank=True)
    wincount = models.IntegerField(null=True, blank=True)
    vaccesstoken = models.CharField(max_length=100, null=True, blank=True)

    def __unicode__(self):
        return unicode(self.username)

    def get_bmr(self):
        if self.gender == 'F':
            bmr = 655 + ( 4.35 * self.weight) + ( 4.7 * self.height) - ( 4.7 * self.age)
        else:
            bmr =  66 + ( 6.23 * self.weight ) + ( 12.7 * self.height) - ( 6.8 * self.age)
        return bmr


class Group(models.Model):
    WEIGHT_LOSS = 'W'
    HEALTH = 'H'
    FITNESS = 'F'
    CATEGORY_CHOICES = (
        (WEIGHT_LOSS, 'Weight Loss'),
        (HEALTH, 'Health'),
        (FITNESS, 'Fitness'),
    )
    category = models.CharField(max_length=1, choices=CATEGORY_CHOICES, default='W')
    name = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    goal = models.FloatField(null=True, blank=True)
    member = models.ManyToManyField(Member, related_name='member')

    def __unicode__(self):
        return u"{}".format(self.name)


class GroupAdmin(models.Model):
    admin = models.BooleanField(default=False)
    user = models.ForeignKey(Member, related_name='administrator')
    group = models.ForeignKey(Group, related_name='administrator')

    def __unicode__(self):
        return u"{}".format(self.group)


class Data(models.Model):
    calories_consumed = models.FloatField(null=True, blank=True)
    calories_burned = models.FloatField(null=True, blank=True)
    date = models.CharField(max_length=200)
    body_fat = models.FloatField(null=True, blank=True)
    activity_type = models.CharField(max_length=200)
    activity_title = models.CharField(max_length=200)
    member = models.ForeignKey(Member, related_name='data')

    def __unicode__(self):
        return u"{} {}".format(self.activity_type, self.activity_title)