import unittest
import xmlrunner
from mylib.operations import increment, factorial, is_prime


class TestOperations(unittest.TestCase):

    def test_increment(self):
        # Test incrementing positive integers
        self.assertEqual(increment(4), 5)
        self.assertEqual(increment(1), 2)

        # Test incrementing zero
        self.assertEqual(increment(0), 1)

        # Test incrementing negative integers
        self.assertEqual(increment(-1), 0)
        self.assertEqual(increment(-10), -9)

        # Test incrementing large integers
        large_number = 1000000
        self.assertEqual(increment(large_number), large_number + 1)

    def test_factorial(self):
        # Test factorial of positive integers
        self.assertEqual(factorial(5), 120)
        self.assertEqual(factorial(6), 720)

        # Test factorial of zero
        self.assertEqual(factorial(0), 1)

        # Test factorial of one
        self.assertEqual(factorial(1), 1)

        # Test factorial for invalid input (negative number)
        with self.assertRaises(ValueError):
            factorial(-5)

        # Test factorial for large input
        self.assertEqual(factorial(10), 3628800)

    def test_is_prime(self):
        # Test prime numbers
        self.assertTrue(is_prime(2))
        self.assertTrue(is_prime(3))
        self.assertTrue(is_prime(5))
        self.assertTrue(is_prime(7))
        self.assertTrue(is_prime(11))

        # Test non-prime numbers
        self.assertFalse(is_prime(1))
        self.assertFalse(is_prime(4))
        self.assertFalse(is_prime(6))
        self.assertFalse(is_prime(8))
        self.assertFalse(is_prime(9))
        self.assertFalse(is_prime(10))

        # Test large non-prime number
        self.assertFalse(is_prime(1000000))

        # Test large prime number
        self.assertTrue(is_prime(104729))

        # Test negative numbers
        self.assertFalse(is_prime(-1))
        self.assertFalse(is_prime(-3))


if __name__ == "__main__":
    test_suite = unittest.TestLoader().discover('tests')
    with open('output/test_report.xml', 'wb') as output:
        xmlrunner.XMLTestRunner(output=output).run(test_suite)