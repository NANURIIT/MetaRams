package com.nanuri.rams.com.security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS003BMapper;
import com.nanuri.rams.com.code.AthCd;
import com.nanuri.rams.com.security.vo.EmpDetailsVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class LoginService implements UserDetailsService {
	
	public static String ROLE_PREFIX = "ROLE_";
	
	@Autowired
	private IBIMS003BMapper ibims003bMapper;
	
	@Override
	public EmpDetailsVO loadUserByUsername(String eno) {
		IBIMS003BDTO employee = ibims003bMapper.findByEno(eno);
		
		if(employee == null) {
			log.debug("employee is null => UsernameNotFoundException");
			throw new UsernameNotFoundException("사번 또는 비밀번호가 맞지 않습니다.");
        }else {
			return EmpDetailsVO.of(employee, getGrantedAuthorities(employee));
		}
	}
	
	private List<GrantedAuthority> getGrantedAuthorities(IBIMS003BDTO emp) {
        AthCd rghtCd = emp.getAthCd();
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(ROLE_PREFIX.concat(rghtCd.name()));
        return authorities;
    }
}
