from contextlib import suppress
import os.path


FIXTURE_DIR = 'fixtures'


def load_fixture(template, arg, parse_fn=None):
    if arg.isalnum():  # prevent reading other files
        file_path = os.path.join(FIXTURE_DIR, template.format(arg))
        with suppress(OSError), open(file_path) as file:
            print(file_path)
            data = file.read()
            if parse_fn:
                return parse_fn(data)
            return data
