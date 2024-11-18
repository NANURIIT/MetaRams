package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
/*
 * 메뉴별권한화면사용권한설정 Table.IBIMS007B VO
 * */
public class IBIMS007BVO extends IBIMS007BDTO {

	private String empno;
	private String athCdNm;
	private String athCdExpl;
	private String menuNm;
	private String menuLvl;
	private String hndDt;
	private String hndTm;
	
    
	@Getter
	@Setter
	public static class selectUseMenuVO extends IBIMS007BDTO {
		private String lv1Id;
		private String lv2Id;
		private String lv3Id;

		private int nextVal;
	}

	@Getter
	@Setter
	@ToString
	public static class menuUpdateRequestVO {
		private String athCd;				// 권한코드
		private String menuId;				// 메뉴ID
		private boolean chkUseYn;
		private boolean chkModifyYn;
	}
}
