package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 의무이행계획정보 Table.RAA31B DTO
 * */
public class RAA31BDTO {
	
//	private String ibDealNo; 		// IBDEAL번호
//	private String riskInspctCcd; 	// 리스크심사구분코드
//	private String istCCaseCcd; 	// 부수안건구분코드
//	private int    itemSq;			// 항목일련번호
//	
//	private String rprPrgrsStCd;	// 보고진행상태코드
//	private String aplcEndDtDt;		// 적용기한일자
//	private String achvDt;			// 달성일자
//	private String rprRsnCntnt;		// 보고사유내용
//	private int    oblgAmt;			// 의무금액
//	private String rpyDt;			// 해소일자
//	private int    rpyAmt;			// 해소금액
//	private String oblgCntnt;		// 의무내용
//	private String permDt;			// 이행일자
//	private String permPlanCntnt;	// 이행계획내용
//	private String rpyF;			// 해소여부
//	
//	private Date   hndlDyTm;		// 처리일시
//	private String hndlDprtCd;		// 처리부점코드
//	private String hndlPEno;		// 처리자사번
	
	private String oblgPfrmCcd;		// 의무이행구분코드
	private String ibDealNo;		// IBDEAL번호
	private String riskInspctCcd;	// 리스크심사구분코드
	private String lstCCaseCcd;		// 부수안건구분코드
	private int	   itemSq;			// 항목일련번호
	private String rprPrgrsStCd;	// 보고진행상태코드
	private String aplcEndDtDt;		// 적용기한일자
	private String achvDt;			// 달성일자
	private String rprRsnCntnt;		// 보고사유내용
	private double oblgAmt;			// 의무금액
	private String rpyDt;			// 해소일자
	private double rpyAmt;			// 해소금액
	private String oblgCntnt;		// 의무내용
	private Date   pfrmDt;  
	private String pfrmPlanCntnt;  
	private String prcsPlanCntnt1;	// 프로세스계획내용1
	private String prcsPlanCntnt2;	// 프로세스계획내용2
	private String valSpclCntnt;	// 평가특이내용
	private Date   aprvDyTm1;		// 결재일시1
	private String aprvPEno1;		// 결재자사번1
	private Date   aprvDyTm2;		// 결재일시2
	private String aprvPEno2;		// 결재자사번2
	private Date   aprvDyTm3;		// 결재일시3
	private String aprvPEno3;		// 결재자사번3
	private Date   aprvDyTm4;		// 결재일시4
	private String aprvPEno4;		// 결재자사번4
	private Date   aprvDyTm5;		// 결재일시5
	private String aprvPEno5;		// 결재자사번5
	private Date   fnlMofyDyTm;		// 최종수정일시
	private String fnlMdeyPEno;		// 최종수정자사번
	private Date   hndlDyTm;		// 처리일시
	private String hndlDprtCd;		// 처리부점코드
	private String hndlPEno;		// 처리자사번
	private String wrapGdsCd;		// wrap상품코드
	private String wrapGdsNm;		// wrap상품명
	private String rpyF;			// 해소여부
	private String stdYrMm;			// 기준년월
	private String bsnsOutlnHngl;	// 사업개요한글
	private String cnstCmpnyNm;		// 시공회사명법인명
	private String mainPrgrsSttnCntnt;	// 주요진행현황내용
	private String pfrmCntnt;		// 이행내용
	private String nPfrmRsnCntnt;	// 미이행사유내용
	
}
