# Generated by Django 4.1.2 on 2024-02-04 19:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_remove_chat_messages'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='description',
            field=models.TextField(default=''),
        ),
    ]
