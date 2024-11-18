package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 사용자추가 Table.RAA99A VO
 * */
public class RAA99AVO {
    
    @Getter
    @Setter
    public static class CheckUserEnoVO {
        private String eno;		// 사번
        private int cnt;		// 중복카운트
    }
    
    
    
}
