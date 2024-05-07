class MX3Exception(Exception):
    def __init__(self, msg, ui_msg=None):
        super(MX3Exception, self).__init__(msg)
        self.ui_msg = ui_msg


class MX3AuthorizationError(MX3Exception):
    def __init__(self, msg="User is not authorized", ui_msg=None):
        super(MX3AuthorizationError, self).__init__(msg, ui_msg)
