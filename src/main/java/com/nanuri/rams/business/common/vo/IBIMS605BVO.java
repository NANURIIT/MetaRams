package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

/**
 * IBIMS605BVO
 */
@Getter
@Setter
public class IBIMS605BVO {

	private String mtrPrgSttsDcd;						// 진행상태코드
    private String dealNo;								// Deal번호
	private String jdgmDcd;								// 심사구분
	private String hiddenRiskInspctCcd;
	private String mtrDcd;								// 안건구분
	private String hiddenLstCCaseCcd;
	private String mtrNm;								// 안건명
	private String itemSq;								// 일련번호
	private String cnsbMtgNo; 							// 결의협의체
	private String rsltnDt;								// 결의일
	private String rsltnRsltCd;							// 결의결과
	private String rsltCntnt;							// 승인조건
	private String invstCrncyCd;						// 승인금액통화코드
	private String rcgAmt;								// 승인금액
	private String aplcAmt;								// 셀다운 대상금액
	private String endDtEndDt;							// 셀다운 기한
	private String mtrtHldAmt;							// 만기보유금액
	private String opnPrcValAmt;						// 잔고
	private String pfrmClsfNm;							// 이행여부
	private String pfrmDt;								// 이행일자
	private String nrpyRa;								// 미해소잔액
	private String dprtCd;								// 부서코드
	private String dprtNm;								// 부서이름
	private String empNm;								// 담당자이름
	private String inspctDprtCcd;						// 심사부서코드
	private String ownEmpNm;							// 담당심사역이름
	private String rcgRqsDt;							// 승인요청일
	private String rcgDt;								// 승인일
	private String cnfrDt1;								// 심사역확인일
	private String cnfrDt2;								// 심사부서장확인일
	private String mainPrgrsSttnCntnt;					// 참여현황
	private String bsnsSttnAndPrspctSmry;				// 진행경과
	private String prcsPlanCntnt1;						// BaseCase
	private String prcsPlanCntnt2;						// StressCase
	private String rprRsnCntnt;							// 기타특이사항
	private String oblgPfrmCcd;							// 이행구분
    private Date   hndDetlDtm;                          // 조작상세일시
    private String hndEmpno;                            // 조작사원번호
    private String hndTmnlNo;                           // 조작단말기번호
    private String hndTrId;                             // 조작거래id
    private String guid;                                // guid

}
