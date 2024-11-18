package com.nanuri.rams.business.common.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAA95BDTO extends CommonDTO{
    
    /* 권한별 메뉴화면 사용권한 */
    private String rghtCd;						/* 권한코드 */
    private int sq;								/* 일련번호 */
	private String menuId;						/* 메뉴ID */
    private String mdfyRghtCcd;					/* 수정권한구분코드(1:조회, 2:수정가능) */

}
