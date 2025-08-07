from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import TriageCase, User

# Register TriageCase using the decorator method
@admin.register(TriageCase)
class TriageCaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status')

# Custom admin for User model
class CustomUserAdmin(BaseUserAdmin):
    list_display = ('id', 'username', 'email', 'role', 'is_staff', 'is_active')
    search_fields = ('id', 'username', 'email')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role', 'is_staff', 'is_active')}),
    )
    ordering = ('id',)

# Register the custom User admin
admin.site.register(User, CustomUserAdmin)
