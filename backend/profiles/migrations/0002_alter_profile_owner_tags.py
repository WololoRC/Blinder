# Generated by Django 4.2.1 on 2023-06-05 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='owner_tags',
            field=models.ManyToManyField(blank=True, to='tags.tags'),
        ),
    ]