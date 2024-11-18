package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.RAA95BDTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
 * 권한별메뉴화면사용권한설정 Table.RAA95B VO
 * */
public class RAA95BVO {
    
	@Getter
	@Setter
	public static class selectUseMenuVO extends RAA95BDTO {
		private String lv1Id;
		private String lv2Id;
		private String lv3Id;

		private int nextVal;
	}

	@Getter
	@Setter
	@ToString
	public static class menuUpdateRequestVO {
		private String rghtCd;				// 권한코드
		private String menuId;				// 메뉴ID
		private Boolean isUsed = false;
		private Boolean isModified = false;
	}
}
