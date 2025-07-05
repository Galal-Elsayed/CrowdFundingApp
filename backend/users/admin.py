from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    
    list_display = ('email', 'first_name', 'last_name', 'phone', 'is_staff')
    
    ordering = ('email',)
    
    # Update fieldsets to remove username field
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'phone')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    # add_fieldsets for creating new users
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'phone', 'password1', 'password2'),
        }),
    )
    
    search_fields = ('email', 'first_name', 'last_name', 'phone')
    
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')

admin.site.register(CustomUser, CustomUserAdmin)
