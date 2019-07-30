import random

horoscope = ["it'll be a rainy day for you", "a quiet day", "stay inside"]

def returnZodiac(month, day):
    if (month == 3 and day >= 21 or month == 4 and day <= 20):
        return "Aries"
    elif (month == 4 and day >= 21 or month == 5 and day <= 21):
        return "taurus"
    elif (month == 5 and day >= 22 or month == 6 and day <= 21):
        return "Gemini"
    elif (month == 6 and day >= 22 or month == 7 and day <= 22):
        return "Cancer"
    elif (month == 7 and day >= 23 or month == 8 and day <= 22):
        return "Leo"
    elif (month == 8 and day >= 23 or month == 9 and day <= 23):
        return "Virgo"
    elif (month == 9 and day >= 24 or month == 10 and day <= 23):
        return "Libra"
    elif (month == 10 and day >= 24 or month == 11 and day <= 22):
        return "Scorpio"
    elif (month == 11 and day >= 23 or month == 12 and day <= 21):
        return "Sagittarius"
    elif (month == 12 and day >= 22 or month == 1 and day <= 20):
        return "Capricorn"
    elif (month == 1 and day >= 21 or month == 2 and day <= 19):
        return "Aquarius"
    else: # elif (month == 2 and day >= 20 or month == 3 and day == 20):
        return "Pisces"

def pickHoroscope (zodiac):
    return (zodiac, random.choice(horoscope))

def main():
    print("Hello, we're going to figure out your horoscope for today")
    month = int(input("\nWhat month were you born? "))
    day = int(input("What day were you born? "))
    zodiac = returnZodiac(month, day)
    print("\nYour zodiac is %s and your horoscope for today is: %s" % pickHoroscope(zodiac))
    
main()