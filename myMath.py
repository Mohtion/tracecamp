basic_list = []
for num in range(10):
    basic_list.append(1 + num)
for num in range(10): 
    basic_list[num] = basic_list[num] + 2

print("2 added to each number regular way: " + str(basic_list) )

basic_list2 = []
for num in range(10):
    basic_list2.append(1 + num)
basic_list2 = [num + 2 for num in basic_list2]

print("\n2 added to each number comprehensive way: " + str(basic_list2) )

list_cubed = []
for num in range(10):
    list_cubed.append((1 + num)**3)

print("\nThe list cubed: " + str(list_cubed) )

list_div3 = []
for num in range(10):
    if (num + 1) % 3 == 0:
        list_div3.append((1 + num))

print("\nThe list but only with numbers divisible by 3: " + str(list_div3) )


