package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

/**
 * MO44040SVO
 */
@Getter
@Setter
public class MO44040SVO {

	@Getter
	@Setter
	public static class DealInfo {
		/* 셀다운의무이행 */
		String ibDealNo;			/* deal번호 */
		String riskInspctCcd; 		/* 신규/재부의 */
		String riskInspctCcdNm; 	/* 신규/재부의명 */
		String lstCCaseCcd; 		/* 부수안건 */
		String lstCCaseCcdNm; 		/* 부수안건명 */
		String oblgPfrmCcd;			/* 의무이행구분 */
		String ibDealNm; 			/* 안건명 */
		String fncGdsDvdCd;			/* 금융상품분류코드 */
		int    itemSq;				/* 일련번호 */
		String inspctCnfrncCcd;		/* 결의협의체 */
		String inspctCnfrncCcdNm;	/* 결의협의체명 */
		String rsltnDt;				/* 결의일 */
		String rsltnRsltCd;			/* 결의결과 */
		String rsltnRsltCdNm;		/* 결의결과명 */
		String rsltCntnt;			/* 승인조건 */
		String invstCrncyCd; 		/* 승인금액통화코드 */
		String rcgAmt;				/* 승인금액 */
		String aplcAmt;				/* 셀다운 대상금액 */
		String endDtEndDt;			/* 셀다운기한 */
		String mtrtHldAmt;			/* 만기보유금액 */
		String opnPrcValAmt;		/* 잔고 */
		String pfrmClsfNm;			/* 이행여부 */
		String pfrmDt;				/* 이행일자 */
		String npryRa;				/* 미해소잔액 */
		String rprPrgrsStCd;		/* 진행상태코드 */
		String rprPrgrsStCdNm;		/* 진행상태코드명 */
		String dprtCd;				/* 담당부서코드 */
		String dprtNm;				/* 부서이름 */
		String empNm;				/* 담당자이름 */
		String inspctDprtCcd;		/* 심사부서코드 */
		String inspctDprtCcdNm;		/* 심사부서코드명 */
		String ownEmpNm;			/* 담당심사역코드 */
		String rcgRqsDt;			/* 승인요청일 */
		String rcgDt;				/* 승인일 */
		String cnfrDt1;				/* 심사역확인일 */
		String cnfrDt2;				/* 심사부서장확인일 */
		String bsnsOutlnHngl;		/* 사업개요 */
		String cnstCmpnyNm;			/* 시행사/시공사 */
		String mainPrgrsSttnCntnt;	/* 최근사업 진행현황 */
		String achvDt;				/* 셀다운목표일 */
		String nPfrmRsnCntnt; 		/* 미이행사유 */
		String pfrmPlanCntnt;		/* 향후계획 */
		String prcsPlanCntnt1; 		/* basecase */
		String prcsPlanCntnt2; 		/* stresscase */
		String valSpclCntnt; 		/* 기타특이사항 */
		/* 기타의무이행 */
		String stdYrMm;				/* 기준년월 */
		String endF;				/* 종결여부 */
		String pfrmCntnt;			/* 이행사유 */
	}

	@Getter
	@Setter
	public static class SearchParam {
		String stdYrMm;				/* 기준년월 */
		String chrgPEno;			/* 담당자사번 */
		String inspctDprtCcd;		/* 심사부서코드 */
		String ownPEno;				/* 심사역사번 */
		String rprPrgrsStCd;		/* 진행상태코드 */
		String ibDealNm;			/* 안건명 */
		String dprtCd;				/* 부서코드 */
		String oblgPfrmCcd;			/* 의무이행구분코드 */
		String endF;				/* 종결여부 */
	}

}
