# Generated by Django 5.0.2 on 2024-04-17 10:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0013_alter_orderactiontoken_expires_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderactiontoken',
            name='expires_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 4, 22, 10, 11, 2, 342330, tzinfo=datetime.timezone.utc)),
        ),
    ]
