import os
import sys
import unittest
import xmlrunner

# Ensure the script's path is added to sys.path so modules can be imported correctly
script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(script_dir, '..'))

# Path to the reports directory which should be in the root of the project
report_dir = os.path.join(script_dir, '..', 'reports')

# Ensure the reports directory exists
os.makedirs(report_dir, exist_ok=True)

# Discover and run the tests, outputting the results to the reports directory
if __name__ == '__main__':
    test_suite = unittest.TestLoader().discover('tests')
    with open(os.path.join(report_dir, 'test_report.xml'), 'wb') as output:
        xmlrunner.XMLTestRunner(output=output).run(test_suite)