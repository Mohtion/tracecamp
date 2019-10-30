# Generated by Django 2.2.3 on 2019-07-30 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Kickstarter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('backers_count', models.IntegerField()),
                ('blurb', models.CharField(max_length=180)),
                ('converted_pledged_amount', models.IntegerField()),
            ],
        ),
    ]