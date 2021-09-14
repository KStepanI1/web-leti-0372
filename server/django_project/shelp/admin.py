from django.contrib import admin

from .models import User, Subject, ZoomLink, Teacher, Timetable, Weekday, Homework


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "user_id", "name", "username", "created_at")


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


@admin.register(ZoomLink)
class ZoomLinkAdmin(admin.ModelAdmin):
    list_display = ("id", "subject", "type")


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ("id", "last_name", "first_name", "middle_name", "subject", "type")


@admin.register(Timetable)
class TimetableAdmin(admin.ModelAdmin):
    list_display = ("id", "weekday", "subject", "lesson_number", "even_week", "odd_week")


@admin.register(Weekday)
class WeekdayAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "code")


@admin.register(Homework)
class HomeworkAdmin(admin.ModelAdmin):
    list_display = ("id", "subject", "description", "date")