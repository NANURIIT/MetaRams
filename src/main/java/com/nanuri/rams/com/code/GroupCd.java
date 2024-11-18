package com.nanuri.rams.com.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum GroupCd {

	ACT_CD						("A001", 3, "계정코드"),
	ASTS_QTY_DVD_CD				("A002", 1, "자산건전성분류코드"),
	APRV_OPSTN_CCD				("A003", 1, "잔반구분코드"),
	ATDNC_STD_CD				("A004", 1, "잠석기준코드"),
	BSC_ASTS_KND_CD				("B002", 1, "기조자산종류코드"),
	BSNS_STTS_CCD				("B003", 2, "사업단계구분코드"),
	BRRWR_CLSF_CD				("B004", 1, "자주구분코드"),
	CRDT_GRD_CD					("C001", 5, "신용등급코드"),
	CNC_CMPNY_CLSF_CD			("C002", 2, "연결회사구분코드"),
	CMMTT_MMBR_CCD				("C003", 2, "위원회멤버구분코드"),
	CHECK_ITEM_CD				("C004", 2, "점검항목코드"),
	COPRTN_TYP_CD				("C005", 2, "협업유형코드"),
	DBT_NPFRM_OBLG_CCD			("D001", 1, "재무불이행의무구분코드"),
	FNC_GDS_DVD_CD				("F001", 2, "금융상품분류코드"),
	IB_DEAL_PRGRS_ST_CD			("I001", 2, "IBDEAL진행상태코드"),
	INS_CRDT_GRD_CCD			("I002", 2, "내부신용등급구분코드"),
	INSPCT_DPRT_CCD				("I003", 1, "심사부서구분코드"),
	INSPCT_PRGRS_ST_CD			("I004", 3, "심사진행상태코드"),
	INSPCT_CNCL_HNDL_CCD		("I005", 1, "심사쥐소저리구분코드"),
	INSPCT_CNFRNC_CCD			("I006", 1, "심사협의구분코드"),
	INSPCT_CNFRNC_CNCL_RSN_C	("I007", 1, "심사협의쥐소사유코드"),
	IND_TYP_DVD_CD				("I008", 2, "업종분류코드"),
	IS_DTL_TYP_CD				("I009", 2, "종목세부유형코드"),
	INVST_THING_CCD				("I010", 2, "투자물건구분코드"),
	INVST_THING_DTLS_CCD		("I011", 4, "투자물건상세구분코드"),
	INVST_GDS_LDVD_CD			("I012", 2, "투자상품대분류코드"),
	INVST_GDS_DTLS_DVD_CD		("I013", 2, "투자상품상세분류코드"),
	INVST_GDS_SDVD_CD			("I014", 3, "투자상품소분류코드"),
	INVST_GDS_MDVD_CD			("I015", 2, "투자상품중분류코드"),
	INVST_CRNCY_CD				("I016", 3, "투자통화코드"),
	WON_AMT_CD					("I017", 1, "원단위금액코드"),
	LST_C_CASE_CCD				("L001", 2, "부수안건구분코드"),
	MRTG_DTLS_CCD				("M001", 4, "담보상세구분코드"),
	MRTG_KND_CCD				("M002", 2, "담보종류구분코드"),
	MRTG_ACQST_STM_CCD			("M003", 2, "담보쥐득방식구분코드"),
	MRTG_ACQST_DTLS_CCD			("M004", 4, "담보쥐득상세구분코드"),
	MDFY_RGHT_CCD				("M005", 1, "수정권한구분코드"),
	OUTS_INS_DL_CCD				("O001", 1, "외부내부거래구분코드"),
	OUTS_CRDT_GRD_CCD			("O002", 2, "외부신용등급구분코드"),
	OPTNL_END_CCD				("O003", 1, "임의종료구분코드"),
	PRGRS_CYCL_CD				("P001", 1, "진행주기코드"),
	RA_DEAL_CCD					("R001", 1, "RADEAL구분코드"),
	RA_RSLTN_CCD				("R002", 1, "RA결의구분코드"),
	RA_DOC_CCD					("R003", 2, "RA문서구분코드"),
	RA_WRKNG_CO_VAL_GRD_CD		("R004", 1, "RA운용사평가등급코드"),
	RA_FND_RSK_GRD_CD			("R005", 1, "RA펀드위험등급코드"),
	RSLTN_RSLT_CD				("R006", 1, "결의결과코드"),
	RSLTN_CNFRNC_CCD			("R007", 2, "결의협의회구분코드"),
	RGT_RNK_CCD					("R008", 1, "권리순위구분코드"),
	RGHT_CCD					("R009", 1, "권한구분코드"),
	RGHT_CD						("R010", 4, "권한코드"),
	RISK_INSPCT_RSLTN_CCD		("R011", 1, "리스크심사결의구분코드"),
	RISK_INSPCT_MNG_STTS_CD		("R012", 1, "리스크심사관리단계코드"),
	RISK_INSPCT_CCD				("R013", 2, "리스크심사구분코드"),
	RSPSB_CMPL_CCD				("R014", 2, "잭임준공구분코드"),
	STMT_PFRM_CD				("S001", 1, "결제이행코드"),
	TRD_CCD						("T001", 1, "매매구분코드"),
	URL_DVD_CD					("U001", 2, "URL분류코드"),
	CNTY_CD						("U003", 2, "국가코드"),
	BSNS_AREA_CD				("U004", 3, "사업지역코드");

	String code;
	int cdLength;
	String codeExplain;

}
