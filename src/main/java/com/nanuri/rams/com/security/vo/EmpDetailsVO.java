package com.nanuri.rams.com.security.vo;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.com.code.AthCd;

import lombok.EqualsAndHashCode;
import lombok.Getter;

@EqualsAndHashCode
@Getter
public class EmpDetailsVO implements UserDetails {
	
	private final String eno;
	private final String empNm;
	private final String pwd;
	private final AthCd rghtCd;
	private final String dprtCd;
	private final String dprtNm;
	private final String bdCd;
	private final String bdNm;
	private final String opstDcd;
	private final Boolean isLocked;
	private final List<GrantedAuthority> authorities;
	
	private EmpDetailsVO(String eno, String empNm, String pwd, AthCd rghtCd, String dprtCd, String dprtNm, String bdCd, String bdNm, String opstDcd, Boolean isLocked
			, List<GrantedAuthority> authorities) {
		this.eno = eno;
		this.empNm = empNm;
		this.pwd = pwd;
		this.rghtCd = rghtCd;
		this.dprtCd = dprtCd;
		this.dprtNm= dprtNm;
		this.bdCd = bdCd;
		this.bdNm = bdNm;
		this.opstDcd = opstDcd;
		this.isLocked = isLocked;
		this.authorities = authorities;
	}
	
	public static EmpDetailsVO of (String eno, String empNm, String pwd, AthCd rghtCd, String dprtCd, String dprtNm, String bdCd, String bdNm, String opstDcd, Boolean isLocked
			, List<GrantedAuthority> authorities) {
		return new EmpDetailsVO(eno, empNm, pwd, rghtCd, dprtCd, dprtNm, bdCd, bdNm, opstDcd, isLocked, authorities);
	}
	
	public static EmpDetailsVO of (String eno, String empNm, String pwd, AthCd rghtCd, String dprtCd, String dprtNm, String bdCd, String bdNm, String opstDcd, Boolean isLocked
			, GrantedAuthority authority) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(authority);
        return new EmpDetailsVO(eno, empNm, pwd, rghtCd, dprtCd, dprtNm, bdCd, bdNm, opstDcd, isLocked, authorities);
    }

    public static EmpDetailsVO of (String eno, String empNm, String pwd, AthCd rghtCd, String dprtCd, String dprtNm, String bdCd, String bdNm, String opstDcd, Boolean isLocked
    		, String authority) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(authority));
        return new EmpDetailsVO(eno, empNm, pwd, rghtCd, dprtCd, dprtNm, bdCd, bdNm, opstDcd, isLocked, authorities);
    }

    public static EmpDetailsVO of (IBIMS003BDTO emp, String authority) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(authority));
        return new EmpDetailsVO(emp.getEmpno(), emp.getEmpNm(), emp.getPwd(), emp.getAthCd(), emp.getDprtCd(), emp.getDprtNm(), emp.getBdcd(), emp.getBdNm()
				, emp.getOpstDcd(), emp.getIsLocked(), authorities);
    }

    public static EmpDetailsVO of (IBIMS003BDTO emp, GrantedAuthority authority) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(authority);
        return new EmpDetailsVO(emp.getEmpno(), emp.getEmpNm(), emp.getPwd(), emp.getAthCd(), emp.getDprtCd(), emp.getDprtNm(), emp.getBdcd(), emp.getBdNm()
				, emp.getOpstDcd(), emp.getIsLocked(), authorities);
    }
	
	public static EmpDetailsVO of (IBIMS003BDTO emp, List<GrantedAuthority> authorities) {
		return new EmpDetailsVO(emp.getEmpno(), emp.getEmpNm(), emp.getPwd(), emp.getAthCd(), emp.getDprtCd(), emp.getDprtNm(), emp.getBdcd(), emp.getBdNm()
				, emp.getOpstDcd(), emp.getIsLocked(), authorities);
	}
	
	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }
	
	@Override
	public String getPassword() { 
		return this.pwd;
	}
	
	@Override
    public String getUsername() {
        return this.eno;
    }
	
	@Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
	
}
