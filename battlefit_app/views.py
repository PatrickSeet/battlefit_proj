import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse
import operator
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render, render_to_response
from django.views.decorators.csrf import csrf_exempt
from battlefit_app.forms import GroupForm, UserCreationForm
from battlefit_app.models import Group, Member, Data


@login_required
def create_group(request):
    if request.method == "POST":
        form = GroupForm(request.POST)
        if form.is_valid():
            if form.save():
                return redirect("/")
    else:
        form = GroupForm()
    data = {'form': form}
    return render(request, "create_group.html", data)

def group_overview(member):
    groups = Group.objects.filter(member=member)
    member = Member.objects.get(id=member.id)
    bmr = member.get_bmr()
    group_scores = {}
    for group in groups:
        goal = (group.goal / 100) * bmr
        data_group = []
        group_scores = {}
        data = Data.objects.filter(member = member, date__range=[group.start_date, group.end_date])
        if group.category == 'W':
            for datum in data:
                if datum.calories_burned is not None:
                    data_group.append(datum.calories_burned)
                else:
                    pass
            data_w = sum(data_group)/len(data_group)
            score = (goal - data_w) / goal
            #group_scores[group.name] = score
        elif group.category == 'H':
            for datum in data:
                if datum.calories_consumed is not None:
                    data_group.append(datum.calories_consumed)
                else:
                    pass
            data_h = sum(data_group)/len(data_group)
            score = (goal - data_h) / goal
            #group_scores[group.name] = score
        else:
            for datum in data:
                if datum.body_fat is not None:
                    data_group.append(datum.body_fat)
                else:
                    pass
            score = sum(data_group)/len(data_group)
        group_scores[group] = score
        print group_scores
    return group_scores

@login_required
def group(request, group_id):
    group = Group.objects.get(id=group_id)
    print group
    data = Data.objects.filter(member = request.user, date__range=[group.start_date, group.end_date])
    member_data = []
    data_group = []
    member_score = {}
    scores = []
    member = Member.objects.get(id=request.user.id)
    bmr = member.get_bmr()
    goal = (group.goal / 100) * bmr
    print data
    if group.category == 'W':
        for datum in data:
            if datum.calories_burned is not None:
                data_group.append(datum.calories_burned)
            else:
                pass
        print data_group
        data_w = sum(data_group)/len(data_group)
        score = (goal - data_w) / goal
        scores.append(score)
        members = group.member.all()
        for member in members:
            member_dataset = []
            data = Data.objects.filter(member=member, date__range=[group.start_date, group.end_date])
            for d in data:
                if d.calories_burned is not None:
                    member_dataset.append(d.calories_burned)
                    member_data.append(d.calories_burned)
            member_avg = 12 #sum(member_dataset)/len(member_dataset)
            mem_score = (goal - member_avg) / goal
            scores.append(mem_score)
            member_score[member.username] = mem_score

    elif group.category == 'H':
        for datum in data:
            if datum.calories_consumed is not None:
                data_group.append(datum.calories_consumed)
            else:
                pass
        data_h = sum(data_group)/len(data_group)
        score = (data_h - goal) / data_h
        scores.append(score)

        members = group.member.all()
        for member in members:
            member_dataset = []
            data = Data.objects.filter(member=member, date__range=[group.start_date, group.end_date])
            for d in data:
                if d.calories_consumed is not None:
                    member_data.append(d.calories_consumed)
                    member_dataset.append(d.calories_consumed)
                else:
                    pass

            member_avg = 13 #sum(member_dataset)/len(member_dataset)
            mem_score = (goal - member_avg) / goal
            scores.append(mem_score)
            member_score[member.username] = mem_score
    else:
        for datum in data:
            if datum.body_fat is not None:
                data_group.append(datum.body_fat)
            else:
                pass
        # if len(group_data) == 0
        score = sum(data_group)/len(data_group)
        scores.append(score)
        members = group.member.all()
        for member in members:
            member_dataset = []
            data = Data.objects.filter(member=member, date__range=[group.start_date, group.end_date])
            for d in data:
                if d.calories_consumed is not None:
                    member_data.append(d.body_fat)
                    member_dataset.append(d.body_fat)
                else:
                    pass
            mem_score = 50 #sum(member_dataset)/len(member_dataset)
            scores.append(mem_score)
            member_score[member.username] = mem_score
    group_avg = sum(scores)/len(scores)
    print scores
    sorted_scores = sorted(member_score.items(), key=operator.itemgetter(1))
    sorted_scores.reverse()
    winner = sorted_scores[0]
    data = {
        "group_avg":group_avg,
        "score":score,
        "group":group,
        "winner_score" : winner[1],
        "winner_name" : winner[0]
    }

    return render(request, "group.html", data)

def index(request):
    return render(request, "landing.html")

@login_required
def home(request):
    return render(request, "home.html")

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            user = form.save()
            # user.email_user("Welcome!", "Thank you for signing up for our website.")
            # text_content = 'Thank you for signing up for our website, {}'.format(user.username)
            # html_content = '<h2>Thanks {} {}for signing up!</h2> <div>I hope you enjoy using our site</div><div>Signed up on {}'.format(
            #     user.first_name, user.last_name, user.date_joined)
            # msg = EmailMultiAlternatives("Welcome!", text_content, settings.DEFAULT_FROM_EMAIL, [user.email])
            # msg.attach_alternative(html_content, "text/html")
            # msg.send()
            return redirect("/profile")
    else:
        form = UserCreationForm()

    return render(request, "registration/register.html", {
        'form': form,
    })
# def register(request):
#     if request.method == 'POST':
#         form = EmailUserCreationForm(request.POST, request.FILES)
#         if form.is_valid():
#             username = request.POST['username']
#             password = request.POST['password1']
#             form.save()
#             user = authenticate(username=username, password=password)
#             if user is not None:
#                 if user.is_active:
#                     login(request, user)
#                     return redirect("profile")
#     else:
#         form = EmailUserCreationForm()
#     return render(request, "registration/register.html", {'form': form})


@login_required
def profile(request):
    if not request.user.is_authenticated():
        return redirect("registration/login")
    return render(request, "registration/profile.html")


@login_required
def user_dashboard(request):
    calories_consume = []
    calories_burned = []
    body_fat = []
    consume_data = Data.objects.filter(member=request.user, activity_type="meal")
    for i in consume_data:
        calories_consume.append({
            'calories_consumed': i.calories_consumed,
            'date': i.date.split('T')[0],
            'time': i.date.split('T')[1].split('+')[0],
            'activity_title': i.activity_title,
        })
    burned_data = Data.objects.filter(member=request.user, activity_type="exercise")
    for i in burned_data:
        calories_burned.append({
            'calories_burned': i.calories_burned,
            'date': i.date.split('T')[0],
            'time': i.date.split('T')[1].split('+')[0],
            'activity_title': i.activity_title,
        })
    fat_data = Data.objects.filter(member=request.user, activity_type="fitness")
    for i in fat_data:
        body_fat.append({
            'date': i.date.split('T')[0],
            'time': i.date.split('T')[1].split('+')[0],
            'body_fat': i.body_fat*100
        })

    try:
        group_data = group_overview(request.user)
        print group_data
    except:
        group_data = {}

    return render(request, 'user_dashboard.html', {
        'calories_consume': calories_consume,
        'calories_burned': calories_burned,
        'body_fat': body_fat,
        'group_data' : group_data
    })


@csrf_exempt
def new_calories_consume(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        for i in data:
            Data.objects.get_or_create(
                calories_consumed = i['calories_consumed'],
                date = i['date'],
                activity_title = i['activity_title'],
                activity_type = i['activity_type'],
                member = request.user
            )
    return HttpResponse(content_type='application.json')


@csrf_exempt
def new_calories_burned(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        for i in data:
            Data.objects.get_or_create(
                calories_burned = i['calories_burned'],
                date = i['date'],
                activity_title = i['activity_title'],
                activity_type = i['activity_type'],
                member = request.user
            )
    return HttpResponse(content_type='application.json')

@csrf_exempt
def new_body_fat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        Data.objects.get_or_create(
            date = "2014-10-31T11:54:33+00:00",
            activity_type = "fitness",
            body_fat = data,
            member = request.user)

    return HttpResponse(content_type='application.json')