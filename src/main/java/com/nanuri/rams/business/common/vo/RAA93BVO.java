package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.dto.RAA93BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 메뉴화면등록정보 Table.RAA93B VO
 * */
public class RAA93BVO {
    
    @Getter
    @Setter
    public static class MenuListVO extends RAA93BDTO {
        private int rowNum;
        private String menuName;
        private String lv1Id;
        private String lv2Id;
        private String lv3Id;
    }
    
    @Getter
    @Setter
    public static class MainMenuVo extends IBIMS005BDTO {
    	private String oldMenuId;						/* 변경전 상위메뉴ID*/
    	private String hndEmpNm;
    }
    
    @Getter
    @Setter
    public static class SubMenuVo extends IBIMS005BDTO {
    	private String oldSubMenuId;	/* 변경전 하위메뉴ID*/
    	private String empNm;
    	
    	
    }
    
    @Getter
    @Setter
    public static class TitleVo extends RAA93BDTO {
    	private String title;	/* 변경전 하위메뉴ID*/
    	private String hgTitle;
    }
    
    private int srtNo;
    private String menuId;
    private String menuNm;
    private String rghtCd;
    private String menuLv;
    private String dltF;
    private String mdfyRghtCcd;
    private String hndlDyTm;
    private String hndlPEno;
    private String hndlDprtCd;
    
}
