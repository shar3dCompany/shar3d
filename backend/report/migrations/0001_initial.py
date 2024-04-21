# Generated by Django 5.0.2 on 2024-04-06 16:46

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0008_merge_20240322_1712'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('reason', models.CharField(choices=[('P', 'Problema de calidad'), ('D', 'Derecho de Autor'), ('E', 'Problemas de envio/logistica'), ('C', 'Comportamiento abusivo del vendedor/comprador'), ('S', 'Spam o publicidad'), ('F', 'Fraude o estafa'), ('R', 'Robo de diseño/idea'), ('I', 'Inapropiado')], max_length=1)),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('author_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author_user', to=settings.AUTH_USER_MODEL)),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='products.product')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
