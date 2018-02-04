package com.yk.modules.sys.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("index")
public class IndexController {
    @RequestMapping("list")
    public String getIndex(Model Model) {
        Model.addAttribute("name", "zhangsan123");
        return "pages/index";
    }
}
