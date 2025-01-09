package com.nanuri.rams.com.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AthCd {
	
	AG11(1, "사업부부서원"),
	AG12(2, "사업부담당자"),
	AG18(3, "사업부부서장"),
	AG21(4, "심사부심사역"),
	AG28(5, "심사부부서장"),
	AG31(6, "관리부담당자"),
	AG38(7, "관리부부서장"),
	AG39(8, "리스크본부 본부장"),
	AG41(9, "협의체간사"),
	AG48(10, "협의체위원"),
	AG49(11, "협의체위원장"),
	AG51(12, "리스크관리부 부서원"),
	AG58(13, "리스크관리부 부서장"),
	AG61(14, "WM사업부 부서원"),
	AG68(15, "WM사업부 부서장"),
	AG69(16, "WN사업부 본부장"),
	AG70(17, "감사부"),
	IT10(99, "IT관리자"),
	ST11(100, "결제업무실");
	
	int level;
	String text;
	
}
