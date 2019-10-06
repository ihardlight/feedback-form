class MyException(Exception):
    def __init___(self, error_args=None):
        Exception.__init__(self, "Error was raised. Arguments was: {0}".format(error_args))
        if error_args is None:
            error_args = {}
        self.error_args = error_args
