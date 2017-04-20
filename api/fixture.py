from contextlib import suppress
import os.path
import os


FIXTURES_DIR = os.path.join(os.getcwd(), 'fixtures')


def _is_safe_path(path):
    return os.path.realpath(path).startswith(FIXTURES_DIR)


def load_fixture(rel_file_path):
    """Load local fixture file, if available.

    Note that it ensures that it protects against directory traversal
    and ensures no files outside of the fixures/ dir can be accessed.

    :param rel_file_path: relative path to file in app's fixtures/ dir
    :returns: string with fixture file's content
    """

    print(rel_file_path)

    file_path = os.path.join(FIXTURES_DIR, rel_file_path)
    if _is_safe_path(file_path):
        with suppress(OSError), open(file_path) as file:
            return file.read()
