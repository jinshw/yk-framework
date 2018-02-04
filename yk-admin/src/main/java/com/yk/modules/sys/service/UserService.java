package com.yk.modules.sys.service;

import com.yk.modules.sys.pojo.Rpath;
import com.yk.modules.sys.pojo.User;

public interface UserService {
    User getUserById(int id);

    Rpath getRpath(int id);
}
