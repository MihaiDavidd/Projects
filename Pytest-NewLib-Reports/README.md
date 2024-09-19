## My Library Operations

![Python](https://img.shields.io/badge/Python-3.10-blue.svg)

This project is a command-line application designed to help you perform essential arithmetic and number theory operations. With this application, you can effortlessly increment a number, calculate the factorial of a given number, and determine whether a number is prime.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Example Interaction](#example-interaction)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure-)
- [Running Tests](#running-tests)

## Features
- **Increment a number by 1**: Simple incrementation operation.
- **Calculate the factorial of a number**: Computes the factorial, which is the product of all positive integers up to that number.
- **Check if a number is a prime number**: Determines whether a given number is prime.

## Prerequisites
- Python 3.10 or higher should be installed on your system.
- If Python is not installed, follow the instructions [here](https://www.python.org/downloads/).

## Installation
1. **Clone the repository** (or download the source code):
    ```sh
    git clone https://github.com/yourusername/mylibrary-operations.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd mylibrary-operations
    ```

3. **Set up a virtual environment**:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

4. **Install required dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

## Usage
To run the program, use the following command in your terminal:
```sh
python use_the_library.py
```

When you run the script, you will be prompted with a menu to choose an operation. Enter the corresponding number to select an option.

## Example Interaction

### Sample Run
```plaintext
Welcome! Please choose one of the available operations to perform:
1. Increment a number by 1
2. Calculate the factorial of a number
3. Check if a number is a prime number
Enter the number corresponding to your choice (1, 2, or 3): 2
Enter a number: 5
The factorial of 5 is: 120
```

### Handling Invalid Input
The program will guide you to correct your input in case of any errors:
```plaintext
Invalid choice. Please select 1, 2, or 3.
Enter the number corresponding to your choice (1, 2, or 3): 4
Invalid choice. Please select 1, 2, or 3.
Enter the number corresponding to your choice (1, 2, or 3): 2

Enter a number: five
Invalid input. Please enter a valid integer.
Enter a number: 5
The factorial of 5 is: 120
```

## Getting Started
Here's a quick guide to get you up and running:
1. Ensure you have Python 3.10 or higher installed.
2. Clone the repository.
3. Navigate to the project directory.
4. Set up the virtual environment and install dependencies.
5. Run the application using `python use_the_library.py`.

## Project Structure :

    ├── mylib/
    │   ├── __init__.py
    │   ├── operations.py
    ├── tests/
    │   ├── __init__.py
    │   ├── test_operations.py
    ├── use_the_library.py
    ├── README.md
    ├── requirements.txt

- **mylib/**: Contains the library operations for the application.
- **tests/**: Contains test cases for the library operations.
- **use_the_library.py**: The main script to run the command-line application.
- **requirements.txt**: Contains the list of dependencies.
- **README.md**: Documentation file.

## Running Tests
To run the tests, use the following command:
```sh
python -m unittest discover tests
```

To generate report, use the following command:
```sh
python3 tests/run_tests.py
```

After making this change, the anchor link should resolve correctly without any warnings.