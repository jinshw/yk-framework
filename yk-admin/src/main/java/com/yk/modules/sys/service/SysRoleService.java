
package com.yk.modules.sys.service;


import com.baomidou.mybatisplus.service.IService;
import com.yk.modules.sys.entity.SysRoleEntity;
import com.yk.utils.PageUtils;

import java.util.Map;


/**
 * 角色
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:42:52
 */
public interface SysRoleService extends IService<SysRoleEntity> {

	PageUtils queryPage(Map<String, Object> params);

	void save(SysRoleEntity role);

	void update(SysRoleEntity role);
	
	void deleteBatch(Long[] roleIds);

}
