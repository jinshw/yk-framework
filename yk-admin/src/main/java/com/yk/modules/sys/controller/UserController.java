package com.yk.modules.sys.controller;

import com.yk.modules.sys.pojo.User;
import com.yk.modules.sys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.logging.Logger;

@Controller
@RequestMapping("user")
public class UserController {

    private Logger logger = Logger.getLogger("info");

    @Autowired
    UserService userService;


    @RequestMapping("userlist")
    public String hello(ModelMap model) {
        model.put("time", new Date());
        model.put("message", "tewewqw123424444安保处ad");
        model.put("age",5122);
        User user = userService.getUserById(1);
        model.put("user",user);
        model.put("rpath",userService.getRpath(1));
        return "/pages/userlist";
    }
}