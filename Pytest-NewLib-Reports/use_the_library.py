from mylib.operations import increment, factorial, is_prime


def display_menu():
    print("Welcome! Please choose one of the available operations to perform:")
    print("1. Increment a number by 1")
    print("2. Calculate the factorial of a number")
    print("3. Check if a number is a prime number")


def get_user_choice():
    display_menu()
    while True:
        choice = input("Enter the number corresponding to your choice (1, 2, or 3): ")
        if choice in ['1', '2', '3']:
            return choice
        else:
            print("Invalid choice. Please select 1, 2, or 3.")


def get_number_from_user():
    while True:
        try:
            return int(input("Enter a number: "))
        except ValueError:
            print("Invalid input. Please enter a valid integer.")


def perform_operation(choice, number):
    if choice == '1':
        result = increment(number)
        print(f"Result after incrementing {number} by 1: {result}")
    elif choice == '2':
        factorial_result = factorial(number)
        if isinstance(factorial_result, int):
            print(f"The factorial of {number} is: {factorial_result}")
            print(
                f"The factorial of {number} (denoted as {number}!) is the product of all positive integers up to {number}.")
        else:
            print(factorial_result)
    elif choice == '3':
        prime_check = is_prime(number)
        print(f"Prime check result for {number}: {prime_check}")
        if prime_check == f"{number} is a prime number.":
            print(
                f"A prime number is a number greater than 1 that has no positive divisors other than 1 and itself. Therefore, {number} is prime.")
        else:
            print(
                f"A prime number has no positive divisors other than 1 and itself. {number} is not a prime number because it has additional divisors.")


def main():
    choice = get_user_choice()
    number = get_number_from_user()
    perform_operation(choice, number)


if __name__ == "__main__":
    main()