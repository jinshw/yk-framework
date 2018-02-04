package com.yk.modules.sys.service.impl;

import com.yk.modules.sys.dao.cluster.RpathDao;
import com.yk.modules.sys.dao.master.UserDao;
import com.yk.modules.sys.pojo.Rpath;
import com.yk.modules.sys.pojo.User;
import com.yk.modules.sys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RpathDao rpathDao;

    public User getUserById(int id) {
        return userDao.getUserById(id);
    }

    public Rpath getRpath(int id) {
        return rpathDao.getRpath(id);
    }
}
