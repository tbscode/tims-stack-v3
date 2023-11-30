# Generated by Django 4.1.2 on 2023-07-03 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_remove_changehistory_user_changehistory_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='changes',
            field=models.ManyToManyField(blank=True, null=True, related_name='user_profile_changes', to='core.changehistory'),
        ),
    ]
