package com.nanuri.rams.business.common.vo;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 권한별메뉴관리 Table.RAA94B VO
 * */
public class RAA94BVO {
    
    @Getter
    @Setter
    public static class RghtCodeDeleteRequestVO {
        private String rghtCd;
        private List<String> code = new ArrayList<>();
    }
    
}
